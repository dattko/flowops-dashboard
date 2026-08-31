"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { acceptAdminInvitation } from "../api/admin-server.action"
import {
  acceptAdminInvitationSchema,
  type AcceptAdminInvitationValues,
} from "../model/admin-schema"

export const useAcceptAdminInvitationForm = () => {
  const form = useForm<AcceptAdminInvitationValues>({
    resolver: zodResolver(acceptAdminInvitationSchema),
    defaultValues: { password: "", passwordConfirm: "" },
  })
  const submit = form.handleSubmit(async (values) => {
    form.clearErrors("root")
    const result = await acceptAdminInvitation(values)

    if (result?.error) {
      form.setError("root", { type: "server", message: result.error })
    }
  })

  return { form, submit }
}
