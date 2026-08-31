import type { Metadata } from "next"
import Link from "next/link"
import { BarChart3, KeyRound } from "lucide-react"

import { FindPasswordForm } from "@/features/auth"
import { ROUTES } from "@/shared/config/routes"
import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { Typography } from "@/shared/ui/typography"

export const metadata: Metadata = {
  title: "비밀번호 찾기",
  description: "FlowOps 관리자 계정의 비밀번호를 재설정합니다.",
}

type FindPasswordRouteProps = {
  searchParams: Promise<{ error?: string }>
}

const FindPasswordRoute = async ({ searchParams }: FindPasswordRouteProps) => {
  const { error } = await searchParams
  const initialError =
    error === "invalid_link"
      ? "재설정 링크가 만료되었거나 올바르지 않습니다. 새 링크를 요청해 주세요."
      : undefined

  return (
    <main className="relative grid min-h-svh place-items-center overflow-hidden bg-background px-5 py-10 sm:px-8">
      <div
        className="pointer-events-none absolute -left-28 -top-32 size-[420px] rounded-full bg-primary/[0.08] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-28 size-[480px] rounded-full bg-sidebar/[0.07] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[440px]">
        <Link
          href={ROUTES.login}
          className="mx-auto mb-6 flex w-fit items-center gap-3"
          aria-label="FlowOps 로그인으로 이동"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-sidebar text-sidebar-primary shadow-[0_8px_24px_rgba(53,42,31,0.16)]">
            <BarChart3 className="size-5" aria-hidden="true" />
          </span>
          <span>
            <Typography variant="cardTitle">flowops</Typography>
            <Typography variant="overline" tone="muted">
              Operations
            </Typography>
          </span>
        </Link>

        <Card className="w-full gap-0 rounded-2xl py-0 shadow-[0_24px_80px_rgba(53,42,31,0.10)] ring-black/8">
          <CardHeader className="gap-3 px-6 pb-7 pt-7 sm:px-8 sm:pt-8">
            <div className="grid size-11 place-items-center rounded-xl bg-accent text-primary">
              <KeyRound className="size-5" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <Typography as="h1" variant="pageTitle">
                비밀번호 찾기
              </Typography>
              <Typography variant="body" tone="muted">
                가입한 이메일로 안전한 비밀번호 재설정 링크를 보내드립니다.
              </Typography>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-7 sm:px-8 sm:pb-8">
            <FindPasswordForm initialError={initialError} />
          </CardContent>
        </Card>

        <Typography
          variant="caption"
          tone="muted"
          className="mt-6 text-center text-muted-foreground/70"
        >
          © 2026 FlowOps. All rights reserved.
        </Typography>
      </div>
    </main>
  )
}

export default FindPasswordRoute
