type SupabaseErrorLike = {
  code?: unknown
  status?: unknown
  name?: unknown
}

const readAdminErrorDetails = (error: unknown) => {
  if (!error || typeof error !== "object") {
    return { code: undefined, status: undefined, name: undefined }
  }

  const candidate = error as SupabaseErrorLike

  return {
    code: typeof candidate.code === "string" ? candidate.code : undefined,
    status: typeof candidate.status === "number" ? candidate.status : undefined,
    name: typeof candidate.name === "string" ? candidate.name : undefined,
  }
}

export const getAdminInviteErrorMessage = (error: unknown) => {
  const { code, status } = readAdminErrorDetails(error)

  if (code === "email_address_not_authorized") {
    return "현재 메일 발송 설정으로는 이 이메일에 초대장을 보낼 수 없습니다. Supabase에서 Custom SMTP를 설정해 주세요."
  }

  if (
    code === "over_email_send_rate_limit" ||
    code === "over_request_rate_limit" ||
    status === 429
  ) {
    return "이메일 발송 한도를 초과했습니다. 잠시 후 다시 시도하거나 Supabase에서 Custom SMTP를 설정해 주세요."
  }

  if (
    code === "email_address_invalid" ||
    code === "validation_failed" ||
    status === 422
  ) {
    return "초대할 이메일 주소를 다시 확인해 주세요."
  }

  if (code === "email_exists" || code === "user_already_exists") {
    return "이미 가입되었거나 초대된 이메일입니다."
  }

  return "관리자 초대를 처리하지 못했습니다. 잠시 후 다시 시도해 주세요."
}

export const getAdminErrorLogDetails = (error: unknown) => {
  return readAdminErrorDetails(error)
}
