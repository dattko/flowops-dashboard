export const ROUTES = {
  home: "/",
  products: {
    list: "/products",
    detail: (slug: string) => `/products/${encodeURIComponent(slug)}`,
  },
  cart: "/cart",
  checkout: "/checkout",
  orders: {
    list: "/mypage/orders",
    detail: (orderNumber: string) =>
      `/mypage/orders/${encodeURIComponent(orderNumber)}`,
    complete: (orderNumber: string) =>
      `/orders/${encodeURIComponent(orderNumber)}/complete`,
  },
  homeCoffee: "/#coffee",
  homeStory: "/#story",
  homeGuide: "/#guide",
  login: "/login",
  loginWithNext: (nextPath: string) =>
    `/login?next=${encodeURIComponent(nextPath)}`,
  signup: "/signup",
  onboarding: "/onboarding",
  profile: "/mypage/profile",
  authCallback: "/auth/callback",
} as const;
