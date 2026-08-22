export type PaginationParams = {
  page: number
  pageSize: number
}

export const DEFAULT_PAGINATION: PaginationParams = {
  page: 1,
  pageSize: 10,
}

export const PAGE_SIZE_OPTIONS = [10, 20, 50] as const
