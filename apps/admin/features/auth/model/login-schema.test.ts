import { describe, expect, it } from "vitest"

import { loginSchema } from "./login-schema"

describe("loginSchema", () => {
  it("정상적인 로그인 정보를 통과시키고 이메일 공백을 제거한다", () => {
    const result = loginSchema.safeParse({
      email: "  admin@flowops.kr  ",
      password: "password123",
      rememberMe: false,
    })

    expect(result.success).toBe(true)

    if (result.success) {
      expect(result.data.email).toBe("admin@flowops.kr")
    }
  })

  it("잘못된 이메일 형식을 거부한다", () => {
    const result = loginSchema.safeParse({
      email: "invalid-email",
      password: "password123",
      rememberMe: false,
    })

    expect(result.success).toBe(false)
  })

  it("8자 미만 비밀번호를 거부한다", () => {
    const result = loginSchema.safeParse({
      email: "admin@flowops.kr",
      password: "1234567",
      rememberMe: false,
    })

    expect(result.success).toBe(false)
  })
})
