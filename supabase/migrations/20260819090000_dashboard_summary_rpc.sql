create or replace function public.get_dashboard_summary()
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  select jsonb_build_object(
    'weeklyRows', coalesce(
      (
        select jsonb_agg(to_jsonb(weekly) order by weekly.stat_date asc)
        from (
          select stat_date, order_count, gross_revenue
          from public.dashboard_weekly_sales
          order by stat_date desc
          limit 7
        ) as weekly
      ),
      '[]'::jsonb
    ),
    'weeklySummary', (
      with latest as (
        select max(stat_date) as max_date
        from public.dashboard_weekly_sales
      ), totals as (
        select
          coalesce(sum(sales.order_count) filter (
            where sales.stat_date > latest.max_date - 7
          ), 0) as total_orders,
          coalesce(sum(sales.order_count) filter (
            where sales.stat_date > latest.max_date - 14
              and sales.stat_date <= latest.max_date - 7
          ), 0) as previous_total_orders
        from public.dashboard_weekly_sales as sales
        cross join latest
      )
      select jsonb_build_object(
        'totalOrders', total_orders,
        'changeRate', case
          when previous_total_orders = 0 then null
          else round(
            100.0 * (total_orders - previous_total_orders)
            / previous_total_orders,
            1
          )
        end
      )
      from totals
    ),
    'channelRows', coalesce(
      (
        select jsonb_agg(to_jsonb(channel_row) order by channel_row.share_percent desc)
        from (
          select code, name, share_percent
          from public.dashboard_channel_share
        ) as channel_row
      ),
      '[]'::jsonb
    ),
    'riskInventoryRows', coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'available', inventory.available,
            'reorder_point', inventory.reorder_point,
            'product_name', products.name
          )
          order by inventory.available asc
        )
        from public.inventory
        join public.products on products.id = inventory.product_id
        where inventory.available <= inventory.reorder_point
      ),
      '[]'::jsonb
    ),
    'inventorySummary', (
      select jsonb_build_object(
        'riskCount', count(*) filter (
          where inventory.available <= inventory.reorder_point
        ),
        'soldOutCount', count(*) filter (
          where inventory.available = 0
        )
      )
      from public.inventory
    ),
    'todaySummary', (
      select jsonb_build_object(
        'totalOrders', total_orders,
        'todayRevenue', today_revenue,
        'pendingCount', pending_count,
        'completedCount', completed_count,
        'shippingCount', shipping_count,
        'completionRate', case
          when total_orders = 0 then 0
          else round(100.0 * completed_count / total_orders)
        end,
        'orderChangeRate', case
          when previous_total_orders = 0 then null
          else round(
            100.0 * (total_orders - previous_total_orders)
            / previous_total_orders,
            1
          )
        end,
        'revenueChangeRate', case
          when previous_revenue = 0 then null
          else round(
            100.0 * (today_revenue - previous_revenue)
            / previous_revenue,
            1
          )
        end,
        'pendingChangeCount', pending_count - previous_pending_count
      )
      from (
        select
          count(*) filter (
            where orders.ordered_at >= bounds.today_start
          ) as total_orders,
          coalesce(sum(orders.total_amount) filter (
            where orders.ordered_at >= bounds.today_start
          ), 0) as today_revenue,
          count(*) filter (
            where orders.ordered_at >= bounds.today_start
              and orders.status in ('paid', 'preparing')
          ) as pending_count,
          count(*) filter (
            where orders.ordered_at >= bounds.today_start
              and orders.status = 'delivered'
          ) as completed_count,
          count(*) filter (
            where orders.ordered_at >= bounds.today_start
              and orders.status = 'shipping'
          ) as shipping_count,
          count(*) filter (
            where orders.ordered_at < bounds.today_start
          ) as previous_total_orders,
          coalesce(sum(orders.total_amount) filter (
            where orders.ordered_at < bounds.today_start
          ), 0) as previous_revenue,
          count(*) filter (
            where orders.ordered_at < bounds.today_start
              and orders.status in ('paid', 'preparing')
          ) as previous_pending_count
        from public.orders
        cross join lateral (
          select
            date_trunc('day', now() at time zone 'Asia/Seoul')
              at time zone 'Asia/Seoul' as today_start,
            (date_trunc('day', now() at time zone 'Asia/Seoul') - interval '1 day')
              at time zone 'Asia/Seoul' as yesterday_start,
            (date_trunc('day', now() at time zone 'Asia/Seoul') + interval '1 day')
              at time zone 'Asia/Seoul' as tomorrow_start
        ) as bounds
        where orders.ordered_at >= bounds.yesterday_start
          and orders.ordered_at < bounds.tomorrow_start
      ) as daily
    ),
    'recentOrderRows', coalesce(
      (
        select jsonb_agg(to_jsonb(recent_order) order by recent_order.ordered_at desc)
        from (
          select
            orders.order_number,
            orders.customer_name,
            orders.status,
            orders.total_amount,
            orders.ordered_at,
            sales_channels.name as channel_name,
            coalesce(
              (
                select jsonb_agg(
                  jsonb_build_object('product_name', order_items.product_name)
                  order by order_items.id
                )
                from public.order_items
                where order_items.order_id = orders.id
              ),
              '[]'::jsonb
            ) as order_items
          from public.orders
          join public.sales_channels on sales_channels.id = orders.channel_id
          order by orders.ordered_at desc
          limit 4
        ) as recent_order
      ),
      '[]'::jsonb
    )
  );
$$;

revoke all on function public.get_dashboard_summary() from public;
grant execute on function public.get_dashboard_summary() to authenticated;

comment on function public.get_dashboard_summary() is
  'Returns the complete operations dashboard payload for the authenticated admin.';
