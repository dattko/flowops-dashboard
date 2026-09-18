"use client"

import { AlertCircle } from "lucide-react"

import { Button } from "@/shared/ui/button"

const ErrorPage = ({ reset }: { reset: () => void }) => (
  <section className="px-5 py-20 text-center sm:px-8 lg:px-12">
    <AlertCircle className="mx-auto size-10 text-coral" aria-hidden="true" />
    <h1 className="mt-5 text-2xl font-semibold tracking-[-0.035em]">
      주문 내역을 불러오지 못했어요
    </h1>
    <p className="mt-2 text-sm text-ink/55">잠시 후 다시 시도해 주세요.</p>
    <Button type="button" variant="brand" className="mt-7" onClick={reset}>
      다시 시도
    </Button>
  </section>
)

export default ErrorPage
