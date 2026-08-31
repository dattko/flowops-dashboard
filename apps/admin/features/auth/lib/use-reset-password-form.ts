"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { updatePassword } from "../api/auth-server.action"
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "../model/password-schema"

export const useResetPasswordForm = () => {
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  })

  const handleSubmitForm = form.handleSubmit(async (data) => {
    form.clearErrors("root")

    const result = await updatePassword(data)

    if (result?.error) {
      form.setError("root", {
        type: "server",
        message: result.error,
      })
    }
  })

  return { form, handleSubmitForm }
}
