create or replace function public.get_my_profile()
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  select jsonb_build_object(
    'id', profiles.id,
    'displayName', profiles.display_name,
    'avatarUrl', profiles.avatar_url,
    'role', profiles.role
  )
  from public.profiles
  where profiles.id = (select auth.uid());
$$;

revoke all on function public.get_my_profile() from public;
grant execute on function public.get_my_profile() to authenticated;

comment on function public.get_my_profile() is
  'Returns the authenticated user profile.';
