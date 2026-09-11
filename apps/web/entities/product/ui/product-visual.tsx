import { cn } from "@/shared/lib/utils"

import type { ProductTone } from "../model/types"

const PRODUCT_TONE_STYLES: Record<ProductTone, string> = {
  terracotta: "bg-[#b85f42]",
  forest: "bg-[#465f4a]",
  sand: "bg-[#b69261]",
  navy: "bg-[#40546d]",
  plum: "bg-[#74505d]",
  mustard: "bg-[#c39445]",
  sage: "bg-[#72806b]",
  charcoal: "bg-[#3d3b38]",
}

type ProductVisualProps = {
  tone: ProductTone
  label: string
  className?: string
  size?: "card" | "detail"
}

export const ProductVisual = ({
  tone,
  label,
  className,
  size = "card",
}: ProductVisualProps) => {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-[0.76] overflow-hidden rounded-[0.4rem_0.4rem_1.15rem_1.15rem] shadow-[0_24px_50px_rgba(38,29,22,0.16)]",
        size === "card"
          ? "w-[54%] min-w-36 max-w-52"
          : "w-[54%] min-w-52 max-w-sm",
        PRODUCT_TONE_STYLES[tone],
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-x-0 top-[7%] h-px bg-white/25" />
      <div className="absolute left-1/2 top-[34%] flex aspect-[1.25] w-[66%] -translate-x-1/2 flex-col items-center justify-center bg-[#f8f3e9] px-3 text-center text-ink">
        <span className="text-[0.48rem] font-semibold tracking-[0.18em]">
          MORROW
        </span>
        <span className="mt-2 font-serif text-base italic sm:text-lg">
          Coffee
        </span>
        <span className="mt-2 text-[0.43rem] tracking-[0.1em] text-black/60">
          {label}
        </span>
      </div>
      <div className="absolute bottom-[7%] left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-white/45" />
    </div>
  )
}
