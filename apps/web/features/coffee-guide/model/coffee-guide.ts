import type { ProductCategory } from "@/entities/product"

type BrewPreference = Exclude<ProductCategory, "gear">
type FlavorPreference = "sweet" | "bright" | "bold"
type CaffeinePreference = "regular" | "decaf"

type CoffeeGuideAnswers = {
  brew: BrewPreference
  flavor: FlavorPreference
  caffeine: CaffeinePreference
}

type CoffeeGuideQuestion = {
  [Key in keyof CoffeeGuideAnswers]: {
    id: Key
    title: string
    description: string
    options: ReadonlyArray<{
      value: CoffeeGuideAnswers[Key]
      label: string
      description: string
    }>
  }
}[keyof CoffeeGuideAnswers]

const COFFEE_GUIDE_QUESTIONS = [
  {
    id: "brew",
    title: "커피를 어떻게 마시나요?",
    description: "평소 즐겨 사용하는 방식을 골라주세요.",
    options: [
      { value: "whole-bean", label: "직접 내려요", description: "원두를 갈아 추출해요" },
      { value: "drip-bag", label: "간편하게 내려요", description: "드립백이 편해요" },
      { value: "capsule", label: "머신을 사용해요", description: "캡슐을 즐겨요" },
      { value: "cold-brew", label: "차갑게 마셔요", description: "콜드브루가 좋아요" },
    ],
  },
  {
    id: "flavor",
    title: "어떤 풍미가 끌리나요?",
    description: "가장 먼저 떠오르는 맛을 골라주세요.",
    options: [
      { value: "sweet", label: "고소하고 달콤한 맛", description: "견과 · 캐러멜 · 초콜릿" },
      { value: "bright", label: "과일처럼 화사한 맛", description: "베리 · 시트러스 · 꽃" },
      { value: "bold", label: "진하고 묵직한 맛", description: "다크초콜릿 · 카카오 · 스파이스" },
    ],
  },
  {
    id: "caffeine",
    title: "카페인은 어떻게 할까요?",
    description: "마시는 시간과 취향을 생각해 골라주세요.",
    options: [
      { value: "regular", label: "카페인 괜찮아요", description: "일반 커피를 추천받을게요" },
      { value: "decaf", label: "디카페인이 좋아요", description: "카페인 부담을 줄이고 싶어요" },
    ],
  },
] as const satisfies readonly CoffeeGuideQuestion[]

const COFFEE_GUIDE_CANDIDATE_LIMIT = 100

export { COFFEE_GUIDE_CANDIDATE_LIMIT, COFFEE_GUIDE_QUESTIONS }
export type { CoffeeGuideAnswers }
