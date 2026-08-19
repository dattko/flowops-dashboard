const SESSION_POLICY_COOKIE = "flowops-session-policy"
const SHORT_SESSION_DURATION_MS = 2 * 60 * 60 * 1000
const POLICY_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 400
const SHORT_SESSION_PREFIX = "short:"

const createShortSessionPolicy = (now = Date.now()) => {
  return `${SHORT_SESSION_PREFIX}${now + SHORT_SESSION_DURATION_MS}`
}

const getShortSessionExpiresAt = (policy?: string) => {
  if (!policy?.startsWith(SHORT_SESSION_PREFIX)) {
    return null
  }

  const expiresAt = Number(policy.slice(SHORT_SESSION_PREFIX.length))

  return Number.isFinite(expiresAt) ? expiresAt : null
}

export {
  POLICY_COOKIE_MAX_AGE_SECONDS,
  SESSION_POLICY_COOKIE,
  SHORT_SESSION_DURATION_MS,
  createShortSessionPolicy,
  getShortSessionExpiresAt,
}
