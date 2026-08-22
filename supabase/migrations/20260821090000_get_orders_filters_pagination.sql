drop function if exists public.get_orders();

create function public.get_orders(
  p_page integer default 1,
  p_page_size integer default 20,
  p_keyword text default null,
  p_status text default null
)
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  with params as (
    select
      greatest(coalesce(p_page, 1), 1) as page_number,
      least(greatest(coalesce(p_page_size, 20), 1), 100) as page_size,
      nullif(trim(coalesce(p_keyword, '')), '') as keyword,
      nullif(trim(coalesce(p_status, '')), '') as order_status
  ),
  filtered_orders as (
    select orders.*
    from public.orders
    cross join params
    where
      (params.order_status is null or orders.status = params.order_status)
      and (
        params.keyword is null
        or orders.order_number ilike '%' || params.keyword || '%'
        or orders.customer_name ilike '%' || params.keyword || '%'
        or orders.customer_email ilike '%' || params.keyword || '%'
        or exists (
          select 1
          from public.order_items
          where order_items.order_id = orders.id
            and order_items.product_name ilike '%' || params.keyword || '%'
        )
      )
  ),
  total as (
    select count(*)::integer as total_count
    from filtered_orders
  ),
  paginated_orders as (
    select filtered_orders.*
    from filtered_orders
    cross join params
    order by filtered_orders.ordered_at desc
    limit (select page_size from params)
    offset (select (page_number - 1) * page_size from params)
  ),
  items as (
    select coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', paginated_orders.id,
          'orderNumber', paginated_orders.order_number,
          'customerName', paginated_orders.customer_name,
          'customerEmail', paginated_orders.customer_email,
          'status', paginated_orders.status,
          'totalAmount', paginated_orders.total_amount,
          'orderedAt', paginated_orders.ordered_at,
          'itemCount', coalesce(order_items_summary.item_count, 0),
          'totalQuantity', coalesce(order_items_summary.total_quantity, 0)
        )
        order by paginated_orders.ordered_at desc
      ),
      '[]'::jsonb
    ) as rows
    from paginated_orders
    left join lateral (
      select
        count(*)::integer as item_count,
        coalesce(sum(order_items.quantity), 0)::integer as total_quantity
      from public.order_items
      where order_items.order_id = paginated_orders.id
    ) as order_items_summary on true
  )
  select jsonb_build_object(
    'items', items.rows,
    'totalCount', total.total_count,
    'page', params.page_number,
    'pageSize', params.page_size,
    'totalPages', case
      when total.total_count = 0 then 0
      else ceil(total.total_count::numeric / params.page_size)::integer
    end
  )
  from items
  cross join total
  cross join params;
$$;

revoke all on function public.get_orders(integer, integer, text, text) from public;
grant execute on function public.get_orders(integer, integer, text, text) to authenticated;

comment on function public.get_orders(integer, integer, text, text) is
  'Returns a filtered and paginated order list for the authenticated admin.';
