"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { useForm } from "react-hook-form"

import { demoLogin, login } from "../api/auth-server.action"
import { loginSchema, type LoginValues } from "../model/login-schema"

export const useLoginForm = () => {
  const [isDemoPending, startDemoTransition] = useTransition()
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

  const handleDemoLogin = () => {
    form.clearErrors("root")

    startDemoTransition(async () => {
      const result = await demoLogin()

      if (result?.error) {
        form.setError("root", {
          type: "server",
          message: result.error,
        })
      }
    })
  }

  return {
    form,
    handleDemoLogin,
    handleSubmitForm,
    isDemoPending,
  }
}
