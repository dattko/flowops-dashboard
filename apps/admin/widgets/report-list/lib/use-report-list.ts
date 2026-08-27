"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

import type { ReportFilters } from "@/features/filter-reports"
import { dayjs } from "@/shared/lib/dayjs"

import { getSalesReport } from "../api/report-list-client.api"

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

const getDefaultFilters = (): ReportFilters => ({
  dateFrom: dayjs().tz().subtract(6, "day").format("YYYY-MM-DD"),
  dateTo: dayjs().tz().format("YYYY-MM-DD"),
})

const getDateParam = (value: string | null, fallback: string) => {
  return value && DATE_PATTERN.test(value) && dayjs(value).isValid()
    ? value
    : fallback
}

const useReportList = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultFilters = getDefaultFilters()
  const filters = {
    dateFrom: getDateParam(searchParams.get("dateFrom"), defaultFilters.dateFrom),
    dateTo: getDateParam(searchParams.get("dateTo"), defaultFilters.dateTo),
  }
  const reportQuery = useQuery({
    queryKey: ["reports", "sales", filters] as const,
    queryFn: () => getSalesReport(filters),
    placeholderData: keepPreviousData,
  })
  const applyFilters = (nextFilters: ReportFilters) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("dateFrom", nextFilters.dateFrom)
    params.set("dateTo", nextFilters.dateTo)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }
  const resetFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("dateFrom")
    params.delete("dateTo")
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  return {
    filters,
    applyFilters,
    resetFilters,
    reportQuery,
  }
}

export { useReportList }
