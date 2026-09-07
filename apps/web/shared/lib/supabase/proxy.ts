import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

import { ROUTES } from "@/shared/config/routes";

import { isSupabaseConfigured } from "./config";

const AUTH_PATHS = [ROUTES.login, ROUTES.signup];

export const updateSession = async (request: NextRequest) => {
  let response = NextResponse.next({ request });

  if (!isSupabaseConfigured()) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;

  if (
    !user &&
    (pathname === ROUTES.onboarding || pathname.startsWith("/mypage"))
  ) {
    return NextResponse.redirect(new URL(ROUTES.login, request.url));
  }

  if (user) {
    const { data: customer } = await supabase
      .from("customers")
      .select("onboarding_completed_at")
      .eq("auth_user_id", user.id)
      .maybeSingle();
    const isCompleted = Boolean(customer?.onboarding_completed_at);

    if (
      !isCompleted &&
      pathname !== ROUTES.onboarding &&
      pathname !== ROUTES.authCallback
    ) {
      return NextResponse.redirect(new URL(ROUTES.onboarding, request.url));
    }

    if (AUTH_PATHS.includes(pathname as "/login" | "/signup")) {
      return NextResponse.redirect(
        new URL(isCompleted ? ROUTES.home : ROUTES.onboarding, request.url),
      );
    }

    if (pathname === ROUTES.onboarding && isCompleted) {
      return NextResponse.redirect(new URL(ROUTES.home, request.url));
    }
  }

  return response;
};
