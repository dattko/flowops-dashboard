-- FlowOps is operated as a first-party mall. Consolidate existing demo data
-- into the own-mall channel before removing marketplace channels.

update public.orders
set channel_id = (
  select id
  from public.sales_channels
  where code = 'own_mall'
)
where channel_id in (
  select id
  from public.sales_channels
  where code <> 'own_mall'
);

insert into public.daily_channel_metrics (
  stat_date,
  channel_id,
  order_count,
  gross_revenue
)
select
  metrics.stat_date,
  own_mall.id,
  sum(metrics.order_count),
  sum(metrics.gross_revenue)
from public.daily_channel_metrics as metrics
cross join (
  select id
  from public.sales_channels
  where code = 'own_mall'
) as own_mall
group by metrics.stat_date, own_mall.id
on conflict (stat_date, channel_id) do update set
  order_count = excluded.order_count,
  gross_revenue = excluded.gross_revenue;

delete from public.sales_channels
where code <> 'own_mall';
