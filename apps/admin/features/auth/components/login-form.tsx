"use client"
import { BarChart3, LoaderCircle, LockKeyhole } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Typography } from "@/components/ui/typography"
import { useLoginForm } from "../model/use-login-form"

export function LoginForm() {
  const { form, onSubmit } = useLoginForm()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = form


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
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="email">
              <Typography as="span" variant="label">
                이메일
              </Typography>
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="admin@flowops.kr"
              className="h-11 bg-white px-3"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            {errors.email && (
              <Typography
                id="email-error"
                variant="caption"
                tone="destructive"
                role="alert"
              >
                {errors.email.message}
              </Typography>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="password">
                <Typography as="span" variant="label">
                  비밀번호
                </Typography>
              </Label>
              <Button
                type="button"
                variant="link"
                className="h-auto p-0"
              >
                <Typography as="span" variant="label" tone="primary">
                  비밀번호를 잊으셨나요?
                </Typography>
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="비밀번호를 입력해 주세요"
              className="h-11 bg-white px-3"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...register("password")}
            />
            {errors.password && (
              <Typography
                id="password-error"
                variant="caption"
                tone="destructive"
                role="alert"
              >
                {errors.password.message}
              </Typography>
            )}
          </div>

          <Label
            htmlFor="remember-me"
            className="w-fit cursor-pointer font-normal text-muted-foreground"
          >
            <Checkbox id="remember-me" name="remember-me" />
            <Typography as="span" variant="bodySmall" tone="muted">
              로그인 상태 유지
            </Typography>
          </Label>

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
