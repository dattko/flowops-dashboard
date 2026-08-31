import { describe, expect, it } from "vitest"

import {
  getAdminErrorLogDetails,
  getAdminInviteErrorMessage,
} from "./admin-error"

describe("getAdminInviteErrorMessage", () => {
  it("안전하지 않은 기본 메일 대상 제한을 안내한다", () => {
    expect(
      getAdminInviteErrorMessage({ code: "email_address_not_authorized" })
    ).toContain("Custom SMTP")
  })

  it("메일 발송 한도를 안내한다", () => {
    expect(
      getAdminInviteErrorMessage({ code: "over_email_send_rate_limit" })
    ).toContain("발송 한도")
  })

  it("알 수 없는 오류의 내부 메시지는 노출하지 않는다", () => {
    expect(
      getAdminInviteErrorMessage({ message: "sensitive internal detail" })
    ).toBe("관리자 초대를 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.")
  })
})

describe("getAdminErrorLogDetails", () => {
  it("로그에 필요한 안전한 필드만 반환한다", () => {
    expect(
      getAdminErrorLogDetails({
        code: "unexpected_failure",
        status: 500,
        name: "AuthApiError",
        message: "do not log",
      })
    ).toEqual({
      code: "unexpected_failure",
      status: 500,
      name: "AuthApiError",
    })
  })
})
