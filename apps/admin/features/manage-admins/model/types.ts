export type ManagedAdmin = {
  id: string
  email: string
  displayName: string
  role: "admin" | "super_admin"
  status: "active" | "invited"
  createdAt: string
}

export type AdminAccessOverview = {
  canManage: boolean
  admins: ManagedAdmin[]
  configurationError?: string
}
