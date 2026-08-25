-- Expand the Morrow Coffee portfolio catalog to 100 products.
-- The existing nine products remain unchanged; this migration adds 91 products
-- with enough stock variation to exercise inventory filters and pagination.

with
single_origins(code, name, tasting_note, base_price) as (
  values
    ('ETH-YIRG-W', '에티오피아 예가체프 워시드', '재스민, 레몬, 홍차', 23000),
    ('ETH-GUJI-N', '에티오피아 구지 내추럴', '블루베리, 딸기, 카카오', 24000),
    ('KEN-NYERI-W', '케냐 니에리 워시드', '블랙커런트, 자몽, 흑설탕', 25000),
    ('COL-HUILA-W', '콜롬비아 우일라 워시드', '오렌지, 캐러멜, 아몬드', 21000),
    ('GUA-HUE-W', '과테말라 우에우에테낭고 워시드', '사과, 밀크초콜릿, 헤이즐넛', 22000),
    ('BRA-CER-N', '브라질 세하도 내추럴', '구운 견과, 초콜릿, 브라운슈거', 19000),
    ('COS-TARR-H', '코스타리카 따라주 허니', '살구, 꿀, 캐러멜', 24000),
    ('PAN-BOQ-W', '파나마 보케테 워시드', '오렌지 블로섬, 배, 홍차', 27000),
    ('RWA-NYA-W', '르완다 냐마셰케 워시드', '자두, 홍차, 사탕수수', 22000),
    ('BUR-KAY-W', '부룬디 카얀자 워시드', '체리, 오렌지, 캐러멜', 23000),
    ('INA-SUM-W', '인도네시아 수마트라 웨트훌', '허브, 다크초콜릿, 스파이스', 21000),
    ('PER-CAJ-W', '페루 카하마르카 워시드', '사과, 캐러멜, 피칸', 20000)
),
bean_sizes(size_grams, size_label) as (
  values
    (100, '100g'),
    (200, '200g'),
    (500, '500g')
),
single_origin_products as (
  select
    'MC-BEAN-' || origin.code || '-' || sizes.size_grams as sku,
    origin.name || ' ' || sizes.size_label as name,
    origin.tasting_note || ' 풍미의 스페셜티 싱글 오리진 원두' as description,
    case sizes.size_grams
      when 100 then origin.base_price - 8000
      when 200 then origin.base_price
      else round(origin.base_price * 2.25)::integer
    end as price
  from single_origins as origin
  cross join bean_sizes as sizes
),
blends(code, name, tasting_note, base_price) as (
  values
    ('ESP01', '에스프레소 블렌드 No.1', '다크초콜릿, 캐러멜, 견과', 19000),
    ('CHOCO', '밀크 초콜릿 블렌드', '카카오, 헤이즐넛, 브라운슈거', 20000),
    ('BRUNCH', '선데이 브런치 블렌드', '오렌지, 꿀, 아몬드', 21000),
    ('DARK', '다크 나이트 블렌드', '다크초콜릿, 스모키, 흑설탕', 19000),
    ('FLORAL', '플로럴 가든 블렌드', '재스민, 복숭아, 홍차', 23000),
    ('BERRY', '베리 피크닉 블렌드', '딸기, 블루베리, 카카오', 23000),
    ('CITRUS', '시트러스 데이 블렌드', '레몬, 오렌지, 사탕수수', 22000),
    ('OFFICE', '오피스 데일리 블렌드', '캐러멜, 호두, 밀크초콜릿', 18000)
),
blend_sizes(size_grams, size_label) as (
  values
    (200, '200g'),
    (500, '500g')
),
blend_products as (
  select
    'MC-BLEND-' || blend.code || '-' || sizes.size_grams as sku,
    blend.name || ' ' || sizes.size_label as name,
    blend.tasting_note || '의 균형을 살린 로스터리 블렌드' as description,
    case sizes.size_grams
      when 200 then blend.base_price
      else round(blend.base_price * 2.25)::integer
    end as price
  from blends as blend
  cross join blend_sizes as sizes
),
drip_bag_products as (
  select
    'MC-DRIP-' || origin.code || '-10' as sku,
    origin.name || ' 드립백 10개입' as name,
    origin.tasting_note || ' 풍미를 간편하게 즐기는 개별 포장 드립백' as description,
    greatest(origin.base_price - 4000, 15000) as price
  from single_origins as origin
),
cold_brew_products(sku, name, description, price) as (
  values
    ('MC-CB-HOUSE-500', '하우스 블렌드 콜드브루 500ml', '초콜릿과 견과 풍미의 데일리 콜드브루 원액', 16000),
    ('MC-CB-DECAF-500', '디카페인 콜드브루 500ml', '늦은 시간에도 부담 없이 즐기는 디카페인 원액', 18000),
    ('MC-CB-ETH-500', '에티오피아 콜드브루 500ml', '베리 향을 선명하게 담은 싱글 오리진 원액', 19000),
    ('MC-CB-BRA-500', '브라질 콜드브루 500ml', '고소하고 부드러운 초콜릿 풍미의 원액', 17000),
    ('MC-CB-HOUSE-1000', '하우스 블렌드 콜드브루 1L', '넉넉한 용량으로 즐기는 데일리 콜드브루 원액', 28000),
    ('MC-CB-GIFT-03', '콜드브루 미니 보틀 선물세트 3입', '세 가지 원두의 풍미를 담은 200ml 미니 보틀 세트', 29000)
),
capsule_products(sku, name, description, price) as (
  values
    ('MC-CAP-HOUSE-10', '하우스 블렌드 커피 캡슐 10개입', '견과와 초콜릿 풍미의 네스프레소 호환 캡슐', 8500),
    ('MC-CAP-ESP-10', '에스프레소 블렌드 커피 캡슐 10개입', '진하고 묵직한 에스프레소용 호환 캡슐', 8500),
    ('MC-CAP-DECAF-10', '디카페인 커피 캡슐 10개입', '캐러멜 풍미의 디카페인 호환 캡슐', 9500),
    ('MC-CAP-ETH-10', '에티오피아 커피 캡슐 10개입', '화사한 베리 향의 싱글 오리진 호환 캡슐', 10000),
    ('MC-CAP-COL-10', '콜롬비아 커피 캡슐 10개입', '오렌지와 캐러멜 풍미의 호환 캡슐', 9000),
    ('MC-CAP-BRA-10', '브라질 커피 캡슐 10개입', '고소하고 부드러운 데일리 호환 캡슐', 8500),
    ('MC-CAP-SAMPLE-20', '커피 캡슐 샘플러 20개입', '네 가지 커피를 골고루 담은 호환 캡슐 세트', 17000),
    ('MC-CAP-OFFICE-50', '오피스 커피 캡슐 50개입', '사무실용으로 넉넉하게 구성한 대용량 호환 캡슐', 39000)
),
gear_products(sku, name, description, price) as (
  values
    ('MC-GEAR-V60-01-C', 'V60 드리퍼 01 클리어', '1~2인 추출용 투명 드리퍼', 8000),
    ('MC-GEAR-V60-02-C', 'V60 드리퍼 02 클리어', '1~4인 추출용 투명 드리퍼', 9500),
    ('MC-GEAR-SERVER-600', '내열 유리 커피 서버 600ml', '눈금이 표시된 홈브루잉용 유리 서버', 18000),
    ('MC-GEAR-KETTLE-600', '드립 포트 600ml', '섬세한 물줄기 조절이 가능한 스테인리스 포트', 42000),
    ('MC-GEAR-SCALE-01', '브루잉 전자저울', '0.1g 단위 측정과 타이머를 지원하는 커피 저울', 39000),
    ('MC-GEAR-GRINDER-HAND', '스테인리스 핸드밀', '분쇄도 조절이 가능한 세라믹 버 핸드밀', 48000),
    ('MC-GEAR-FRENCH-350', '프렌치프레스 350ml', '풍부한 바디감을 살리는 내열 유리 프렌치프레스', 28000),
    ('MC-GEAR-AERO-01', '에어로프레스 브루어 세트', '다양한 레시피로 추출할 수 있는 휴대용 브루어', 52000),
    ('MC-GEAR-TUMBLER-350', '로스터리 텀블러 350ml', '보온과 보냉이 가능한 스테인리스 텀블러', 32000),
    ('MC-GEAR-MUG-300', '로스터리 세라믹 머그 300ml', '모로우 커피 로고를 담은 데일리 머그', 18000),
    ('MC-GEAR-FILTER-V60-01', 'V60 커피 필터 01 100매', 'V60 01 드리퍼용 무표백 종이 필터', 7500),
    ('MC-GEAR-FILTER-AERO', '에어로프레스 필터 350매', '에어로프레스 전용 원형 종이 필터', 9000),
    ('MC-GEAR-BRUSH-01', '커피 그라인더 청소 브러시', '그라인더와 브루잉 도구 관리용 천연모 브러시', 12000)
),
catalog as (
  select * from single_origin_products
  union all
  select * from blend_products
  union all
  select * from drip_bag_products
  union all
  select * from cold_brew_products
  union all
  select * from capsule_products
  union all
  select * from gear_products
),
upserted_products as (
  insert into public.products (sku, name, description, price, status)
  select sku, name, description, price, 'active'
  from catalog
  on conflict (sku) do update set
    name = excluded.name,
    description = excluded.description,
    price = excluded.price,
    status = excluded.status
  returning id, sku
),
numbered_products as (
  select
    id,
    row_number() over (order by sku) as sequence
  from upserted_products
)
insert into public.inventory (product_id, on_hand, reserved, reorder_point)
select
  id,
  case
    when sequence % 17 = 0 then 0
    when sequence % 7 = 0 then 8
    else 24 + ((sequence * 7) % 73)::integer
  end as on_hand,
  case
    when sequence % 17 = 0 then 0
    when sequence % 7 = 0 then 1
    else (sequence % 6)::integer
  end as reserved,
  case
    when sequence % 5 = 0 then 12
    else 10
  end as reorder_point
from numbered_products
on conflict (product_id) do update set
  on_hand = excluded.on_hand,
  reserved = excluded.reserved,
  reorder_point = excluded.reorder_point;
