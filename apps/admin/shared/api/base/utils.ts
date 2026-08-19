import type { ApiQuery } from "./types"

const createApiUrl = (baseUrl: string, path: string, query: ApiQuery = {}) => {
  const url = new URL(path, baseUrl)

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined) {
      return
    }

    if (Array.isArray(value)) {
      value.forEach((item) => url.searchParams.append(key, String(item)))
      return
    }

    url.searchParams.set(key, String(value))
  })

  return url
}

const parseApiResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const body = await response.json().catch(() => null)

    throw {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      body,
    }
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export { createApiUrl, parseApiResponse }
