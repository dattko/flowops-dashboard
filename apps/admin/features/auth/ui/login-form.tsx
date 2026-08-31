"use client"
import Link from "next/link"
import { BarChart3, LoaderCircle, LockKeyhole, MonitorPlay } from "lucide-react"
import { Button, buttonVariants } from "@/shared/ui/button"
import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { ROUTES } from "@/shared/config/routes"
import { FormCheckbox, FormMessage, InputText } from "@/shared/ui/form"
import { Typography } from "@/shared/ui/typography"
import { cn } from "@/shared/lib/utils"
import { useLoginForm } from "../lib/use-login-form"

type LoginFormProps = {
  passwordResetComplete?: boolean
  invitationAccepted?: boolean
  unauthorized?: boolean
}

export const LoginForm = ({
  passwordResetComplete = false,
  invitationAccepted = false,
  unauthorized = false,
}: LoginFormProps) => {
  const { form, handleDemoLogin, handleSubmitForm, isDemoPending } =
    useLoginForm()
  const { register, control, formState: { errors, isSubmitting } } = form
  const isPending = isSubmitting || isDemoPending

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
              <Link
                href={ROUTES.findPassword}
                className={cn(buttonVariants({ variant: "link" }), "h-auto p-0")}
              >
                <Typography as="span" variant="label" tone="primary">
                  비밀번호를 잊으셨나요?
                </Typography>
              </Link>
            }
          />

          <FormCheckbox
            control={control}
            name="rememberMe"
            label="로그인 상태 유지"
          />

          <FormMessage
            errorMessage={
              errors.root?.message ??
              (unauthorized
                ? "관리자 권한이 있는 계정만 접근할 수 있습니다."
                : undefined)
            }
            successMessage={
              passwordResetComplete
                ? "비밀번호가 변경되었습니다. 새 비밀번호로 로그인해 주세요."
                : invitationAccepted
                  ? "관리자 계정이 활성화되었습니다. 설정한 비밀번호로 로그인해 주세요."
                : undefined
            }
            className={cn(
              "mb-4 rounded-lg px-3 py-2.5",
              errors.root?.message || unauthorized
                ? "bg-destructive/8"
                : "bg-success/8"
            )}
          />

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isPending}
          >
            {isSubmitting && (
              <LoaderCircle className="animate-spin" aria-hidden="true" />
            )}
            {isSubmitting ? "로그인 중..." : "로그인"}
          </Button>

          <div className="relative flex items-center py-1" aria-hidden="true">
            <div className="h-px flex-1 bg-border" />
            <Typography as="span" variant="caption" tone="muted" className="px-3">
              또는
            </Typography>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleDemoLogin}
            disabled={isPending}
          >
            {isDemoPending ? (
              <LoaderCircle className="animate-spin" aria-hidden="true" />
            ) : (
              <MonitorPlay aria-hidden="true" />
            )}
            {isDemoPending ? "데모 준비 중..." : "데모 계정으로 둘러보기"}
          </Button>
        </form>

        <Typography
          variant="caption"
          tone="muted"
          className="mt-6 text-center"
        >
          데모 계정은 별도 정보 입력 없이 체험할 수 있습니다.
          <br />
          실제 운영 계정은 승인된 관리자만 이용할 수 있습니다.
        </Typography>
      </CardContent>
    </Card>
  )
}
