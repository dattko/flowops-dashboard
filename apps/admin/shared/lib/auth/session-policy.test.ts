import { describe, expect, it } from "vitest"

import {
  SHORT_SESSION_DURATION_MS,
  createShortSessionPolicy,
  getShortSessionExpiresAt,
} from "./session-policy"

describe("sessionPolicy", () => {
  it("현재 시각으로부터 2시간 뒤 만료 정책을 생성한다", () => {
    const now = 1_000

    const policy = createShortSessionPolicy(now)

    expect(policy).toBe(`short:${now + SHORT_SESSION_DURATION_MS}`)
  })

  it("정책 문자열에서 만료 시각을 가져온다", () => {
    expect(getShortSessionExpiresAt("short:7201000")).toBe(7_201_000)
  })

  it("형식이 잘못된 정책은 null을 반환한다", () => {
    expect(getShortSessionExpiresAt("remember")).toBeNull()
    expect(getShortSessionExpiresAt("short:not-a-number")).toBeNull()
    expect(getShortSessionExpiresAt()).toBeNull()
  })
})
