"use client"

import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { getProducts } from "@/entities/product"

import {
  COFFEE_GUIDE_CANDIDATE_LIMIT,
  COFFEE_GUIDE_QUESTIONS,
  type CoffeeGuideAnswers,
} from "../model/coffee-guide"
import { recommendCoffee } from "../model/recommend-coffee"

const hasAllAnswers = (
  answers: Partial<CoffeeGuideAnswers>,
): answers is CoffeeGuideAnswers =>
  Boolean(answers.brew && answers.flavor && answers.caffeine)

const useCoffeeGuide = () => {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<CoffeeGuideAnswers>>({})
  const completedAnswers =
    step === COFFEE_GUIDE_QUESTIONS.length && hasAllAnswers(answers)
      ? answers
      : null

  const productQuery = useQuery({
    queryKey: [
      "coffee-guide-candidates",
      completedAnswers?.brew,
      completedAnswers?.caffeine,
    ],
    queryFn: () => {
      if (!completedAnswers) throw new Error("취향 응답이 완료되지 않았습니다.")

      return getProducts({
        page: 1,
        pageSize: COFFEE_GUIDE_CANDIDATE_LIMIT,
        keyword: completedAnswers.caffeine === "decaf" ? "디카페인" : "",
        category:
          completedAnswers.caffeine === "decaf" ? "all" : completedAnswers.brew,
        sort: "featured",
      })
    },
    enabled: completedAnswers !== null,
  })

  const recommendation = useMemo(
    () =>
      completedAnswers && productQuery.data
        ? recommendCoffee(productQuery.data.items, completedAnswers)
        : null,
    [completedAnswers, productQuery.data],
  )

  const selectAnswer = (
    id: keyof CoffeeGuideAnswers,
    value: CoffeeGuideAnswers[keyof CoffeeGuideAnswers],
  ) => setAnswers((current) => ({ ...current, [id]: value }))

  const nextStep = () => {
    const question = COFFEE_GUIDE_QUESTIONS[step]
    if (question && answers[question.id]) setStep((current) => current + 1)
  }

  const previousStep = () => setStep((current) => Math.max(current - 1, 0))

  const restart = () => {
    setAnswers({})
    setStep(0)
  }

  return {
    answers,
    step,
    isComplete: completedAnswers !== null,
    completedAnswers,
    productQuery,
    recommendation,
    selectAnswer,
    nextStep,
    previousStep,
    restart,
  }
}

export { useCoffeeGuide }
