"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"

import { addAdmin, revokeAdmin } from "../api/admin-server.action"
import {
  addAdminSchema,
  type AddAdminValues,
} from "../model/admin-schema"

type AdminManagementMessage = {
  type: "error" | "success"
  text: string
}

export const useAdminManagement = () => {
  const router = useRouter()
  const [message, setMessage] = useState<AdminManagementMessage | null>(null)
  const [isRevoking, startRevokeTransition] = useTransition()
  const form = useForm<AddAdminValues>({
    resolver: zodResolver(addAdminSchema),
    defaultValues: { email: "", displayName: "" },
  })

  const submit = form.handleSubmit(async (values) => {
    setMessage(null)
    form.clearErrors("root")

    const result = await addAdmin(values)

    if (result.error) {
      form.setError("root", { type: "server", message: result.error })
      return
    }

    form.reset()
    setMessage({
      type: "success",
      text: result.success ?? "관리자 계정을 추가했습니다.",
    })
    router.refresh()
  })

  const revoke = (userId: string, targetEmail: string) => {
    if (!window.confirm(`${targetEmail}의 관리자 권한을 회수할까요?`)) {
      return
    }

    setMessage(null)
    startRevokeTransition(async () => {
      const result = await revokeAdmin(userId)

      if (result.error) {
        setMessage({ type: "error", text: result.error })
        return
      }

      setMessage({
        type: "success",
        text: result.success ?? "관리자 권한을 회수했습니다.",
      })
      router.refresh()
    })
  }

  return {
    form,
    message,
    isPending: form.formState.isSubmitting || isRevoking,
    submit,
    revoke,
  }
}
