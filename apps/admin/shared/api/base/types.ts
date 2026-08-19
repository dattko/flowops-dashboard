type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
type ApiQueryValue = string | number | boolean

type ApiQuery = Record<
  string,
  ApiQueryValue | readonly ApiQueryValue[] | undefined
>

type BaseApiFetcherOptions<TBody = unknown> = {
  baseUrl?: string
  url: string
  method?: ApiMethod
  query?: ApiQuery
  body?: TBody
  options?: RequestInit
}

export type {
  ApiMethod,
  ApiQuery,
  ApiQueryValue,
  BaseApiFetcherOptions,
}
