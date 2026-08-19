-- Portfolio demo data. Authentication users are intentionally not seeded.

insert into public.sales_channels (code, name)
values
  ('smartstore', '스마트스토어'),
  ('own_mall', '자사몰'),
  ('coupang', '쿠팡')
on conflict (code) do update set name = excluded.name;

insert into public.products (id, sku, name, description, price, status)
values
  ('00000000-0000-4000-8000-000000000001', 'JEJU-GIFT-01', '제주 감귤 선물세트', '제주산 감귤 선물용 패키지', 39000, 'active'),
  ('00000000-0000-4000-8000-000000000002', 'NUTS-PREMIUM-06', '프리미엄 견과 6종 세트', '하루 견과 6종 구성', 54000, 'active'),
  ('00000000-0000-4000-8000-000000000003', 'LEMON-ORGANIC-500', '유기농 레몬청 500ml', '유기농 레몬으로 만든 수제청', 16500, 'active'),
  ('00000000-0000-4000-8000-000000000004', 'COLDBREW-SET-01', '콜드브루 원액 세트', '콜드브루 원액 3병 세트', 36000, 'active'),
  ('00000000-0000-4000-8000-000000000005', 'HONEY-STICK-10', '천연 벌꿀 스틱 10개입', null, 13000, 'active'),
  ('00000000-0000-4000-8000-000000000006', 'SEAWEED-GIFT-01', '완도 김 선물세트', null, 28000, 'active'),
  ('00000000-0000-4000-8000-000000000007', 'TEA-JEJU-01', '제주 녹차 티백 세트', null, 22000, 'active'),
  ('00000000-0000-4000-8000-000000000008', 'RICE-SNACK-01', '현미 스낵 세트', null, 18000, 'active'),
  ('00000000-0000-4000-8000-000000000009', 'OIL-PERILLA-01', '저온압착 들기름', null, 32000, 'active')
on conflict (sku) do update set
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  status = excluded.status;

insert into public.inventory (product_id, on_hand, reserved, reorder_point)
values
  ('00000000-0000-4000-8000-000000000001', 8, 0, 12),
  ('00000000-0000-4000-8000-000000000002', 42, 2, 10),
  ('00000000-0000-4000-8000-000000000003', 21, 1, 10),
  ('00000000-0000-4000-8000-000000000004', 35, 0, 8),
  ('00000000-0000-4000-8000-000000000005', 0, 0, 10),
  ('00000000-0000-4000-8000-000000000006', 3, 0, 8),
  ('00000000-0000-4000-8000-000000000007', 4, 0, 9),
  ('00000000-0000-4000-8000-000000000008', 2, 0, 7),
  ('00000000-0000-4000-8000-000000000009', 0, 0, 5)
on conflict (product_id) do update set
  on_hand = excluded.on_hand,
  reserved = excluded.reserved,
  reorder_point = excluded.reorder_point;

insert into public.orders (
  id,
  order_number,
  channel_id,
  customer_name,
  customer_email,
  status,
  total_amount,
  ordered_at
)
values
  (
    '10000000-0000-4000-8000-000000000182',
    'FO-DEMO-0182',
    (select id from public.sales_channels where code = 'smartstore'),
    '김서윤',
    'seoyun.kim@example.com',
    'paid',
    78000,
    current_date + time '14:32'
  ),
  (
    '10000000-0000-4000-8000-000000000181',
    'FO-DEMO-0181',
    (select id from public.sales_channels where code = 'own_mall'),
    '박지훈',
    'jihun.park@example.com',
    'preparing',
    54000,
    current_date + time '14:18'
  ),
  (
    '10000000-0000-4000-8000-000000000180',
    'FO-DEMO-0180',
    (select id from public.sales_channels where code = 'coupang'),
    '이민정',
    'minjeong.lee@example.com',
    'shipping',
    42500,
    current_date + time '13:56'
  ),
  (
    '10000000-0000-4000-8000-000000000179',
    'FO-DEMO-0179',
    (select id from public.sales_channels where code = 'own_mall'),
    '최도현',
    'dohyeon.choi@example.com',
    'delivered',
    36000,
    current_date + time '13:41'
  )
on conflict (order_number) do update set
  channel_id = excluded.channel_id,
  customer_name = excluded.customer_name,
  customer_email = excluded.customer_email,
  status = excluded.status,
  total_amount = excluded.total_amount,
  ordered_at = excluded.ordered_at;

insert into public.order_items (
  order_id,
  product_id,
  product_name,
  quantity,
  unit_price
)
values
  ('10000000-0000-4000-8000-000000000182', '00000000-0000-4000-8000-000000000001', '제주 감귤 선물세트', 2, 39000),
  ('10000000-0000-4000-8000-000000000181', '00000000-0000-4000-8000-000000000002', '프리미엄 견과 6종 세트', 1, 54000),
  ('10000000-0000-4000-8000-000000000180', '00000000-0000-4000-8000-000000000003', '유기농 레몬청 500ml', 1, 16500),
  ('10000000-0000-4000-8000-000000000180', '00000000-0000-4000-8000-000000000005', '천연 벌꿀 스틱 10개입', 2, 13000),
  ('10000000-0000-4000-8000-000000000179', '00000000-0000-4000-8000-000000000004', '콜드브루 원액 세트', 1, 36000)
on conflict (order_id, product_id) do update set
  product_name = excluded.product_name,
  quantity = excluded.quantity,
  unit_price = excluded.unit_price;

-- The last complete Monday-Sunday week mirrors the current dashboard mock.
with metric_rows(day_offset, smartstore_orders, own_mall_orders, coupang_orders, total_revenue) as (
  values
    (0, 47, 30, 21, 5400000::bigint),
    (1, 60, 38, 26, 6800000::bigint),
    (2, 54, 35, 23, 6200000::bigint),
    (3, 75, 48, 33, 8100000::bigint),
    (4, 66, 43, 29, 7500000::bigint),
    (5, 88, 57, 39, 9800000::bigint),
    (6, 68, 45, 29, 8400000::bigint)
), expanded as (
  select
    (date_trunc('week', current_date)::date - 7 + rows.day_offset) as stat_date,
    channels.id as channel_id,
    channel_values.order_count,
    round(
      rows.total_revenue::numeric
        * channel_values.order_count
        / (rows.smartstore_orders + rows.own_mall_orders + rows.coupang_orders)
    )::bigint as gross_revenue
  from metric_rows as rows
  cross join lateral (
    values
      ('smartstore', rows.smartstore_orders),
      ('own_mall', rows.own_mall_orders),
      ('coupang', rows.coupang_orders)
  ) as channel_values(code, order_count)
  join public.sales_channels as channels on channels.code = channel_values.code
)
insert into public.daily_channel_metrics (
  stat_date,
  channel_id,
  order_count,
  gross_revenue
)
select stat_date, channel_id, order_count, gross_revenue
from expanded
on conflict (stat_date, channel_id) do update set
  order_count = excluded.order_count,
  gross_revenue = excluded.gross_revenue;
