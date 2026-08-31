"use client"

import { KeyRound, LoaderCircle } from "lucide-react"

import { Button } from "@/shared/ui/button"
import { FormMessage, InputText } from "@/shared/ui/form"

import { useResetPasswordForm } from "../lib/use-reset-password-form"

export const ResetPasswordForm = () => {
  const { form, handleSubmitForm } = useResetPasswordForm()
  const {
    register,
    formState: { errors, isSubmitting },
  } = form

  return (
    <form className="space-y-5" onSubmit={handleSubmitForm} noValidate>
      <InputText
        {...register("password")}
        label="새 비밀번호"
        type="password"
        autoComplete="new-password"
        placeholder="8자 이상 입력해 주세요"
        size="lg"
        error={errors.password?.message}
      />

      <InputText
        {...register("passwordConfirm")}
        label="새 비밀번호 확인"
        type="password"
        autoComplete="new-password"
        placeholder="한 번 더 입력해 주세요"
        size="lg"
        error={errors.passwordConfirm?.message}
      />

      <FormMessage
        errorMessage={errors.root?.message}
        className="rounded-lg bg-destructive/8 px-3 py-2.5"
      />

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <LoaderCircle className="animate-spin" aria-hidden="true" />
        ) : (
          <KeyRound aria-hidden="true" />
        )}
        {isSubmitting ? "변경 중..." : "새 비밀번호 저장"}
      </Button>
    </form>
  )
}
