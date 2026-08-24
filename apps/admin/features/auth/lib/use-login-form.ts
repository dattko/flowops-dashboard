"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { login } from "../api/auth-server.action"
import { loginSchema, type LoginValues } from "../model/login-schema"

export const useLoginForm = () => {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const handleSubmitForm = form.handleSubmit(async (data) => {
    form.clearErrors("root")

    const result = await login(data)

    if (result?.error) {
      form.setError("root", {
        type: "server",
        message: result.error,
      })
    }
  })

  return {
    form,
    handleSubmitForm,
  }
}
