"use client"
import { BarChart3, LoaderCircle, LockKeyhole } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { FormCheckbox, InputText } from "@/shared/ui/form"
import { Typography } from "@/shared/ui/typography"
import { useLoginForm } from "../lib/use-login-form"

export const LoginForm = () => {
  const { form, handleSubmitForm } = useLoginForm()
  const { register, control, formState: { errors, isSubmitting } } = form

  return (
    <Card className="w-full gap-0 rounded-2xl py-0 shadow-[0_24px_80px_rgba(53,42,31,0.10)] ring-black/8">
      <CardHeader className="gap-3 px-6 pb-7 pt-7 sm:px-8 sm:pt-8">
        <div className="mb-2 flex items-center gap-3 lg:hidden">
          <div className="grid size-9 place-items-center rounded-xl bg-sidebar text-sidebar-primary">
            <BarChart3 className="size-5" aria-hidden="true" />
          </div>
          <div>
            <Typography variant="cardTitle">flowops</Typography>
            <Typography variant="overline" tone="muted">
              Operations
            </Typography>
          </div>
        </div>

        <div className="grid size-11 place-items-center rounded-xl bg-accent text-primary">
          <LockKeyhole className="size-5" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <Typography as="h1" variant="pageTitle">
            관리자 로그인
          </Typography>
          <Typography variant="body" tone="muted">
            운영 대시보드에 등록된 계정으로 로그인해 주세요.
          </Typography>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-7 sm:px-8 sm:pb-8">
        <form
          className="space-y-5"
          onSubmit={handleSubmitForm}
          noValidate
        >
          <InputText
            {...register("email")}
            label="이메일"
            type="email"
            autoComplete="email"
            placeholder="admin@flowops.kr"
            size="lg"
            error={errors.email?.message}
          />

          <InputText
            {...register("password")}
            label="비밀번호"
            type="password"
            autoComplete="current-password"
            placeholder="비밀번호를 입력해 주세요"
            size="lg"
            error={errors.password?.message}
            labelAction={
              <Button
                type="button"
                variant="link"
                className="h-auto p-0"
              >
                <Typography as="span" variant="label" tone="primary">
                  비밀번호를 잊으셨나요?
                </Typography>
              </Button>
            }
          />

          <FormCheckbox
            control={control}
            name="rememberMe"
            label="로그인 상태 유지"
          />

          {errors.root && (
            <Typography
              variant="bodySmall"
              tone="destructive"
              className="rounded-lg bg-destructive/8 px-3 py-2.5 mb-4"
              role="alert"
            >
              {errors.root.message}
            </Typography>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <LoaderCircle className="animate-spin" aria-hidden="true" />
            )}
            {isSubmitting ? "로그인 중..." : "로그인"}
          </Button>
        </form>

        <Typography
          variant="caption"
          tone="muted"
          className="mt-6 text-center"
        >
          승인된 관리자만 접근할 수 있습니다.
          <br />
          계정 문의는 시스템 관리자에게 요청해 주세요.
        </Typography>
      </CardContent>
    </Card>
  )
}
