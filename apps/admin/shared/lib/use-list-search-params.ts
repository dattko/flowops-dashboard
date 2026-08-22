"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import {
  DEFAULT_PAGINATION,
  PAGE_SIZE_OPTIONS,
} from "@/shared/model/pagination"

type SearchParamValue = string | number | null | undefined
type SearchParamValues = Record<string, SearchParamValue>

const getPage = (value: string | null) => {
  const page = Number(value)

  return Number.isInteger(page) && page > 0 ? page : DEFAULT_PAGINATION.page
}

const getPageSize = (value: string | null) => {
  const pageSize = Number(value)

  return PAGE_SIZE_OPTIONS.some((option) => option === pageSize)
    ? pageSize
    : DEFAULT_PAGINATION.pageSize
}

export const useListSearchParams = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = getPage(searchParams.get("page"))
  const pageSize = getPageSize(searchParams.get("pageSize"))

  const updateSearchParams = (values: SearchParamValues) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(values).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        params.delete(key)
        return
      }

      params.set(key, String(value))
    })

    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  const setFilterParams = (values: SearchParamValues) => {
    updateSearchParams({
      ...values,
      page: null,
    })
  }

  const setPage = (nextPage: number) => {
    const normalizedPage = Math.max(nextPage, DEFAULT_PAGINATION.page)

    updateSearchParams({
      page:
        normalizedPage === DEFAULT_PAGINATION.page ? null : normalizedPage,
    })
  }

  const setPageSize = (nextPageSize: number) => {
    const normalizedPageSize = PAGE_SIZE_OPTIONS.some(
      (option) => option === nextPageSize
    )
      ? nextPageSize
      : DEFAULT_PAGINATION.pageSize

    updateSearchParams({
      page: null,
      pageSize:
        normalizedPageSize === DEFAULT_PAGINATION.pageSize
          ? null
          : normalizedPageSize,
    })
  }

  return {
    searchParams,
    page,
    pageSize,
    setFilterParams,
    setPage,
    setPageSize,
  }
}
