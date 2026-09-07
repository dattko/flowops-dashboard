"use client";

import { ROUTES } from "@/shared/config/routes";
import { createClient } from "@/shared/lib/supabase/client";

import type { BaseApiFetcherOptions } from "./types";
import { parseApiResponse } from "./utils";

const endpoint = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const apiKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const createBaseApiFetcherClient = async <TResponse, TBody = unknown>({
  baseUrl = endpoint,
  url,
  method = "GET",
  body,
  options,
}: BaseApiFetcherOptions<TBody>): Promise<TResponse> => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const response = await fetch(new URL(url, baseUrl), {
    ...options,
    method,
    headers: {
      apikey: apiKey,
      ...(session ? { Authorization: `Bearer ${session.access_token}` } : {}),
      Accept: "application/json",
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      ...options?.headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: options?.cache ?? "no-store",
  });

  if (response.status === 401) {
    await supabase.auth.signOut({ scope: "local" });
    window.location.replace(ROUTES.login);
  }

  return parseApiResponse<TResponse>(response);
};

const baseApiFetcherClient = {
  get: <TResponse>(url: string, options?: RequestInit) =>
    createBaseApiFetcherClient<TResponse>({ url, options }),
  post: <TResponse, TBody = unknown>(url: string, body?: TBody, options?: RequestInit) =>
    createBaseApiFetcherClient<TResponse, TBody>({ url, method: "POST", body, options }),
  put: <TResponse, TBody = unknown>(url: string, body: TBody, options?: RequestInit) =>
    createBaseApiFetcherClient<TResponse, TBody>({ url, method: "PUT", body, options }),
  patch: <TResponse, TBody = unknown>(url: string, body: TBody, options?: RequestInit) =>
    createBaseApiFetcherClient<TResponse, TBody>({ url, method: "PATCH", body, options }),
  delete: <TResponse>(url: string, options?: RequestInit) =>
    createBaseApiFetcherClient<TResponse>({ url, method: "DELETE", options }),
} as const;

export { baseApiFetcherClient, createBaseApiFetcherClient };
