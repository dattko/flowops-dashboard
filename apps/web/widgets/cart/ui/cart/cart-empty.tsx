import { ShoppingBag } from "lucide-react"
import Link from "next/link"

import { ROUTES } from "@/shared/config/routes"
import { buttonVariants } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"

export const CartEmpty = () => (
  <div className="grid min-h-[26rem] place-items-center border-y border-ink/10 py-16 text-center">
    <div>
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-cream text-coffee">
        <ShoppingBag className="size-6" strokeWidth={1.6} aria-hidden="true" />
      </span>
      <Typography as="h2" variant="title" className="mt-6">
        장바구니가 비어 있어요
      </Typography>
      <Typography tone="muted" className="mt-3">
        오늘의 리듬에 어울리는 커피를 골라보세요.
      </Typography>
      <Link
        href={ROUTES.products.list}
        className={`${buttonVariants({ variant: "brand", size: "lg" })} mt-7`}
      >
        상품 둘러보기
      </Link>
    </div>
  </div>
)
