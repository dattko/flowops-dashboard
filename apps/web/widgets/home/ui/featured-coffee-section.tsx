import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { ROUTES } from "@/shared/config/routes"
import { Typography } from "@/shared/ui/typography"

import { CoffeeBag } from "./coffee-bag"

const coffees = [
  {
    name: "Daybreak Blend",
    note: "캐러멜 · 구운 아몬드 · 밀크초콜릿",
    price: "18,000원",
    tone: "bg-[#c56343]",
    label: "MORROW 01",
  },
  {
    name: "Ethiopia Chelbesa",
    note: "백도 · 재스민 · 얼그레이",
    price: "22,000원",
    tone: "bg-[#465f4a]",
    label: "SINGLE 02",
  },
  {
    name: "Quiet Decaf",
    note: "메이플시럽 · 카카오 · 오렌지",
    price: "20,000원",
    tone: "bg-[#b69261]",
    label: "DECAF 03",
  },
]

export const FeaturedCoffeeSection = () => (
  <section
    id="coffee"
    className="scroll-mt-20 px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
  >
    <div className="mx-auto max-w-[90rem]">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <Typography variant="overline" tone="brand">
            OUR COFFEE
          </Typography>
          <Typography as="h2" variant="sectionTitle" className="mt-3">
            지금 가장 좋은 커피
          </Typography>
        </div>
        <Link
          href={ROUTES.products.list}
          className="group inline-flex items-center gap-2 text-sm font-semibold underline decoration-black/20 underline-offset-8"
        >
          모든 커피 보기
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {coffees.map((coffee) => (
          <article key={coffee.name} className="group">
            <div className="grid aspect-[0.94] place-items-center overflow-hidden rounded-[1.5rem] bg-cream/70 p-8">
              <div className="w-full transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-2">
                <CoffeeBag tone={coffee.tone} label={coffee.label} />
              </div>
            </div>
            <div className="flex items-start justify-between gap-4 px-1 pt-5">
              <div>
                <h3 className="font-semibold tracking-[-0.025em]">
                  {coffee.name}
                </h3>
                <p className="mt-1 text-sm text-ink/55">{coffee.note}</p>
              </div>
              <p className="shrink-0 text-sm font-semibold">{coffee.price}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)
