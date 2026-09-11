export const ROUTES = {
  home: "/",
  products: {
    list: "/products",
    detail: (slug: string) => `/products/${encodeURIComponent(slug)}`,
  },
  cart: "/cart",
  homeCoffee: "/#coffee",
  homeStory: "/#story",
  homeGuide: "/#guide",
  login: "/login",
  signup: "/signup",
  onboarding: "/onboarding",
  profile: "/mypage/profile",
  authCallback: "/auth/callback",
} as const;
