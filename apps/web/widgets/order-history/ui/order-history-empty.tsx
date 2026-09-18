import { PackageOpen } from "lucide-react"
import Link from "next/link"

import { ROUTES } from "@/shared/config/routes"
import { buttonVariants } from "@/shared/ui/button"

const OrderHistoryEmpty = () => (
  <div className="rounded-[1.75rem] border border-dashed border-ink/15 bg-paper px-6 py-16 text-center">
    <span className="mx-auto grid size-14 place-items-center rounded-full bg-cream text-coffee">
      <PackageOpen className="size-6" aria-hidden="true" />
    </span>
    <h2 className="mt-5 text-xl font-semibold tracking-[-0.03em]">
      아직 주문 내역이 없어요
    </h2>
    <p className="mt-2 text-sm text-ink/55">
      오늘의 리듬에 어울리는 커피를 만나보세요.
    </p>
    <Link
      href={ROUTES.products.list}
      className={`${buttonVariants({ variant: "brand", size: "lg" })} mt-7`}
    >
      상품 둘러보기
    </Link>
  </div>
)

export { OrderHistoryEmpty }
