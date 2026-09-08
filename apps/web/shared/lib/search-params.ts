export type PageSearchParams = Record<
  string,
  string | string[] | undefined
>

export const toURLSearchParams = (searchParams: PageSearchParams) => {
  const urlSearchParams = new URLSearchParams()

  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => urlSearchParams.append(key, item))
      return
    }

    if (value !== undefined) urlSearchParams.set(key, value)
  })

  return urlSearchParams
}
