"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import { createPathWithSearchParams } from "@/shared/lib/search-params"

type SearchParamValue = string | number | null | undefined
type SearchParamValues = Record<string, SearchParamValue>
type HistoryMode = "push" | "replace"

type UseListSearchParamsOptions = {
  defaultPage?: number
}

export const useListSearchParams = ({
  defaultPage = 1,
}: UseListSearchParamsOptions = {}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateSearchParams = useCallback(
    (
      values: SearchParamValues,
      historyMode: HistoryMode = "push",
    ) => {
      const nextSearchParams = new URLSearchParams(searchParams.toString())

      Object.entries(values).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          nextSearchParams.delete(key)
          return
        }

        nextSearchParams.set(key, String(value))
      })

      const nextUrl = createPathWithSearchParams(pathname, nextSearchParams)

      if (historyMode === "replace") {
        window.history.replaceState(null, "", nextUrl)
        return
      }

      window.history.pushState(null, "", nextUrl)
    },
    [pathname, searchParams],
  )

  const setFilterParams = useCallback(
    (values: SearchParamValues) => {
      updateSearchParams({
        ...values,
        page: null,
      })
    },
    [updateSearchParams],
  )

  const setPage = useCallback(
    (nextPage: number) => {
      updateSearchParams({
        page: nextPage <= defaultPage ? null : nextPage,
      })
    },
    [defaultPage, updateSearchParams],
  )

  return {
    searchParams,
    updateSearchParams,
    setFilterParams,
    setPage,
  }
}
