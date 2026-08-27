import { describe, expect, it } from "vitest"

import { usePagination as calculatePagination } from "./use-pagination"

describe("usePagination", () => {
  it("첫 페이지에서는 1페이지부터 5페이지까지 반환한다", () => {
    expect(calculatePagination(1, 10)).toEqual([1, 2, 3, 4, 5])
  })

  it("중간 페이지가 가운데 오도록 반환한다", () => {
    expect(calculatePagination(5, 10)).toEqual([3, 4, 5, 6, 7])
  })

  it("마지막 페이지에서 전체 페이지 수를 넘지 않는다", () => {
    expect(calculatePagination(10, 10)).toEqual([6, 7, 8, 9, 10])
  })

  it("전체 페이지가 5개 미만이거나 없을 때도 처리한다", () => {
    expect(calculatePagination(2, 3)).toEqual([1, 2, 3])
    expect(calculatePagination(1, 0)).toEqual([])
  })
})
