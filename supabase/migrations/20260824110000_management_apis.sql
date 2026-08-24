-- Inventory, customer management, and sales report APIs.

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users (id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  status text not null default 'active'
    check (status in ('active', 'inactive', 'blocked')),
  memo text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index customers_email_lower_idx
on public.customers (lower(email));

create index customers_status_created_idx
on public.customers (status, created_at desc);

create trigger customers_set_updated_at
before update on public.customers
for each row execute function public.set_updated_at();

alter table public.customers enable row level security;

create policy "customers_admin_all"
on public.customers for all to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "customers_select_self"
on public.customers for select to authenticated
using (auth_user_id = (select auth.uid()));

grant select, insert, update, delete on public.customers to authenticated;

alter table public.orders
add column customer_id uuid references public.customers (id) on delete set null;

create index orders_customer_id_ordered_idx
on public.orders (customer_id, ordered_at desc);

create function public.get_inventory(
  p_page integer default 1,
  p_page_size integer default 10,
  p_keyword text default null,
  p_stock_status text default null
)
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  with inventory_rows as (
    select
      products.id as product_id,
      products.sku,
      products.name,
      products.status as product_status,
      inventory.on_hand,
      inventory.reserved,
      inventory.available,
      inventory.reorder_point,
      case
        when inventory.available <= 0 then 'sold_out'
        when inventory.available <= inventory.reorder_point then 'low_stock'
        else 'normal'
      end as stock_status,
      inventory.updated_at
    from public.inventory
    join public.products on products.id = inventory.product_id
  ),
  filtered as (
    select *
    from inventory_rows
    where (
      nullif(trim(coalesce(p_keyword, '')), '') is null
      or name ilike '%' || trim(p_keyword) || '%'
      or sku ilike '%' || trim(p_keyword) || '%'
    )
      and (
        p_stock_status is null
        or p_stock_status = 'all'
        or stock_status = p_stock_status
      )
  ),
  total as (
    select count(*)::integer as total_count from filtered
  ),
  paged as (
    select *
    from filtered
    order by
      case stock_status
        when 'sold_out' then 1
        when 'low_stock' then 2
        else 3
      end,
      updated_at desc,
      product_id
    offset (greatest(p_page, 1) - 1) * least(greatest(p_page_size, 1), 100)
    limit least(greatest(p_page_size, 1), 100)
  )
  select jsonb_build_object(
    'items', coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'productId', paged.product_id,
            'sku', paged.sku,
            'name', paged.name,
            'productStatus', paged.product_status,
            'onHand', paged.on_hand,
            'reserved', paged.reserved,
            'available', paged.available,
            'reorderPoint', paged.reorder_point,
            'stockStatus', paged.stock_status,
            'updatedAt', paged.updated_at
          )
          order by
            case paged.stock_status
              when 'sold_out' then 1
              when 'low_stock' then 2
              else 3
            end,
            paged.updated_at desc,
            paged.product_id
        )
        from paged
      ),
      '[]'::jsonb
    ),
    'page', greatest(p_page, 1),
    'pageSize', least(greatest(p_page_size, 1), 100),
    'totalCount', total.total_count,
    'totalPages', case
      when total.total_count = 0 then 0
      else ceil(
        total.total_count::numeric / least(greatest(p_page_size, 1), 100)
      )::integer
    end
  )
  from total;
$$;

create function public.update_inventory(
  p_product_id uuid,
  p_payload jsonb
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  current_inventory public.inventory%rowtype;
  next_on_hand integer;
  next_reserved integer;
  next_reorder_point integer;
  invalid_key text;
begin
  if p_payload is null or jsonb_typeof(p_payload) <> 'object' then
    raise exception '수정할 재고 정보를 확인해 주세요.' using errcode = '22023';
  end if;

  select keys.key
  into invalid_key
  from jsonb_object_keys(p_payload) as keys(key)
  where keys.key not in ('onHand', 'reserved', 'reorderPoint')
  limit 1;

  if invalid_key is not null then
    raise exception '수정할 수 없는 재고 필드입니다: %', invalid_key
      using errcode = '22023';
  end if;

  select inventory.*
  into current_inventory
  from public.inventory
  where inventory.product_id = p_product_id
  for update;

  if not found then
    raise exception '재고 정보를 찾을 수 없습니다.' using errcode = 'P0002';
  end if;

  next_on_hand := case
    when p_payload ? 'onHand' then (p_payload ->> 'onHand')::integer
    else current_inventory.on_hand
  end;
  next_reserved := case
    when p_payload ? 'reserved' then (p_payload ->> 'reserved')::integer
    else current_inventory.reserved
  end;
  next_reorder_point := case
    when p_payload ? 'reorderPoint' then (p_payload ->> 'reorderPoint')::integer
    else current_inventory.reorder_point
  end;

  if next_on_hand < 0 or next_reserved < 0 or next_reorder_point < 0 then
    raise exception '재고 수량은 0 이상이어야 합니다.' using errcode = '22023';
  end if;

  if next_reserved > next_on_hand then
    raise exception '예약 재고는 보유 재고보다 많을 수 없습니다.' using errcode = '22023';
  end if;

  update public.inventory
  set
    on_hand = next_on_hand,
    reserved = next_reserved,
    reorder_point = next_reorder_point
  where product_id = p_product_id;

  return (
    select jsonb_build_object(
      'productId', products.id,
      'sku', products.sku,
      'name', products.name,
      'productStatus', products.status,
      'onHand', inventory.on_hand,
      'reserved', inventory.reserved,
      'available', inventory.available,
      'reorderPoint', inventory.reorder_point,
      'stockStatus', case
        when inventory.available <= 0 then 'sold_out'
        when inventory.available <= inventory.reorder_point then 'low_stock'
        else 'normal'
      end,
      'updatedAt', inventory.updated_at
    )
    from public.inventory
    join public.products on products.id = inventory.product_id
    where inventory.product_id = p_product_id
  );
end;
$$;

create function public.get_customers(
  p_page integer default 1,
  p_page_size integer default 10,
  p_keyword text default null,
  p_status text default null
)
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  with customer_rows as (
    select
      customers.id,
      customers.name,
      customers.email,
      customers.phone,
      customers.status,
      customers.created_at,
      customers.updated_at,
      count(orders.id)::integer as total_orders,
      coalesce(sum(orders.total_amount), 0)::bigint as total_spent,
      max(orders.ordered_at) as last_ordered_at
    from public.customers
    left join public.orders on orders.customer_id = customers.id
    group by customers.id
  ),
  filtered as (
    select *
    from customer_rows
    where (
      nullif(trim(coalesce(p_keyword, '')), '') is null
      or name ilike '%' || trim(p_keyword) || '%'
      or email ilike '%' || trim(p_keyword) || '%'
      or coalesce(phone, '') ilike '%' || trim(p_keyword) || '%'
    )
      and (
        p_status is null
        or p_status = 'all'
        or status = p_status
      )
  ),
  total as (
    select count(*)::integer as total_count from filtered
  ),
  paged as (
    select *
    from filtered
    order by created_at desc, id
    offset (greatest(p_page, 1) - 1) * least(greatest(p_page_size, 1), 100)
    limit least(greatest(p_page_size, 1), 100)
  )
  select jsonb_build_object(
    'items', coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'id', paged.id,
            'name', paged.name,
            'email', paged.email,
            'phone', paged.phone,
            'status', paged.status,
            'totalOrders', paged.total_orders,
            'totalSpent', paged.total_spent,
            'lastOrderedAt', paged.last_ordered_at,
            'createdAt', paged.created_at,
            'updatedAt', paged.updated_at
          )
          order by paged.created_at desc, paged.id
        )
        from paged
      ),
      '[]'::jsonb
    ),
    'page', greatest(p_page, 1),
    'pageSize', least(greatest(p_page_size, 1), 100),
    'totalCount', total.total_count,
    'totalPages', case
      when total.total_count = 0 then 0
      else ceil(
        total.total_count::numeric / least(greatest(p_page_size, 1), 100)
      )::integer
    end
  )
  from total;
$$;

create function public.get_customer_detail(p_customer_id uuid)
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  select jsonb_build_object(
    'id', customers.id,
    'name', customers.name,
    'email', customers.email,
    'phone', customers.phone,
    'status', customers.status,
    'memo', customers.memo,
    'createdAt', customers.created_at,
    'updatedAt', customers.updated_at,
    'summary', jsonb_build_object(
      'totalOrders', count(orders.id)::integer,
      'totalSpent', coalesce(sum(orders.total_amount), 0)::bigint,
      'lastOrderedAt', max(orders.ordered_at)
    ),
    'recentOrders', coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'id', recent_orders.id,
            'orderNumber', recent_orders.order_number,
            'status', recent_orders.status,
            'totalAmount', recent_orders.total_amount,
            'orderedAt', recent_orders.ordered_at
          )
          order by recent_orders.ordered_at desc
        )
        from (
          select orders.id, orders.order_number, orders.status,
            orders.total_amount, orders.ordered_at
          from public.orders
          where orders.customer_id = customers.id
          order by orders.ordered_at desc
          limit 10
        ) as recent_orders
      ),
      '[]'::jsonb
    )
  )
  from public.customers
  left join public.orders on orders.customer_id = customers.id
  where customers.id = p_customer_id
  group by customers.id;
$$;

create function public.update_customer(
  p_customer_id uuid,
  p_payload jsonb
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  invalid_key text;
  next_status text;
begin
  if p_payload is null or jsonb_typeof(p_payload) <> 'object' then
    raise exception '수정할 고객 정보를 확인해 주세요.' using errcode = '22023';
  end if;

  select keys.key
  into invalid_key
  from jsonb_object_keys(p_payload) as keys(key)
  where keys.key not in ('name', 'email', 'phone', 'status', 'memo')
  limit 1;

  if invalid_key is not null then
    raise exception '수정할 수 없는 고객 필드입니다: %', invalid_key
      using errcode = '22023';
  end if;

  if p_payload ? 'name' and nullif(trim(p_payload ->> 'name'), '') is null then
    raise exception '고객 이름은 비워둘 수 없습니다.' using errcode = '22023';
  end if;

  if p_payload ? 'email' and nullif(trim(p_payload ->> 'email'), '') is null then
    raise exception '고객 이메일은 비워둘 수 없습니다.' using errcode = '22023';
  end if;

  if p_payload ? 'status' then
    next_status := p_payload ->> 'status';

    if next_status not in ('active', 'inactive', 'blocked') then
      raise exception '고객 상태값을 확인해 주세요.' using errcode = '22023';
    end if;
  end if;

  update public.customers
  set
    name = case
      when p_payload ? 'name' then trim(p_payload ->> 'name')
      else name
    end,
    email = case
      when p_payload ? 'email' then trim(p_payload ->> 'email')
      else email
    end,
    phone = case
      when p_payload ? 'phone' then nullif(trim(p_payload ->> 'phone'), '')
      else phone
    end,
    status = case
      when p_payload ? 'status' then next_status
      else status
    end,
    memo = case
      when p_payload ? 'memo' then nullif(trim(p_payload ->> 'memo'), '')
      else memo
    end
  where id = p_customer_id;

  if not found then
    raise exception '고객 정보를 찾을 수 없습니다.' using errcode = 'P0002';
  end if;

  return public.get_customer_detail(p_customer_id);
end;
$$;

create function public.get_sales_report(
  p_date_from date default (current_date - 6),
  p_date_to date default current_date
)
returns jsonb
language plpgsql
stable
security invoker
set search_path = ''
as $$
declare
  report jsonb;
begin
  if p_date_from > p_date_to then
    raise exception '조회 시작일은 종료일보다 늦을 수 없습니다.' using errcode = '22023';
  end if;

  if p_date_to - p_date_from > 366 then
    raise exception '리포트 조회 기간은 최대 1년입니다.' using errcode = '22023';
  end if;

  with filtered_orders as (
    select orders.*
    from public.orders
    where (orders.ordered_at at time zone 'Asia/Seoul')::date
      between p_date_from and p_date_to
  ),
  date_series as (
    select generate_series(p_date_from, p_date_to, interval '1 day')::date as stat_date
  ),
  daily_sales as (
    select
      date_series.stat_date,
      count(filtered_orders.id)::integer as order_count,
      coalesce(sum(filtered_orders.total_amount), 0)::bigint as gross_revenue
    from date_series
    left join filtered_orders
      on (filtered_orders.ordered_at at time zone 'Asia/Seoul')::date
        = date_series.stat_date
    group by date_series.stat_date
  ),
  status_distribution as (
    select
      filtered_orders.status,
      count(*)::integer as order_count
    from filtered_orders
    group by filtered_orders.status
  ),
  top_products as (
    select
      order_items.product_id,
      order_items.product_name,
      sum(order_items.quantity)::integer as quantity,
      sum(order_items.quantity * order_items.unit_price)::bigint as revenue
    from filtered_orders
    join public.order_items on order_items.order_id = filtered_orders.id
    group by order_items.product_id, order_items.product_name
    order by revenue desc, quantity desc, order_items.product_name
    limit 10
  )
  select jsonb_build_object(
    'period', jsonb_build_object(
      'dateFrom', p_date_from,
      'dateTo', p_date_to
    ),
    'summary', jsonb_build_object(
      'totalOrders', count(filtered_orders.id)::integer,
      'totalRevenue', coalesce(sum(filtered_orders.total_amount), 0)::bigint,
      'averageOrderValue', case
        when count(filtered_orders.id) = 0 then 0
        else round(avg(filtered_orders.total_amount))::bigint
      end,
      'cancelledOrders', count(filtered_orders.id)
        filter (where filtered_orders.status = 'cancelled')::integer
    ),
    'dailySales', coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'statDate', daily_sales.stat_date,
            'orderCount', daily_sales.order_count,
            'grossRevenue', daily_sales.gross_revenue
          )
          order by daily_sales.stat_date
        )
        from daily_sales
      ),
      '[]'::jsonb
    ),
    'statusDistribution', coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'status', status_distribution.status,
            'orderCount', status_distribution.order_count
          )
          order by status_distribution.order_count desc,
            status_distribution.status
        )
        from status_distribution
      ),
      '[]'::jsonb
    ),
    'topProducts', coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'productId', top_products.product_id,
            'productName', top_products.product_name,
            'quantity', top_products.quantity,
            'revenue', top_products.revenue
          )
          order by top_products.revenue desc,
            top_products.quantity desc,
            top_products.product_name
        )
        from top_products
      ),
      '[]'::jsonb
    )
  )
  into report
  from filtered_orders;

  return report;
end;
$$;

revoke all on function public.get_inventory(integer, integer, text, text) from public;
grant execute on function public.get_inventory(integer, integer, text, text)
to authenticated;

revoke all on function public.update_inventory(uuid, jsonb) from public;
grant execute on function public.update_inventory(uuid, jsonb) to authenticated;

revoke all on function public.get_customers(integer, integer, text, text) from public;
grant execute on function public.get_customers(integer, integer, text, text)
to authenticated;

revoke all on function public.get_customer_detail(uuid) from public;
grant execute on function public.get_customer_detail(uuid) to authenticated;

revoke all on function public.update_customer(uuid, jsonb) from public;
grant execute on function public.update_customer(uuid, jsonb) to authenticated;

revoke all on function public.get_sales_report(date, date) from public;
grant execute on function public.get_sales_report(date, date) to authenticated;

comment on function public.get_inventory(integer, integer, text, text) is
  'Returns a filtered and paginated inventory list for administrators.';

comment on function public.get_customers(integer, integer, text, text) is
  'Returns a filtered and paginated customer list with order aggregates.';

comment on function public.get_sales_report(date, date) is
  'Returns sales summary, daily sales, status distribution, and top products.';
