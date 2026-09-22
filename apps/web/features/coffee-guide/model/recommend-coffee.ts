import type { Product } from "@/entities/product"

import type { CoffeeGuideAnswers } from "./coffee-guide"

const FLAVOR_TERMS: Record<CoffeeGuideAnswers["flavor"], readonly string[]> = {
  sweet: ["견과", "아몬드", "헤이즐넛", "호두", "피칸", "캐러멜", "초콜릿", "카카오", "꿀", "메이플", "고소", "달콤", "브라운슈거"],
  bright: ["베리", "블루베리", "딸기", "체리", "레몬", "오렌지", "자몽", "시트러스", "재스민", "복숭아", "살구", "사과", "배", "화사", "꽃"],
  bold: ["다크", "진한", "묵직", "스모키", "스파이스", "에스프레소", "카카오", "초콜릿", "허브"],
}

const isDecaf = (product: Product) =>
  /디카페인|decaf/i.test(`${product.name} ${product.description} ${product.label}`)

const getFamilyName = (product: Product) =>
  product.name.replace(/\s+(?:100|200|500)g$/u, "")

const recommendCoffee = (
  products: Product[],
  answers: CoffeeGuideAnswers,
) => {
  const terms = FLAVOR_TERMS[answers.flavor]
  const ranked = products
    .filter(
      (product) =>
        product.available > 0 &&
        !product.soldOut &&
        isDecaf(product) === (answers.caffeine === "decaf"),
    )
    .map((product, index) => {
      const text = `${product.name} ${product.description} ${product.notes.join(" ")}`.toLowerCase()
      const flavorMatches = terms.filter((term) => text.includes(term)).length

      return {
        product,
        index,
        score:
          (product.category === answers.brew ? 100 : 0) +
          flavorMatches * 10 +
          (product.category === "whole-bean" && /\s200g$/u.test(product.name) ? 2 : 0),
      }
    })
    .sort((first, second) => second.score - first.score || first.index - second.index)

  const seenFamilies = new Set<string>()
  const recommendations = ranked
    .filter(({ product }) => {
      const family = getFamilyName(product)
      if (seenFamilies.has(family)) return false
      seenFamilies.add(family)
      return true
    })
    .slice(0, 3)
    .map(({ product }) => product)

  return {
    products: recommendations,
    includesAlternativeBrew: recommendations.some(
      (product) => product.category !== answers.brew,
    ),
  }
}

export { recommendCoffee }
