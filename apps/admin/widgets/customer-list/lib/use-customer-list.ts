"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import {
  CUSTOMER_STATUS_FILTER_VALUES,
  DEFAULT_CUSTOMER_FILTERS,
} from "@/features/filter-customers"
import type {
  CustomerFilterFormValues,
  CustomerStatusFilter,
} from "@/features/filter-customers"
import { useListSearchParams } from "@/shared/lib/use-list-search-params"

import { getCustomers } from "../api/customer-list-client.api"

const getCustomerStatus = (value: string | null): CustomerStatusFilter => {
  return CUSTOMER_STATUS_FILTER_VALUES.some((status) => status === value)
    ? (value as CustomerStatusFilter)
    : DEFAULT_CUSTOMER_FILTERS.status
}

const useCustomerList = () => {
  const {
    searchParams,
    page,
    pageSize,
    setFilterParams,
    setPage: setListPage,
  } = useListSearchParams()
  const filters = {
    page,
    pageSize,
    keyword: searchParams.get("keyword") ?? DEFAULT_CUSTOMER_FILTERS.keyword,
    status: getCustomerStatus(searchParams.get("status")),
  }
  const customerQuery = useQuery({
    queryKey: ["customers", "list", filters] as const,
    queryFn: () => getCustomers(filters),
    placeholderData: keepPreviousData,
  })
  const applyFilters = (nextFilters: CustomerFilterFormValues) => {
    setFilterParams({
      keyword: nextFilters.keyword,
      status: nextFilters.status === "all" ? null : nextFilters.status,
    })
  }
  const resetFilters = () => {
    setFilterParams({
      keyword: null,
      status: null,
    })
  }

  return {
    filters,
    applyFilters,
    resetFilters,
    setPage: setListPage,
    customerQuery,
  }
}

export { useCustomerList }
