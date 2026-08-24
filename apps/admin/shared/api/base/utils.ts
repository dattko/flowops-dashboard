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

const getApiErrorMessage = (error: unknown) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "body" in error &&
    typeof error.body === "object" &&
    error.body !== null &&
    "message" in error.body &&
    typeof error.body.message === "string"
  ) {
    return error.body.message
  }

  return "요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요."
}

export { getApiErrorMessage, parseApiResponse }
