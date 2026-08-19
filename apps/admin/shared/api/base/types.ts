type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

type BaseApiFetcherOptions<TBody = unknown> = {
  baseUrl?: string
  url: string
  method?: ApiMethod
  body?: TBody
  options?: RequestInit
}

export type { ApiMethod, BaseApiFetcherOptions }
