import { ArrowRight } from "lucide-react"

import { Typography } from "@/shared/ui/typography"

export const BrandStorySection = () => (
  <section
    id="story"
    className="scroll-mt-20 bg-leaf px-5 py-24 text-paper sm:px-8 lg:px-12 lg:py-32"
  >
    <div className="mx-auto grid max-w-[90rem] gap-12 lg:grid-cols-2 lg:items-center">
      <div className="relative aspect-[1.18] overflow-hidden rounded-[2rem] bg-[#617464]">
        <div className="absolute -bottom-[35%] -left-[8%] size-[78%] rounded-full border-[5rem] border-[#d7be8d]/70" />
        <div className="absolute right-[12%] top-[10%] h-[72%] w-[34%] rotate-[12deg] rounded-[50%] bg-coral/85" />
        <div className="absolute bottom-[12%] left-[42%] h-[55%] w-[29%] -rotate-[18deg] rounded-[50%] border-[1.1rem] border-paper/75" />
      </div>
      <div className="lg:pl-10">
        <Typography variant="overline" className="text-[#e6cda0]">
          OUR MORROW
        </Typography>
        <Typography as="h2" variant="display" tone="inverse" className="mt-4">
          내일도 찾게 되는
          <br />
          오늘의 한 잔
        </Typography>
        <Typography
          variant="bodyLarge"
          tone="inverse-muted"
          className="mt-7 max-w-xl"
        >
          Morrow는 유행보다 오래 남는 취향을 생각합니다. 산지의 개성을
          또렷하게 살리고, 누구나 편하게 즐길 수 있는 균형으로 매주 신선하게
          로스팅합니다.
        </Typography>
        <a
          href="#top"
          className="group mt-9 inline-flex items-center gap-3 text-sm font-semibold"
        >
          모로우의 기준 알아보기
          <span className="grid size-9 place-items-center rounded-full border border-paper/30 transition-colors group-hover:bg-paper group-hover:text-leaf">
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </a>
      </div>
    </div>
  </section>
)
