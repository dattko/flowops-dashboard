const getSafeRedirectPath = (value: string | null | undefined, fallback = "/") =>
  value?.startsWith("/") && !value.startsWith("//") ? value : fallback

export { getSafeRedirectPath }
