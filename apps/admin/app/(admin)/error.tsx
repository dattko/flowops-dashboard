"use client"

import Link from "next/link"
import { AlertTriangle, RotateCcw } from "lucide-react"

import { Button, buttonVariants } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { ROUTES } from "@/shared/config/routes"
import { Typography } from "@/shared/ui/typography"

type AdminErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const AdminError = ({ reset }: AdminErrorProps) => {
  return (
    <main className="grid min-h-[calc(100svh-8rem)] place-items-center py-10">
      <Card appearance="panel" className="w-full max-w-lg">
        <CardContent className="flex flex-col items-center px-6 py-12 text-center sm:px-10">
          <div className="grid size-14 place-items-center rounded-2xl bg-destructive/10 text-destructive">
            <AlertTriangle className="size-7" aria-hidden="true" />
          </div>

          <Typography as="h1" variant="pageTitle" className="mt-5">
            화면을 불러오지 못했습니다.
          </Typography>
          <Typography variant="body" tone="muted" className="mt-2 max-w-sm">
            일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
          </Typography>

          <div className="mt-7 flex flex-col gap-2 sm:flex-row">
            <Button type="button" onClick={reset}>
              <RotateCcw aria-hidden="true" />
              다시 시도
            </Button>
            <Link
              href={ROUTES.dashboard}
              className={buttonVariants({ variant: "outline" })}
            >
              대시보드로 이동
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default AdminError
