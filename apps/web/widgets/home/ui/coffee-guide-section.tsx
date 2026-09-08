import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"

export const CoffeeGuideSection = () => (
  <section
    id="guide"
    className="scroll-mt-20 bg-[#e7c889] px-5 py-20 text-center sm:px-8 lg:px-12 lg:py-24"
  >
    <Typography variant="overline" tone="brand">
      COFFEE GUIDE
    </Typography>
    <Typography as="h2" variant="sectionTitle" className="mx-auto mt-4 max-w-2xl">
      어떤 커피를 좋아할지 모르겠다면?
    </Typography>
    <Typography tone="muted" className="mx-auto mt-5 max-w-xl text-base leading-7">
      몇 가지 질문에 답하면 취향과 추출 방식에 맞는 커피를 추천해드려요.
    </Typography>
    <Button type="button" size="lg" className="mt-8 hover:-translate-y-0.5">
      1분 취향 테스트 시작
    </Button>
  </section>
)
