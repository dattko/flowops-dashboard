import { describe, expect, it } from "vitest"

import { findPasswordSchema, resetPasswordSchema } from "./password-schema"

describe("findPasswordSchema", () => {
  it("올바른 이메일을 허용한다", () => {
    expect(
      findPasswordSchema.safeParse({ email: "admin@flowops.kr" }).success
    ).toBe(true)
  })

  it("잘못된 이메일 형식을 거부한다", () => {
    expect(findPasswordSchema.safeParse({ email: "admin" }).success).toBe(false)
  })
})

describe("resetPasswordSchema", () => {
  it("일치하는 8자 이상의 비밀번호를 허용한다", () => {
    expect(
      resetPasswordSchema.safeParse({
        password: "new-password",
        passwordConfirm: "new-password",
      }).success
    ).toBe(true)
  })

  it("서로 다른 비밀번호를 거부한다", () => {
    const result = resetPasswordSchema.safeParse({
      password: "new-password",
      passwordConfirm: "other-password",
    })

    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.path).toEqual(["passwordConfirm"])
  })
})
