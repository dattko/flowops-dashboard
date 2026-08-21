"use client"

import { useSessionExpiry } from "../lib/use-session-expiry"

type SessionExpiryGuardProps = {
  expiresAt: number | null
}

const SessionExpiryGuard = ({ expiresAt }: SessionExpiryGuardProps) => {
  useSessionExpiry(expiresAt)

  return null
}

export { SessionExpiryGuard }
