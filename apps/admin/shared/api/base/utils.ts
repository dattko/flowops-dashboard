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

export { parseApiResponse }
