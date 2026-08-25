-- Rebrand the demo merchant as Morrow Coffee, a specialty coffee D2C store.
-- Existing product and order identifiers stay stable so API examples and
-- relationships remain valid.

with coffee_products(id, sku, name, description, price) as (
  values
    (
      '00000000-0000-4000-8000-000000000001'::uuid,
      'BEAN-HOUSE-200',
      '모로우 하우스 블렌드 200g',
      '초콜릿과 견과의 단맛이 어우러진 데일리 블렌드',
      18000
    ),
    (
      '00000000-0000-4000-8000-000000000002'::uuid,
      'BEAN-ETH-NAT-200',
      '에티오피아 구지 내추럴 200g',
      '베리와 재스민 향이 선명한 에티오피아 싱글 오리진',
      22000
    ),
    (
      '00000000-0000-4000-8000-000000000003'::uuid,
      'BEAN-DECAF-200',
      '콜롬비아 디카페인 200g',
      '캐러멜과 견과 풍미를 살린 부드러운 디카페인 원두',
      23000
    ),
    (
      '00000000-0000-4000-8000-000000000004'::uuid,
      'BEAN-SEASON-200',
      '시즌 블렌드 200g',
      '계절의 개성을 담아 한정 로스팅한 시즌 블렌드',
      21000
    ),
    (
      '00000000-0000-4000-8000-000000000005'::uuid,
      'DRIP-HOUSE-10',
      '하우스 블렌드 드립백 10개입',
      '모로우 하우스 블렌드를 간편하게 즐기는 드립백 세트',
      15000
    ),
    (
      '00000000-0000-4000-8000-000000000006'::uuid,
      'DRIP-SAMPLER-06',
      '싱글 오리진 드립백 샘플러 6종',
      '산지별 원두 여섯 가지를 한 박스에 담은 샘플러',
      18000
    ),
    (
      '00000000-0000-4000-8000-000000000007'::uuid,
      'COLD-BREW-500',
      '콜드브루 원액 500ml',
      '초콜릿 풍미의 원두를 저온 추출한 콜드브루 원액',
      16000
    ),
    (
      '00000000-0000-4000-8000-000000000008'::uuid,
      'GEAR-CANISTER-01',
      '원두 보관 캐니스터',
      '원두의 향을 오래 유지하는 밀폐형 보관 용기',
      26000
    ),
    (
      '00000000-0000-4000-8000-000000000009'::uuid,
      'GEAR-FILTER-100',
      'V60 커피 필터 100매',
      'V60 01·02 드리퍼에 사용할 수 있는 무표백 종이 필터',
      8500
    )
)
update public.products as products
set
  sku = coffee_products.sku,
  name = coffee_products.name,
  description = coffee_products.description,
  price = coffee_products.price,
  status = 'active'
from coffee_products
where products.id = coffee_products.id;

-- Order items are snapshots. Only the portfolio demo orders are rewritten;
-- user-created orders are intentionally left untouched.
update public.order_items as items
set
  product_name = products.name,
  product_sku = products.sku,
  unit_price = products.price
from public.products as products, public.orders as orders
where items.product_id = products.id
  and items.order_id = orders.id
  and orders.id::text like '10000000-0000-4000-8000-%';

update public.orders as orders
set
  order_number = replace(orders.order_number, 'FO-DEMO-', 'MC-DEMO-'),
  total_amount = totals.total_amount
from (
  select
    items.order_id,
    sum(items.quantity * items.unit_price)::integer as total_amount
  from public.order_items as items
  join public.orders as demo_orders on demo_orders.id = items.order_id
  where demo_orders.id::text like '10000000-0000-4000-8000-%'
  group by items.order_id
) as totals
where orders.id = totals.order_id;

update public.order_payments as payments
set
  product_amount = orders.total_amount,
  paid_amount = greatest(
    orders.total_amount - payments.discount_amount + payments.shipping_fee,
    0
  )
from public.orders as orders
where payments.order_id = orders.id
  and orders.id::text like '10000000-0000-4000-8000-%';

update public.store_settings
set
  store_name = 'Morrow Coffee',
  support_email = 'hello@morrowcoffee.kr'
where id = 1;
