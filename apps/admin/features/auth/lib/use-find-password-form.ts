"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { requestPasswordReset } from "../api/auth-server.action"
import {
  findPasswordSchema,
  type FindPasswordValues,
} from "../model/password-schema"

export const useFindPasswordForm = () => {
  const [isComplete, setIsComplete] = useState(false)
  const form = useForm<FindPasswordValues>({
    resolver: zodResolver(findPasswordSchema),
    defaultValues: { email: "" },
  })

  const handleSubmitForm = form.handleSubmit(async (data) => {
    form.clearErrors("root")

    const result = await requestPasswordReset(data)

    if (result.error) {
      form.setError("root", {
        type: "server",
        message: result.error,
      })
      return
    }

    setIsComplete(true)
  })

  return { form, handleSubmitForm, isComplete }
}
