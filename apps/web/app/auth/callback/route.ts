import { type NextRequest, NextResponse } from "next/server";

import { ROUTES } from "@/shared/config/routes";
import { createClient } from "@/shared/lib/supabase/server";

const isSafeInternalPath = (value: string | null): value is string =>
  Boolean(value?.startsWith("/") && !value.startsWith("//"));

export const GET = async (request: NextRequest) => {
  const code = request.nextUrl.searchParams.get("code");
  const requestedPath = request.nextUrl.searchParams.get("next");
  const nextPath = isSafeInternalPath(requestedPath)
    ? requestedPath
    : ROUTES.home;

  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data: customer } = user
          ? await supabase
              .from("customers")
              .select("onboarding_completed_at")
              .eq("auth_user_id", user.id)
              .maybeSingle()
          : { data: null };
        const destination = customer?.onboarding_completed_at
          ? nextPath
          : ROUTES.onboarding;

        return NextResponse.redirect(new URL(destination, request.url));
      }
    } catch (error) {
      console.error("[web-auth-callback] failed", error);
    }
  }

  const loginUrl = new URL(ROUTES.login, request.url);
  loginUrl.searchParams.set("error", "invalid_callback");
  return NextResponse.redirect(loginUrl);
};
