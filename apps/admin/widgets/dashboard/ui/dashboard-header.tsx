"use client"

import { useProfile } from "@/entities/profile/client"
import { dayjs } from "@/shared/lib/dayjs"
import { Typography } from "@/shared/ui/typography"

export const DashboardHeader = () => {
  const { profile } = useProfile()
  const displayName = profile.displayName

  return (
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <Typography variant="label" tone="muted" className="mb-1">
          {dayjs().format("YYYY년 MM월 DD일 dddd")}
        </Typography>
        <Typography as="h1" variant="pageTitle">
          좋은 오후예요, {displayName ?? "사용자"}님
        </Typography>
        <Typography variant="body" tone="muted" className="mt-2">
          오늘 운영 현황에서 우선 확인할 내용을 정리했어요.
        </Typography>
      </div>
      {/* <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="border-[#dedbd2] bg-white text-foreground shadow-none"
        >
          <CalendarDays aria-hidden="true" />
          최근 7일
        </Button>
        <Button className="bg-sidebar text-sidebar-foreground hover:bg-sidebar-accent">
          <Download aria-hidden="true" />
          리포트 내보내기
        </Button>
      </div> */}
    </div>
  )
}
