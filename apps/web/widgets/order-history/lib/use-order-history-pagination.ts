"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { createPathWithSearchParams } from "@/shared/lib/search-params"

import { DEFAULT_ORDER_HISTORY_FILTERS } from "../model/order-history-params"

const useOrderHistoryPagination = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setPage = (page: number) => {
    const nextSearchParams = new URLSearchParams(searchParams.toString())

    if (page <= DEFAULT_ORDER_HISTORY_FILTERS.page) {
      nextSearchParams.delete("page")
    } else {
      nextSearchParams.set("page", String(page))
    }

    router.push(createPathWithSearchParams(pathname, nextSearchParams))
  }

  return { setPage }
}

export { useOrderHistoryPagination }
