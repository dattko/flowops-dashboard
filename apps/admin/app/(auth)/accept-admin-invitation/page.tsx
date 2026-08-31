import type { Metadata } from "next"
import { BarChart3, UserRoundCheck } from "lucide-react"

import { AcceptAdminInvitationForm } from "@/features/manage-admins"
import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { Typography } from "@/shared/ui/typography"

export const metadata: Metadata = {
  title: "관리자 초대 수락",
  description: "FlowOps 관리자 초대를 수락하고 비밀번호를 설정합니다.",
}

const AcceptAdminInvitationPage = () => {
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
        <div className="mx-auto mb-6 flex w-fit items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-sidebar text-sidebar-primary shadow-[0_8px_24px_rgba(53,42,31,0.16)]">
            <BarChart3 className="size-5" aria-hidden="true" />
          </span>
          <span>
            <Typography variant="cardTitle">flowops</Typography>
            <Typography variant="overline" tone="muted">
              Operations
            </Typography>
          </span>
        </div>

        <Card className="w-full gap-0 rounded-2xl py-0 shadow-[0_24px_80px_rgba(53,42,31,0.10)] ring-black/8">
          <CardHeader className="gap-3 px-6 pb-7 pt-7 sm:px-8 sm:pt-8">
            <div className="grid size-11 place-items-center rounded-xl bg-accent text-primary">
              <UserRoundCheck className="size-5" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <Typography as="h1" variant="pageTitle">
                관리자 초대 수락
              </Typography>
              <Typography variant="body" tone="muted">
                앞으로 로그인할 비밀번호를 직접 설정해 주세요.
              </Typography>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-7 sm:px-8 sm:pb-8">
            <AcceptAdminInvitationForm />
          </CardContent>
        </Card>

        <Typography
          variant="caption"
          tone="muted"
          className="mt-6 text-center text-muted-foreground/70"
        >
          비밀번호는 메인 관리자에게 공유되지 않습니다.
        </Typography>
      </div>
    </main>
  )
}

export default AcceptAdminInvitationPage
