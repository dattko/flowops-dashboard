"use client"

import { useProfile } from "@/entities/profile"
import { dayjs } from "@/shared/lib/dayjs"
import { PageHeader } from "@/shared/ui/page-header"

export const DashboardHeader = () => {
  const { profile } = useProfile()
  const displayName = profile.displayName

  return (
    <PageHeader
      eyebrow={dayjs().format("YYYY년 MM월 DD일 dddd")}
      title={`좋은 오후예요, ${displayName ?? "사용자"}님`}
      description="오늘 운영 현황에서 우선 확인할 내용을 정리했어요."
    />
  )
}
