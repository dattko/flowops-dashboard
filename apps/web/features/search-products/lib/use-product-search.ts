"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { ROUTES } from "@/shared/config/routes"
import { createPathWithSearchParams } from "@/shared/lib/search-params"

type ProductSearchFormValues = {
  keyword: string
}

const useProductSearch = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<ProductSearchFormValues>({
    defaultValues: { keyword: "" },
  })

  const onOpenChange = (nextOpen: boolean) => {
    setIsOpen(nextOpen)

    if (nextOpen) {
      window.requestAnimationFrame(() => form.setFocus("keyword"))
      return
    }

    form.reset()
  }

  const onSubmit = form.handleSubmit(({ keyword }) => {
    const normalizedKeyword = keyword.trim()
    const searchParams = new URLSearchParams({ keyword: normalizedKeyword })

    router.push(
      createPathWithSearchParams(ROUTES.products.list, searchParams),
    )
    setIsOpen(false)
    form.reset()
  })

  return {
    form,
    isOpen,
    onOpenChange,
    onSubmit,
  }
}

export { useProductSearch }
