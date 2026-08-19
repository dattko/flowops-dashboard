"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"

import { login } from "../api/actions"
import { loginSchema, type LoginValues } from "./login-schema"

const useLoginForm = () => {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<LoginValues> = async (values) => {
    form.clearErrors("root")

    const result = await login(values)

    if (result?.error) {
      form.setError("root", {
        type: "server",
        message: result.error,
      })
    }
  }

  return {
    form,
    onSubmit,
  }
}

export { useLoginForm }
