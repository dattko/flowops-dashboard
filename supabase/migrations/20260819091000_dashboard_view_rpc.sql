create or replace function public.get_dashboard_view()
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  with source as (
    select public.get_dashboard_summary() as data
  ), payload as (
    select
      data,
      data -> 'todaySummary' as today,
      data -> 'inventorySummary' as inventory,
      data -> 'weeklySummary' as weekly
    from source
  )
  select jsonb_build_object(
    'metrics', jsonb_build_array(
      jsonb_build_object(
        'label', '오늘 주문',
        'value', to_char((today ->> 'totalOrders')::numeric, 'FM999,999,999,990') || '건',
        'change', case
          when today ->> 'orderChangeRate' is null then '비교 데이터 없음'
          else case when (today ->> 'orderChangeRate')::numeric > 0 then '+' else '' end
            || (today ->> 'orderChangeRate') || '%'
        end,
        'detail', '어제 대비',
        'trend', case
          when today ->> 'orderChangeRate' is null
            or (today ->> 'orderChangeRate')::numeric = 0 then 'neutral'
          when (today ->> 'orderChangeRate')::numeric > 0 then 'up'
          else 'down'
        end,
        'icon', 'orders'
      ),
      jsonb_build_object(
        'label', '처리 대기',
        'value', to_char((today ->> 'pendingCount')::numeric, 'FM999,999,999,990') || '건',
        'change', case when (today ->> 'pendingChangeCount')::numeric > 0 then '+' else '' end
          || (today ->> 'pendingChangeCount') || '건',
        'detail', '어제 대비',
        'trend', case
          when (today ->> 'pendingChangeCount')::numeric > 0 then 'warning'
          when (today ->> 'pendingChangeCount')::numeric < 0 then 'down'
          else 'neutral'
        end,
        'icon', 'pending'
      ),
      jsonb_build_object(
        'label', '오늘 매출',
        'value', '₩' || to_char((today ->> 'todayRevenue')::numeric, 'FM999,999,999,990'),
        'change', case
          when today ->> 'revenueChangeRate' is null then '비교 데이터 없음'
          else case when (today ->> 'revenueChangeRate')::numeric > 0 then '+' else '' end
            || (today ->> 'revenueChangeRate') || '%'
        end,
        'detail', '어제 대비',
        'trend', case
          when today ->> 'revenueChangeRate' is null
            or (today ->> 'revenueChangeRate')::numeric = 0 then 'neutral'
          when (today ->> 'revenueChangeRate')::numeric > 0 then 'up'
          else 'down'
        end,
        'icon', 'revenue'
      ),
      jsonb_build_object(
        'label', '재고 위험',
        'value', (inventory ->> 'riskCount') || ' SKU',
        'change', '확인 필요',
        'detail', '품절 ' || (inventory ->> 'soldOutCount') || ' · 부족 '
          || ((inventory ->> 'riskCount')::integer - (inventory ->> 'soldOutCount')::integer),
        'trend', case
          when (inventory ->> 'riskCount')::integer > 0 then 'warning'
          else 'neutral'
        end,
        'icon', 'stock'
      )
    ),
    'weeklyOrders', coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'day', case extract(dow from row.stat_date::date)
              when 0 then '일' when 1 then '월' when 2 then '화'
              when 3 then '수' when 4 then '목' when 5 then '금'
              else '토'
            end,
            'orders', row.order_count,
            'revenue', round(row.gross_revenue / 1000000.0, 1)
          )
          order by row.stat_date
        )
        from jsonb_to_recordset(data -> 'weeklyRows') as row(
          stat_date date,
          order_count integer,
          gross_revenue bigint
        )
      ),
      '[]'::jsonb
    ),
    'weeklySummary', weekly,
    'channelShare', coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'label', row.name,
            'value', row.share_percent,
            'color', case row.code
              when 'smartstore' then 'bg-[#c96d3a]'
              when 'own_mall' then 'bg-[#3c8674]'
              when 'coupang' then 'bg-[#d6b76d]'
              else 'bg-muted-foreground'
            end
          )
        )
        from jsonb_to_recordset(data -> 'channelRows') as row(
          code text,
          name text,
          share_percent numeric
        )
      ),
      '[]'::jsonb
    ),
    'operationAlerts', coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'title', row.product_name || ' 재고 부족',
            'description', '현재 ' || row.available || '개 · 안전 재고 '
              || row.reorder_point || '개',
            'tone', case when row.available = 0 then 'danger' else 'warning' end
          )
        )
        from (
          select *
          from jsonb_to_recordset(data -> 'riskInventoryRows') as item(
            available integer,
            reorder_point integer,
            product_name text
          )
          limit 2
        ) as row
      ),
      '[]'::jsonb
    ),
    'operationStatus', jsonb_build_object(
      'total', (today ->> 'totalOrders')::integer,
      'completed', (today ->> 'completedCount')::integer,
      'shipping', (today ->> 'shippingCount')::integer,
      'pending', (today ->> 'pendingCount')::integer,
      'completionRate', (today ->> 'completionRate')::numeric
    ),
    'recentOrders', coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'id', row.order_number,
            'customer', row.customer_name,
            'product', case
              when jsonb_array_length(row.order_items) = 0 then '상품 정보 없음'
              when jsonb_array_length(row.order_items) = 1
                then row.order_items -> 0 ->> 'product_name'
              else row.order_items -> 0 ->> 'product_name'
                || ' 외 ' || (jsonb_array_length(row.order_items) - 1) || '건'
            end,
            'channel', row.channel_name,
            'amount', '₩' || to_char(row.total_amount, 'FM999,999,999,990'),
            'status', case row.status
              when 'paid' then '결제완료'
              when 'preparing' then '상품준비'
              when 'shipping' then '배송중'
              when 'delivered' then '배송완료'
              else '결제완료'
            end,
            'time', to_char(row.ordered_at at time zone 'Asia/Seoul', 'HH24:MI')
          )
          order by row.ordered_at desc
        )
        from jsonb_to_recordset(data -> 'recentOrderRows') as row(
          order_number text,
          customer_name text,
          status text,
          total_amount numeric,
          ordered_at timestamptz,
          channel_name text,
          order_items jsonb
        )
      ),
      '[]'::jsonb
    )
  )
  from payload;
$$;

revoke all on function public.get_dashboard_view() from public;
grant execute on function public.get_dashboard_view() to authenticated;

comment on function public.get_dashboard_view() is
  'Returns the presentation-ready dashboard view model for the admin application.';
