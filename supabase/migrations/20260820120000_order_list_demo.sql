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
  ('10000000-0000-4000-8000-000000000178', 'FO-DEMO-0178', (select id from public.sales_channels where code = 'own_mall'), '정하은', 'haeun.jeong@example.com', 'paid', 67000, now() - interval '1 hour'),
  ('10000000-0000-4000-8000-000000000177', 'FO-DEMO-0177', (select id from public.sales_channels where code = 'own_mall'), '윤지호', 'jiho.yoon@example.com', 'preparing', 44000, now() - interval '3 hours'),
  ('10000000-0000-4000-8000-000000000176', 'FO-DEMO-0176', (select id from public.sales_channels where code = 'own_mall'), '한소희', 'sohee.han@example.com', 'shipping', 93000, now() - interval '7 hours'),
  ('10000000-0000-4000-8000-000000000175', 'FO-DEMO-0175', (select id from public.sales_channels where code = 'own_mall'), '오세진', 'sejin.oh@example.com', 'delivered', 32000, now() - interval '1 day 2 hours'),
  ('10000000-0000-4000-8000-000000000174', 'FO-DEMO-0174', (select id from public.sales_channels where code = 'own_mall'), '강유나', 'yuna.kang@example.com', 'cancelled', 54000, now() - interval '1 day 6 hours'),
  ('10000000-0000-4000-8000-000000000173', 'FO-DEMO-0173', (select id from public.sales_channels where code = 'own_mall'), '임현우', 'hyunwoo.lim@example.com', 'delivered', 49000, now() - interval '2 days 1 hour'),
  ('10000000-0000-4000-8000-000000000172', 'FO-DEMO-0172', (select id from public.sales_channels where code = 'own_mall'), '서지안', 'jian.seo@example.com', 'delivered', 88000, now() - interval '2 days 5 hours'),
  ('10000000-0000-4000-8000-000000000171', 'FO-DEMO-0171', (select id from public.sales_channels where code = 'own_mall'), '조민준', 'minjun.jo@example.com', 'cancelled', 22000, now() - interval '3 days 3 hours')
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
  ('10000000-0000-4000-8000-000000000178', '00000000-0000-4000-8000-000000000001', '제주 감귤 선물세트', 1, 39000),
  ('10000000-0000-4000-8000-000000000178', '00000000-0000-4000-8000-000000000006', '완도 김 선물세트', 1, 28000),
  ('10000000-0000-4000-8000-000000000177', '00000000-0000-4000-8000-000000000007', '제주 녹차 티백 세트', 2, 22000),
  ('10000000-0000-4000-8000-000000000176', '00000000-0000-4000-8000-000000000002', '프리미엄 견과 6종 세트', 1, 54000),
  ('10000000-0000-4000-8000-000000000176', '00000000-0000-4000-8000-000000000001', '제주 감귤 선물세트', 1, 39000),
  ('10000000-0000-4000-8000-000000000175', '00000000-0000-4000-8000-000000000009', '저온압착 들기름', 1, 32000),
  ('10000000-0000-4000-8000-000000000174', '00000000-0000-4000-8000-000000000002', '프리미엄 견과 6종 세트', 1, 54000),
  ('10000000-0000-4000-8000-000000000173', '00000000-0000-4000-8000-000000000003', '유기농 레몬청 500ml', 2, 16500),
  ('10000000-0000-4000-8000-000000000173', '00000000-0000-4000-8000-000000000005', '천연 벌꿀 스틱 10개입', 1, 13000),
  ('10000000-0000-4000-8000-000000000172', '00000000-0000-4000-8000-000000000004', '콜드브루 원액 세트', 1, 36000),
  ('10000000-0000-4000-8000-000000000172', '00000000-0000-4000-8000-000000000005', '천연 벌꿀 스틱 10개입', 4, 13000),
  ('10000000-0000-4000-8000-000000000171', '00000000-0000-4000-8000-000000000007', '제주 녹차 티백 세트', 1, 22000)
on conflict (order_id, product_id) do update set
  product_name = excluded.product_name,
  quantity = excluded.quantity,
  unit_price = excluded.unit_price;

create or replace function public.get_orders()
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'id', orders.id,
        'orderNumber', orders.order_number,
        'customerName', orders.customer_name,
        'customerEmail', orders.customer_email,
        'status', orders.status,
        'totalAmount', orders.total_amount,
        'orderedAt', orders.ordered_at,
        'itemCount', coalesce(items.item_count, 0),
        'totalQuantity', coalesce(items.total_quantity, 0)
      )
      order by orders.ordered_at desc
    ),
    '[]'::jsonb
  )
  from public.orders
  left join lateral (
    select
      count(*)::integer as item_count,
      coalesce(sum(order_items.quantity), 0)::integer as total_quantity
    from public.order_items
    where order_items.order_id = orders.id
  ) as items on true;
$$;

revoke all on function public.get_orders() from public;
grant execute on function public.get_orders() to authenticated;

comment on function public.get_orders() is
  'Returns the order list for the authenticated admin.';
