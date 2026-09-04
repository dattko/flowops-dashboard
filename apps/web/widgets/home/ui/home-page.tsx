import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";

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
];

const CoffeeBag = ({
  tone,
  label,
  size = "default",
}: {
  tone: string;
  label: string;
  size?: "default" | "large";
}) => {
  return (
    <div
      className={`relative mx-auto w-[55%] min-w-36 max-w-56 overflow-hidden rounded-[0.4rem_0.4rem_1.2rem_1.2rem] shadow-[0_24px_50px_rgba(38,29,22,0.17)] ${tone} ${
        size === "large" ? "aspect-[0.74] max-w-[18rem]" : "aspect-[0.76]"
      }`}
      aria-hidden="true"
    >
      <div className="absolute inset-x-0 top-[7%] h-px bg-white/25" />
      <div className="absolute left-1/2 top-[34%] flex aspect-[1.25] w-[66%] -translate-x-1/2 flex-col items-center justify-center bg-[#f8f3e9] px-3 text-center text-ink">
        <span className="text-[0.48rem] font-semibold tracking-[0.18em]">MORROW</span>
        <span className="mt-2 font-serif text-base italic sm:text-lg">Coffee</span>
        <span className="mt-2 text-[0.46rem] tracking-[0.12em] text-black/60">{label}</span>
      </div>
      <div className="absolute bottom-[7%] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/45" />
    </div>
  );
};

export const HomePage = () => {
  return (
      <>
        <section className="relative isolate min-h-[calc(100svh-6.5rem)] overflow-hidden bg-cream px-5 sm:px-8 lg:px-12">
          <div className="absolute -right-28 -top-36 -z-10 size-[34rem] rounded-full border-[6rem] border-paper/50" />
          <div className="absolute -bottom-64 left-[38%] -z-10 size-[38rem] rounded-full border-[8rem] border-[#e8dac6]/80" />
          <div className="mx-auto grid min-h-[calc(100svh-6.5rem)] max-w-[90rem] items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-12">
            <div className="max-w-3xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper/55 px-4 py-2 text-xs font-semibold tracking-[0.05em]">
                <Sparkles className="size-3.5 text-coffee" aria-hidden="true" />
                9월의 새로운 커피가 도착했어요
              </div>
              <Typography as="h1" variant="hero">
                매일의 리듬을
                <br />
                위한 커피
                <span className="text-coral">.</span>
              </Typography>
              <Typography variant="bodyLarge" tone="muted" className="mt-8 max-w-lg">
                선명한 향미, 편안한 균형. 오늘의 기분과 취향에 맞는
                스페셜티 커피를 골라보세요.
              </Typography>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#coffee"
                  className={cn(buttonVariants({ size: "lg" }), "group hover:-translate-y-0.5")}
                >
                  커피 둘러보기
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
                <a
                  href="#guide"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  내 취향 찾기
                </a>
              </div>
            </div>

            <div className="relative flex min-h-[28rem] items-center justify-center lg:min-h-[38rem]">
              <div className="absolute left-[5%] top-[18%] size-24 rounded-full bg-coral/80 blur-[1px] sm:size-32" />
              <div className="absolute bottom-[12%] right-[4%] size-32 rounded-full border-[1.8rem] border-leaf/85 sm:size-44 sm:border-[2.4rem]" />
              <div className="absolute left-[9%] top-[14%] z-20 rounded-full bg-paper px-4 py-2 text-xs font-semibold shadow-lg rotate-[-9deg]">
                ROASTED WEEKLY
              </div>
              <div className="relative z-10 w-full rotate-[4deg] transition-transform duration-500 hover:rotate-0">
                <CoffeeBag tone="bg-coffee" label="HOUSE BLEND 250G" size="large" />
              </div>
              <div className="absolute bottom-[8%] left-[5%] z-20 max-w-44 rounded-2xl bg-paper p-4 shadow-[0_18px_40px_rgba(38,29,22,0.12)] sm:left-[12%]">
                <p className="text-[0.65rem] font-bold tracking-[0.14em] text-coffee">TASTING NOTE</p>
                <p className="mt-2 text-sm font-semibold leading-5">캐러멜의 단맛과 고소한 여운</p>
              </div>
            </div>
          </div>
          <a
            href="#coffee"
            className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[0.62rem] font-semibold tracking-[0.16em] text-ink/50 lg:flex"
          >
            SCROLL
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </section>

        <section id="coffee" className="scroll-mt-20 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[90rem]">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <Typography variant="overline" tone="brand">OUR COFFEE</Typography>
                <Typography as="h2" variant="sectionTitle" className="mt-3">지금 가장 좋은 커피</Typography>
              </div>
              <a href="#top" className="group inline-flex items-center gap-2 text-sm font-semibold underline decoration-black/20 underline-offset-8">
                모든 커피 보기
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
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
                      <h3 className="font-semibold tracking-[-0.025em]">{coffee.name}</h3>
                      <p className="mt-1 text-sm text-ink/55">{coffee.note}</p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold">{coffee.price}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="story" className="scroll-mt-20 bg-leaf px-5 py-24 text-paper sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto grid max-w-[90rem] gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[1.18] overflow-hidden rounded-[2rem] bg-[#617464]">
              <div className="absolute -bottom-[35%] -left-[8%] size-[78%] rounded-full border-[5rem] border-[#d7be8d]/70" />
              <div className="absolute right-[12%] top-[10%] h-[72%] w-[34%] rotate-[12deg] rounded-[50%] bg-coral/85" />
              <div className="absolute bottom-[12%] left-[42%] h-[55%] w-[29%] -rotate-[18deg] rounded-[50%] border-[1.1rem] border-paper/75" />
            </div>
            <div className="lg:pl-10">
              <Typography variant="overline" className="text-[#e6cda0]">OUR MORROW</Typography>
              <Typography as="h2" variant="display" tone="inverse" className="mt-4">
                내일도 찾게 되는
                <br />
                오늘의 한 잔
              </Typography>
              <Typography variant="bodyLarge" tone="inverse-muted" className="mt-7 max-w-xl">
                Morrow는 유행보다 오래 남는 취향을 생각합니다. 산지의 개성을
                또렷하게 살리고, 누구나 편하게 즐길 수 있는 균형으로 매주
                신선하게 로스팅합니다.
              </Typography>
              <a href="#top" className="group mt-9 inline-flex items-center gap-3 text-sm font-semibold">
                모로우의 기준 알아보기
                <span className="grid size-9 place-items-center rounded-full border border-paper/30 transition-colors group-hover:bg-paper group-hover:text-leaf">
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>
        </section>

        <section id="guide" className="scroll-mt-20 bg-[#e7c889] px-5 py-20 text-center sm:px-8 lg:px-12 lg:py-24">
          <Typography variant="overline" tone="brand">COFFEE GUIDE</Typography>
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
      </>
  );
};
