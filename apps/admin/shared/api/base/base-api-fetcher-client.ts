"use client"

import { createClient } from "@/shared/lib/supabase/client"

import type { ApiQuery, BaseApiFetcherOptions } from "./types"
import { createApiUrl, parseApiResponse } from "./utils"

const endPoint = process.env.NEXT_PUBLIC_SUPABASE_URL!
const apiKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

const createBaseApiFetcherClient = async <TResponse, TBody = unknown>({
  baseUrl = endPoint,
  url,
  method = "GET",
  query,
  body,
  options,
}: BaseApiFetcherOptions<TBody>): Promise<TResponse> => {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const response = await fetch(createApiUrl(baseUrl, url, query), {
    ...options,
    method,
    headers: {
      apikey: apiKey,
      ...(session
        ? { Authorization: `Bearer ${session.access_token}` }
        : {}),
      Accept: "application/json",
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      ...options?.headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: options?.cache ?? "no-store",
  })

  if (response.status === 401) {
    await supabase.auth.signOut({ scope: "local" })
    window.location.replace("/login")
  }

  return parseApiResponse<TResponse>(response)
}

const getBaseApiFetcherClient = <TResponse>(
  url: string,
  query?: ApiQuery,
  options?: RequestInit
) => createBaseApiFetcherClient<TResponse>({ url, query, options })

const postBaseApiFetcherClient = <TResponse, TBody>(
  url: string,
  body: TBody,
  options?: RequestInit
) => createBaseApiFetcherClient<TResponse, TBody>({
  url,
  method: "POST",
  body,
  options,
})

const putBaseApiFetcherClient = <TResponse, TBody>(
  url: string,
  body: TBody,
  options?: RequestInit
) => createBaseApiFetcherClient<TResponse, TBody>({
  url,
  method: "PUT",
  body,
  options,
})

const patchBaseApiFetcherClient = <TResponse, TBody>(
  url: string,
  body: TBody,
  query?: ApiQuery,
  options?: RequestInit
) => createBaseApiFetcherClient<TResponse, TBody>({
  url,
  method: "PATCH",
  query,
  body,
  options,
})

const deleteBaseApiFetcherClient = <TResponse>(
  url: string,
  query?: ApiQuery,
  options?: RequestInit
) => createBaseApiFetcherClient<TResponse>({
  url,
  method: "DELETE",
  query,
  options,
})

const baseApiFetcherClient = {
  get: getBaseApiFetcherClient,
  post: postBaseApiFetcherClient,
  put: putBaseApiFetcherClient,
  patch: patchBaseApiFetcherClient,
  delete: deleteBaseApiFetcherClient,
} as const

export { baseApiFetcherClient, createBaseApiFetcherClient }
