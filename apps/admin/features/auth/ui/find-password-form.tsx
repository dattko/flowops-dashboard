"use client"

import Link from "next/link"
import { CheckCircle2, LoaderCircle, Mail } from "lucide-react"

import { ROUTES } from "@/shared/config/routes"
import { Button, buttonVariants } from "@/shared/ui/button"
import { FormMessage, InputText } from "@/shared/ui/form"
import { Typography } from "@/shared/ui/typography"
import { cn } from "@/shared/lib/utils"

import { useFindPasswordForm } from "../lib/use-find-password-form"

type FindPasswordFormProps = {
  initialError?: string
}

export const FindPasswordForm = ({ initialError }: FindPasswordFormProps) => {
  const { form, handleSubmitForm, isComplete } = useFindPasswordForm()
  const {
    register,
    formState: { errors, isSubmitting },
  } = form

  if (isComplete) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl bg-success/8 px-4 py-5 text-center">
          <CheckCircle2
            className="mx-auto size-8 text-success"
            aria-hidden="true"
          />
          <Typography as="h2" variant="cardTitle" className="mt-3">
            요청이 접수되었습니다
          </Typography>
          <Typography variant="bodySmall" tone="muted" className="mt-2">
            입력한 이메일이 가입된 관리자 계정이면
            <br />
            비밀번호 재설정 링크가 전송됩니다.
          </Typography>
        </div>

        <Link
          href={ROUTES.login}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full")}
        >
          로그인으로 돌아가기
        </Link>
      </div>
    )
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmitForm} noValidate>
      <InputText
        {...register("email")}
        label="이메일"
        type="email"
        autoComplete="email"
        placeholder="admin@flowops.kr"
        size="lg"
        description="관리자 계정에 등록된 이메일을 입력해 주세요."
        error={errors.email?.message}
      />

      <FormMessage
        errorMessage={errors.root?.message ?? initialError}
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
          <Mail aria-hidden="true" />
        )}
        {isSubmitting ? "전송 중..." : "재설정 링크 보내기"}
      </Button>

      <Link
        href={ROUTES.login}
        className={cn(buttonVariants({ variant: "link" }), "flex w-full")}
      >
        로그인으로 돌아가기
      </Link>
    </form>
  )
}
