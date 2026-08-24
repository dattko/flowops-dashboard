-- Store, shipping, and administrator account settings.

create table public.store_settings (
  id smallint primary key default 1 check (id = 1),
  store_name text not null,
  support_email text not null,
  support_phone text not null,
  business_number text not null,
  default_shipping_fee integer not null default 3000
    check (default_shipping_fee >= 0),
  free_shipping_threshold integer not null default 50000
    check (free_shipping_threshold >= 0),
  default_carrier text not null,
  return_shipping_fee integer not null default 6000
    check (return_shipping_fee >= 0),
  shipping_address text not null,
  return_address text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger store_settings_set_updated_at
before update on public.store_settings
for each row execute function public.set_updated_at();

alter table public.store_settings enable row level security;

create policy "store_settings_admin_all"
on public.store_settings for all to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

grant select, update on public.store_settings to authenticated;

insert into public.store_settings (
  store_name,
  support_email,
  support_phone,
  business_number,
  default_shipping_fee,
  free_shipping_threshold,
  default_carrier,
  return_shipping_fee,
  shipping_address,
  return_address
)
values (
  'FlowOps Store',
  'support@flowops.co.kr',
  '02-1234-5678',
  '123-45-67890',
  3000,
  50000,
  'CJ대한통운',
  6000,
  '서울특별시 성동구 왕십리로 125',
  '경기도 성남시 분당구 판교역로 166'
);

create function public.get_admin_settings()
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  select jsonb_build_object(
    'store', jsonb_build_object(
      'storeName', settings.store_name,
      'supportEmail', settings.support_email,
      'supportPhone', settings.support_phone,
      'businessNumber', settings.business_number
    ),
    'shipping', jsonb_build_object(
      'defaultShippingFee', settings.default_shipping_fee,
      'freeShippingThreshold', settings.free_shipping_threshold,
      'defaultCarrier', settings.default_carrier,
      'returnShippingFee', settings.return_shipping_fee,
      'shippingAddress', settings.shipping_address,
      'returnAddress', settings.return_address
    ),
    'account', jsonb_build_object(
      'displayName', profiles.display_name,
      'email', (select auth.jwt() ->> 'email'),
      'avatarUrl', profiles.avatar_url
    )
  )
  from public.store_settings as settings
  join public.profiles on profiles.id = (select auth.uid())
  where settings.id = 1;
$$;

create function public.update_admin_settings(p_payload jsonb)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  invalid_key text;
begin
  if p_payload is null or jsonb_typeof(p_payload) <> 'object' then
    raise exception '수정할 설정 정보를 확인해 주세요.' using errcode = '22023';
  end if;

  select keys.key
  into invalid_key
  from jsonb_object_keys(p_payload) as keys(key)
  where keys.key not in (
    'storeName',
    'supportEmail',
    'supportPhone',
    'businessNumber',
    'defaultShippingFee',
    'freeShippingThreshold',
    'defaultCarrier',
    'returnShippingFee',
    'shippingAddress',
    'returnAddress',
    'displayName',
    'avatarUrl'
  )
  limit 1;

  if invalid_key is not null then
    raise exception '수정할 수 없는 설정 필드입니다: %', invalid_key
      using errcode = '22023';
  end if;

  if nullif(trim(p_payload ->> 'storeName'), '') is null
    or nullif(trim(p_payload ->> 'supportEmail'), '') is null
    or nullif(trim(p_payload ->> 'supportPhone'), '') is null
    or nullif(trim(p_payload ->> 'businessNumber'), '') is null
    or nullif(trim(p_payload ->> 'defaultCarrier'), '') is null
    or nullif(trim(p_payload ->> 'shippingAddress'), '') is null
    or nullif(trim(p_payload ->> 'returnAddress'), '') is null
    or nullif(trim(p_payload ->> 'displayName'), '') is null then
    raise exception '필수 설정값을 모두 입력해 주세요.' using errcode = '22023';
  end if;

  if (p_payload ->> 'defaultShippingFee')::integer < 0
    or (p_payload ->> 'freeShippingThreshold')::integer < 0
    or (p_payload ->> 'returnShippingFee')::integer < 0 then
    raise exception '배송 관련 금액은 0원 이상이어야 합니다.' using errcode = '22023';
  end if;

  update public.store_settings
  set
    store_name = trim(p_payload ->> 'storeName'),
    support_email = trim(p_payload ->> 'supportEmail'),
    support_phone = trim(p_payload ->> 'supportPhone'),
    business_number = trim(p_payload ->> 'businessNumber'),
    default_shipping_fee = (p_payload ->> 'defaultShippingFee')::integer,
    free_shipping_threshold = (p_payload ->> 'freeShippingThreshold')::integer,
    default_carrier = trim(p_payload ->> 'defaultCarrier'),
    return_shipping_fee = (p_payload ->> 'returnShippingFee')::integer,
    shipping_address = trim(p_payload ->> 'shippingAddress'),
    return_address = trim(p_payload ->> 'returnAddress')
  where id = 1;

  update public.profiles
  set
    display_name = trim(p_payload ->> 'displayName'),
    avatar_url = nullif(trim(p_payload ->> 'avatarUrl'), '')
  where id = (select auth.uid());

  return public.get_admin_settings();
end;
$$;

revoke all on function public.get_admin_settings() from public;
grant execute on function public.get_admin_settings() to authenticated;

revoke all on function public.update_admin_settings(jsonb) from public;
grant execute on function public.update_admin_settings(jsonb) to authenticated;

comment on table public.store_settings is
  'Singleton store and shipping configuration for the admin application.';
