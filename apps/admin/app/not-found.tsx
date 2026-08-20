import { Construction } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"

const NotFound = () => {
  return (
    <main className="grid min-h-svh place-items-center bg-[#f6f5f0] px-5">
      <div className="text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Construction className="size-7" aria-hidden="true" />
        </div>
        <Typography as="h1" variant="pageTitle" className="mt-5">
          서비스 준비 중입니다.
        </Typography>
        <Typography variant="body" tone="muted" className="mt-2">
          더 나은 기능으로 곧 찾아뵙겠습니다.
        </Typography>
        <Link href="/" className={buttonVariants({ className: "mt-7" })}>
          대시보드로 돌아가기
        </Link>
      </div>
    </main>
  )
}

export default NotFound
