"use client"

import { ReportFilter } from "@/features/filter-reports"
import { Card, CardContent } from "@/shared/ui/card"
import { PageHeader } from "@/shared/ui/page-header"
import { Typography } from "@/shared/ui/typography"

import { useReportList } from "../lib/use-report-list"
import { DailySalesReportTable } from "./daily-sales-report-table"
import { OrderStatusReport } from "./order-status-report"
import { ReportSummaryCards } from "./report-summary-cards"
import { TopProductsReportTable } from "./top-products-report-table"

const ReportList = () => {
  const {
    filters,
    applyFilters,
    resetFilters,
    reportQuery: { data, isError, isFetching, isPending },
  } = useReportList()

  return (
    <section aria-labelledby="report-list-title">
      <PageHeader
        titleId="report-list-title"
        title="리포트"
        description="기간별 주문과 매출, 판매 상품 실적을 확인합니다."
      />

      <ReportFilter
        filters={filters}
        onSubmitFilters={applyFilters}
        onResetFilters={resetFilters}
        isFetching={isFetching}
      />

      {isPending ? (
        <Card className="mt-6">
          <CardContent className="py-12 text-center">
            <Typography variant="bodySmall" tone="muted">
              리포트를 불러오는 중입니다.
            </Typography>
          </CardContent>
        </Card>
      ) : isError || !data ? (
        <Card className="mt-6">
          <CardContent className="py-12 text-center">
            <Typography variant="bodySmall" tone="destructive" role="alert">
              리포트를 불러오지 못했습니다. 기간을 확인한 후 다시 시도해
              주세요.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <div className="relative">
          {isFetching ? (
            <div className="absolute inset-x-0 top-4 z-20 h-0.5 overflow-hidden bg-primary/15">
              <div className="h-full w-1/3 animate-pulse bg-primary" />
            </div>
          ) : null}

          <ReportSummaryCards summary={data.summary} />

          <div className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
            <DailySalesReportTable dailySales={data.dailySales} />
            <OrderStatusReport statusDistribution={data.statusDistribution} />
          </div>

          <div className="mt-5">
            <TopProductsReportTable products={data.topProducts} />
          </div>
        </div>
      )}
    </section>
  )
}

export { ReportList }
