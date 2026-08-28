const ROUTES = {
  dashboard: "/",
  login: "/login",
  auth: {
    root: "/auth",
    sessionActivity: "/auth/session-activity",
    sessionExpired: "/auth/session-expired",
  },
  orders: {
    list: "/order",
    detail: (orderId: string) => `/order/${encodeURIComponent(orderId)}`,
  },
  customers: {
    list: "/customers",
    detail: (customerId: string) =>
      `/customers/${encodeURIComponent(customerId)}`,
  },
  inventory: {
    list: "/inventory",
    create: "/inventory/new",
    detail: (productId: string) =>
      `/inventory/${encodeURIComponent(productId)}`,
  },
  reports: "/reports",
  settings: "/settings",
} as const

export { ROUTES }
