"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"

import { useCoffeeGuide } from "../lib/use-coffee-guide"
import { COFFEE_GUIDE_QUESTIONS } from "../model/coffee-guide"
import { CoffeeGuideResult } from "./coffee-guide-result"

const CoffeeGuideQuiz = () => {
  const {
    answers,
    step,
    isComplete,
    productQuery,
    recommendation,
    selectAnswer,
    nextStep,
    previousStep,
    restart,
  } = useCoffeeGuide()
  const question = COFFEE_GUIDE_QUESTIONS[step]

  return (
    <div className="rounded-[1.75rem] border border-ink/10 bg-paper p-5 shadow-[0_28px_80px_rgba(45,35,28,0.07)] sm:p-8 lg:p-10">
      {!isComplete && question ? (
        <>
          <div className="flex items-center justify-between gap-4">
            <Typography as="span" variant="label">
              질문 {step + 1} / {COFFEE_GUIDE_QUESTIONS.length}
            </Typography>
            <Typography as="span" variant="label" tone="muted">
              약 1분
            </Typography>
          </div>
          <div
            role="progressbar"
            aria-label="취향 테스트 진행률"
            aria-valuemin={0}
            aria-valuemax={COFFEE_GUIDE_QUESTIONS.length}
            aria-valuenow={step + 1}
            className="mt-4 h-1.5 overflow-hidden rounded-full bg-cream"
          >
            <div
              className="h-full rounded-full bg-coffee transition-[width] duration-200"
              style={{ width: `${((step + 1) / COFFEE_GUIDE_QUESTIONS.length) * 100}%` }}
            />
          </div>

          <fieldset className="mt-9">
            <Typography as="legend" variant="sectionTitle" className="text-2xl sm:text-3xl">
              {question.title}
            </Typography>
            <Typography tone="muted" className="mt-2">{question.description}</Typography>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {question.options.map((option) => {
                const isSelected = answers[question.id] === option.value

                return (
                  <label
                    key={option.value}
                    className={`block cursor-pointer rounded-2xl border p-5 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-coffee ${
                      isSelected
                        ? "border-coffee bg-coffee/5"
                        : "border-ink/10 hover:border-coffee/40 hover:bg-cream/35"
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option.value}
                      checked={isSelected}
                      onChange={() => selectAnswer(question.id, option.value)}
                      className="sr-only"
                    />
                    <span className="flex items-center justify-between gap-3">
                      <Typography as="span" variant="label" className="text-base">
                        {option.label}
                      </Typography>
                      <span
                        className={`size-5 shrink-0 rounded-full border-2 ${
                          isSelected ? "border-[6px] border-coffee" : "border-ink/25"
                        }`}
                        aria-hidden="true"
                      />
                    </span>
                    <Typography as="span" tone="muted" className="mt-2 block">
                      {option.description}
                    </Typography>
                  </label>
                )
              })}
            </div>
          </fieldset>

          <div className="mt-9 flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
            <Button type="button" variant="ghost" onClick={previousStep} disabled={step === 0}>
              <ArrowLeft className="size-4" aria-hidden="true" />
              이전
            </Button>
            <Button
              type="button"
              variant="brand"
              onClick={nextStep}
              disabled={!answers[question.id]}
            >
              {step === COFFEE_GUIDE_QUESTIONS.length - 1 ? "결과 보기" : "다음"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </>
      ) : (
        <CoffeeGuideResult
          products={recommendation?.products}
          includesAlternativeBrew={recommendation?.includesAlternativeBrew ?? false}
          isPending={productQuery.isPending}
          isError={productQuery.isError}
          onRetry={() => productQuery.refetch()}
          onRestart={restart}
        />
      )}
    </div>
  )
}

export { CoffeeGuideQuiz }
