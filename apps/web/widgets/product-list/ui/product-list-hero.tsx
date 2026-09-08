import { Typography } from "@/shared/ui/typography"

export const ProductListHero = () => (
  <section className="relative overflow-hidden bg-cream px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
    <div className="absolute -right-32 -top-56 size-[36rem] rounded-full border-[7rem] border-paper/50" />
    <div className="absolute -bottom-44 left-[8%] size-64 rounded-full border-[4rem] border-[#e6d5bd]/70" />
    <div className="relative mx-auto max-w-[90rem]">
      <Typography variant="overline" tone="brand">
        MORROW COLLECTION
      </Typography>
      <Typography as="h1" variant="display" className="mt-4 max-w-3xl">
        오늘의 취향을 발견하는
        <br />
        가장 맛있는 방법<span className="text-coral">.</span>
      </Typography>
      <Typography variant="bodyLarge" tone="muted" className="mt-6 max-w-xl">
        매주 신선하게 로스팅한 원두부터 간편하게 즐기는 드립백까지, 내
        리듬에 맞는 커피를 골라보세요.
      </Typography>
    </div>
  </section>
)
