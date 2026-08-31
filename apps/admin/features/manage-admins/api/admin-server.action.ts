"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { ROUTES } from "@/shared/config/routes"
import {
  createAdminClient,
  findAuthUserByEmail,
  isSuperAdminEmail,
} from "@/shared/lib/supabase/admin"
import { createClient } from "@/shared/lib/supabase/server"

import {
  getAdminErrorLogDetails,
  getAdminInviteErrorMessage,
} from "../lib/admin-error"
import {
  acceptAdminInvitationSchema,
  addAdminSchema,
  revokeAdminSchema,
  type AcceptAdminInvitationValues,
  type AddAdminValues,
} from "../model/admin-schema"

const getSuperAdmin = async () => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isSuperAdminEmail(user.email)) {
    return null
  }

  return user
}

const updateAdminProfile = async (
  userId: string,
  role: "admin" | "customer",
  displayName?: string
) => {
  const adminClient = createAdminClient()
  const payload: { role: "admin" | "customer"; display_name?: string } = {
    role,
  }

  if (displayName) payload.display_name = displayName

  const { error } = await adminClient
    .from("profiles")
    .update(payload)
    .eq("id", userId)

  if (error) throw error
}

export const addAdmin = async (values: AddAdminValues) => {
  const parsed = addAdminSchema.safeParse(values)

  if (!parsed.success) {
    return { error: "관리자 정보를 다시 확인해 주세요." }
  }

  const superAdmin = await getSuperAdmin()

  if (!superAdmin) {
    return { error: "메인 관리자만 관리자 계정을 추가할 수 있습니다." }
  }

  try {
    const adminClient = createAdminClient()
    const existingUser = await findAuthUserByEmail(
      adminClient,
      parsed.data.email
    )
    const now = new Date().toISOString()

    if (existingUser) {
      return {
        error: "이미 가입되었거나 초대된 이메일입니다.",
      }
    }

    const requestHeaders = await headers()
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ?? requestHeaders.get("origin")

    if (!origin) {
      return { error: "서비스 주소를 확인할 수 없습니다." }
    }

    const callbackUrl = new URL(ROUTES.auth.callback, origin)
    callbackUrl.searchParams.set("next", ROUTES.acceptAdminInvitation)

    const { data, error: inviteError } =
      await adminClient.auth.admin.inviteUserByEmail(parsed.data.email, {
        redirectTo: callbackUrl.toString(),
        data: { display_name: parsed.data.displayName },
      })

    if (inviteError) throw inviteError

    const { error: metadataError } =
      await adminClient.auth.admin.updateUserById(data.user.id, {
        app_metadata: {
          ...data.user.app_metadata,
          role: "admin",
          admin_status: "invited",
          invited_by: superAdmin.id,
          invited_at: now,
        },
      })

    if (metadataError) throw metadataError

    revalidatePath(ROUTES.settings)
    return { success: "관리자 초대 메일을 보냈습니다." }
  } catch (error) {
    console.error("[admin-invite] failed", getAdminErrorLogDetails(error))

    return {
      error: getAdminInviteErrorMessage(error),
    }
  }
}

export const revokeAdmin = async (userId: string) => {
  const parsed = revokeAdminSchema.safeParse({ userId })

  if (!parsed.success) {
    return { error: "관리자 계정을 확인할 수 없습니다." }
  }

  const superAdmin = await getSuperAdmin()

  if (!superAdmin) {
    return { error: "메인 관리자만 권한을 회수할 수 있습니다." }
  }

  try {
    const adminClient = createAdminClient()
    const { data, error: userError } =
      await adminClient.auth.admin.getUserById(parsed.data.userId)

    if (userError) throw userError

    if (isSuperAdminEmail(data.user.email)) {
      return { error: "메인 관리자 권한은 이 화면에서 회수할 수 없습니다." }
    }

    const { error } = await adminClient.auth.admin.updateUserById(
      parsed.data.userId,
      {
        app_metadata: {
          ...data.user.app_metadata,
          role: "customer",
          admin_status: "revoked",
          revoked_by: superAdmin.id,
          revoked_at: new Date().toISOString(),
        },
      }
    )

    if (error) throw error

    await updateAdminProfile(parsed.data.userId, "customer")
    revalidatePath(ROUTES.settings)
    return { success: "관리자 권한을 회수했습니다." }
  } catch {
    return { error: "관리자 권한을 회수하지 못했습니다." }
  }
}

export const acceptAdminInvitation = async (
  values: AcceptAdminInvitationValues
) => {
  const parsed = acceptAdminInvitationSchema.safeParse(values)

  if (!parsed.success) {
    return { error: "비밀번호를 다시 확인해 주세요." }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (
    !user ||
    user.app_metadata.role !== "admin" ||
    user.app_metadata.admin_status !== "invited"
  ) {
    return { error: "유효한 관리자 초대 세션을 확인할 수 없습니다." }
  }

  const { error: passwordError } = await supabase.auth.updateUser({
    password: parsed.data.password,
  })

  if (passwordError) {
    return { error: "비밀번호를 저장하지 못했습니다." }
  }

  try {
    const adminClient = createAdminClient()
    const { error } = await adminClient.auth.admin.updateUserById(user.id, {
      app_metadata: {
        ...user.app_metadata,
        role: "admin",
        admin_status: "active",
        accepted_at: new Date().toISOString(),
      },
    })

    if (error) throw error

    await updateAdminProfile(
      user.id,
      "admin",
      String(user.user_metadata.display_name ?? "").trim() || undefined
    )
  } catch {
    return {
      error: "관리자 권한을 활성화하지 못했습니다. 메인 관리자에게 문의해 주세요.",
    }
  }

  await supabase.auth.signOut()
  redirect(`${ROUTES.login}?invitation=accepted`)
}
