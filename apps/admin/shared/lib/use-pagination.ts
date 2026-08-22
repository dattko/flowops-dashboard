export const usePagination = (page: number, totalPages: number) => {
  const visiblePageCount = 5
  const startPage = Math.max(
    1,
    Math.min(
      page - Math.floor(visiblePageCount / 2),
      totalPages - visiblePageCount + 1
    )
  )
  const endPage = Math.min(totalPages, startPage + visiblePageCount - 1)

  return Array.from(
    { length: Math.max(endPage - startPage + 1, 0) },
    (_, index) => startPage + index
  )
}
