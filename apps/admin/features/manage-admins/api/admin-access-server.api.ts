import "server-only"

import { createClient } from "@/shared/lib/supabase/server"
import {
  createAdminClient,
  isSuperAdminEmail,
  listAllAuthUsers,
} from "@/shared/lib/supabase/admin"

import type { AdminAccessOverview, ManagedAdmin } from "../model/types"

export const getAdminAccessOverview = async (): Promise<AdminAccessOverview> => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!isSuperAdminEmail(user?.email)) {
    return { canManage: false, admins: [] }
  }

  try {
    const adminClient = createAdminClient()
    const users = await listAllAuthUsers(adminClient)
    const admins = users
      .filter(
        (authUser) =>
          isSuperAdminEmail(authUser.email) ||
          authUser.app_metadata.role === "admin"
      )
      .filter((authUser) => authUser.app_metadata.admin_status !== "revoked")
      .map<ManagedAdmin>((authUser) => ({
        id: authUser.id,
        email: authUser.email ?? "이메일 없음",
        displayName:
          String(authUser.user_metadata.display_name ?? "").trim() ||
          authUser.email?.split("@")[0] ||
          "관리자",
        role: isSuperAdminEmail(authUser.email) ? "super_admin" : "admin",
        status:
          authUser.app_metadata.admin_status === "invited"
            ? "invited"
            : "active",
        createdAt: authUser.created_at,
      }))
      .sort((a, b) => {
        if (a.role !== b.role) return a.role === "super_admin" ? -1 : 1
        return b.createdAt.localeCompare(a.createdAt)
      })

    return { canManage: true, admins }
  } catch {
    return {
      canManage: true,
      admins: [],
      configurationError:
        "관리자 초대를 사용하려면 서버 환경 변수를 설정해 주세요.",
    }
  }
}
