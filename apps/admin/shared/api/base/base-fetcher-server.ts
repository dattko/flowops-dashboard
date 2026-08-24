import "server-only"

import { cache } from "react"

import { createClient } from "@/shared/lib/supabase/server"

import type { BaseApiFetcherOptions } from "./types"
import { parseApiResponse } from "./utils"

const endpoint = process.env.NEXT_PUBLIC_SUPABASE_URL!
const apiKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

const getAccessToken = cache(async () => {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    throw new Error("인증된 사용자만 데이터를 요청할 수 있습니다.")
  }

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    throw new Error("로그인 세션을 확인할 수 없습니다.")
  }

  return session.access_token
})

const createBaseApiFetcherServer = async <TResponse, TBody = unknown>({
  baseUrl = endpoint,
  url,
  method = "GET",
  body,
  options,
}: BaseApiFetcherOptions<TBody>): Promise<TResponse> => {
  const accessToken = await getAccessToken()
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
  })

  return parseApiResponse<TResponse>(response)
}

const getBaseApiFetcherServer = <TResponse>(
  url: string,
  options?: RequestInit
) => createBaseApiFetcherServer<TResponse>({ url, options })

const postBaseApiFetcherServer = <TResponse, TBody = unknown>(
  url: string,
  body?: TBody,
  options?: RequestInit
) => createBaseApiFetcherServer<TResponse, TBody>({
  url,
  method: "POST",
  body,
  options,
})

const putBaseApiFetcherServer = <TResponse, TBody = unknown>(
  url: string,
  body: TBody,
  options?: RequestInit
) => createBaseApiFetcherServer<TResponse, TBody>({
  url,
  method: "PUT",
  body,
  options,
})

const patchBaseApiFetcherServer = <TResponse, TBody = unknown>(
  url: string,
  body: TBody,
  options?: RequestInit
) => createBaseApiFetcherServer<TResponse, TBody>({
  url,
  method: "PATCH",
  body,
  options,
})

const deleteBaseApiFetcherServer = <TResponse>(
  url: string,
  options?: RequestInit
) => createBaseApiFetcherServer<TResponse>({
  url,
  method: "DELETE",
  options,
})

const baseApiFetcherServer = {
  get: getBaseApiFetcherServer,
  post: postBaseApiFetcherServer,
  put: putBaseApiFetcherServer,
  patch: patchBaseApiFetcherServer,
  delete: deleteBaseApiFetcherServer,
} as const

export { baseApiFetcherServer, createBaseApiFetcherServer }
