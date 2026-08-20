export type Profile = {
  id: string
  displayName: string | null
  avatarUrl: string | null
  role: "customer" | "admin"
}
