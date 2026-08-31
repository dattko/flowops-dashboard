import { describe, expect, it } from "vitest"

import {
  acceptAdminInvitationSchema,
  addAdminSchema,
  revokeAdminSchema,
} from "./admin-schema"

describe("addAdminSchema", () => {
  it("올바른 관리자 정보를 허용", () => {
    expect(
      addAdminSchema.safeParse({
        email: "manager@flowops.kr",
        displayName: "운영 관리자",
      }).success
    ).toBe(true)
  })

  it("잘못된 이메일을 거부", () => {
    expect(
      addAdminSchema.safeParse({ email: "manager", displayName: "관리자" })
        .success
    ).toBe(false)
  })
})

describe("acceptAdminInvitationSchema", () => {
  it("일치하는 8자 이상의 비밀번호를 허용", () => {
    expect(
      acceptAdminInvitationSchema.safeParse({
        password: "new-password",
        passwordConfirm: "new-password",
      }).success
    ).toBe(true)
  })

  it("일치하지 않는 비밀번호를 거부", () => {
    expect(
      acceptAdminInvitationSchema.safeParse({
        password: "new-password",
        passwordConfirm: "other-password",
      }).success
    ).toBe(false)
  })
})

describe("revokeAdminSchema", () => {
  it("UUID 형식의 사용자 ID만 허용", () => {
    expect(
      revokeAdminSchema.safeParse({
        userId: "11111111-1111-4111-8111-111111111111",
      }).success
    ).toBe(true)
    expect(revokeAdminSchema.safeParse({ userId: "user-1" }).success).toBe(
      false
    )
  })
})
