import "server-only";

import { cache } from "react";

import { createClient } from "@/shared/lib/supabase/server";

import type { BaseApiFetcherOptions } from "./types";
import { parseApiResponse } from "./utils";

const endpoint = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const apiKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const getAccessToken = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) throw new Error("로그인이 필요합니다.");

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("로그인 세션을 확인할 수 없습니다.");
  return session.access_token;
});

const createBaseApiFetcherServer = async <TResponse, TBody = unknown>({
  baseUrl = endpoint,
  url,
  method = "GET",
  body,
  options,
}: BaseApiFetcherOptions<TBody>): Promise<TResponse> => {
  const accessToken = await getAccessToken();
  const response = await fetch(new URL(url, baseUrl), {
    ...options,
    method,
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      ...options?.headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: options?.cache ?? "no-store",
  });

  return parseApiResponse<TResponse>(response);
};

const baseApiFetcherServer = {
  get: <TResponse>(url: string, options?: RequestInit) =>
    createBaseApiFetcherServer<TResponse>({ url, options }),
  post: <TResponse, TBody = unknown>(url: string, body?: TBody, options?: RequestInit) =>
    createBaseApiFetcherServer<TResponse, TBody>({ url, method: "POST", body, options }),
  put: <TResponse, TBody = unknown>(url: string, body: TBody, options?: RequestInit) =>
    createBaseApiFetcherServer<TResponse, TBody>({ url, method: "PUT", body, options }),
  patch: <TResponse, TBody = unknown>(url: string, body: TBody, options?: RequestInit) =>
    createBaseApiFetcherServer<TResponse, TBody>({ url, method: "PATCH", body, options }),
  delete: <TResponse>(url: string, options?: RequestInit) =>
    createBaseApiFetcherServer<TResponse>({ url, method: "DELETE", options }),
} as const;

export { baseApiFetcherServer, createBaseApiFetcherServer };
