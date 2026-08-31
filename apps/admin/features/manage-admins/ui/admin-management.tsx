"use client"

import { MailPlus, ShieldCheck, UserRoundX, UsersRound } from "lucide-react"

import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import { FormMessage, InputText } from "@/shared/ui/form"
import { Typography } from "@/shared/ui/typography"

import { useAdminManagement } from "../lib/use-admin-management"
import type { AdminAccessOverview } from "../model/types"

export const AdminManagement = ({
  overview,
}: {
  overview: AdminAccessOverview
}) => {
  const {
    form,
    message,
    isPending,
    submit,
    revoke,
  } = useAdminManagement()
  const {
    register,
    formState: { errors },
  } = form

  if (!overview.canManage) return null

  return (
    <Card id="admin-settings" className="scroll-mt-8">
      <CardHeader className="border-b">
        <div className="flex items-center gap-2">
          <UsersRound className="size-4 text-primary" aria-hidden="true" />
          <CardTitle>관리자 계정</CardTitle>
        </div>
        <CardDescription>
          새 관리자를 이메일로 초대하고 계정 활성화 상태를 관리합니다.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {overview.configurationError ? (
          <FormMessage
            errorMessage={overview.configurationError}
            className="rounded-lg bg-warning/10 px-3 py-2.5 text-warning"
          />
        ) : (
          <form
            onSubmit={submit}
            noValidate
            className="grid gap-4 rounded-xl border bg-muted/25 p-4 sm:grid-cols-2"
          >
            <InputText
              {...register("displayName")}
              label="관리자 이름"
              placeholder="홍길동"
              maxLength={50}
              error={errors.displayName?.message}
            />
            <InputText
              {...register("email")}
              label="이메일"
              type="email"
              placeholder="manager@flowops.kr"
              error={errors.email?.message}
            />
            <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <Typography variant="caption" tone="muted">
                이미 가입되었거나 초대된 이메일은 다시 사용할 수 없습니다.
              </Typography>
              <Button type="submit" disabled={isPending}>
                <MailPlus aria-hidden="true" />
                {isPending ? "전송 중..." : "관리자 초대"}
              </Button>
            </div>
          </form>
        )}

        <FormMessage
          errorMessage={
            errors.root?.message ??
            (message?.type === "error" ? message.text : undefined)
          }
          successMessage={
            message?.type === "success" ? message.text : undefined
          }
          className="rounded-lg bg-muted px-3 py-2.5"
        />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Typography as="h3" variant="cardTitle">
              등록된 관리자
            </Typography>
            <Typography variant="caption" tone="muted">
              {overview.admins.length}명
            </Typography>
          </div>

          {overview.admins.length === 0 ? (
            <div className="rounded-xl border border-dashed px-4 py-8 text-center">
              <Typography variant="bodySmall" tone="muted">
                표시할 관리자 계정이 없습니다.
              </Typography>
            </div>
          ) : (
            <div className="divide-y rounded-xl border">
              {overview.admins.map((admin) => (
                <div
                  key={admin.id}
                  className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center"
                >
                  <div className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-primary">
                    <ShieldCheck className="size-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Typography variant="body" className="font-semibold">
                        {admin.displayName}
                      </Typography>
                      <Badge
                        variant={
                          admin.status === "active" ? "secondary" : "outline"
                        }
                      >
                        {admin.status === "active" ? "활성" : "초대 대기"}
                      </Badge>
                      {admin.role === "super_admin" ? (
                        <Badge>메인 관리자</Badge>
                      ) : null}
                    </div>
                    <Typography
                      variant="bodySmall"
                      tone="muted"
                      className="mt-0.5 truncate"
                    >
                      {admin.email}
                    </Typography>
                  </div>
                  {admin.role === "admin" ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isPending}
                      onClick={() => revoke(admin.id, admin.email)}
                    >
                      <UserRoundX aria-hidden="true" />
                      권한 회수
                    </Button>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
