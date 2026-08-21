"use client"

import { useEffect } from "react"

import { SHORT_SESSION_DURATION_MS } from "@/shared/lib/auth/session-policy"

const HEARTBEAT_INTERVAL_MS = 60 * 1000
const ACTIVITY_EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"] as const

export const useSessionExpiry = (expiresAt: number | null) => {
  useEffect(() => {
    if (expiresAt === null) return

    let timeoutId: number
    let lastHeartbeatAt = Date.now()

    const expireSession = () => window.location.replace("/auth/session-expired")
    const scheduleExpiration = (delay: number) => {
      window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(expireSession, delay)
    }
    const renewSession = async () => {
      try {
        const response = await fetch("/auth/session-activity", { method: "POST" })
        if (response.status === 401) expireSession()
      } catch {
        // 일시적인 네트워크 오류는 다음 사용자 활동에서 다시 갱신합니다.
      }
    }
    const handleActivity = () => {
      scheduleExpiration(SHORT_SESSION_DURATION_MS)
      const now = Date.now()
      if (now - lastHeartbeatAt < HEARTBEAT_INTERVAL_MS) return
      lastHeartbeatAt = now
      void renewSession()
    }

    const remainingTime = expiresAt - Date.now()
    if (remainingTime <= 0) {
      expireSession()
      return
    }

    scheduleExpiration(remainingTime)
    ACTIVITY_EVENTS.forEach((eventName) =>
      window.addEventListener(eventName, handleActivity, { passive: true })
    )

    return () => {
      window.clearTimeout(timeoutId)
      ACTIVITY_EVENTS.forEach((eventName) =>
        window.removeEventListener(eventName, handleActivity)
      )
    }
  }, [expiresAt])
}
