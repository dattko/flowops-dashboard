import type { Metadata } from "next"
import { Suspense } from "react"

import { ReportList } from "@/widgets/report-list"

export const metadata: Metadata = {
  title: "리포트",
  description: "기간별 주문, 매출, 판매 상품과 주문 상태 실적을 확인합니다.",
}

const ReportsPage = () => {
  return (
    <Suspense fallback={null}>
      <ReportList />
    </Suspense>
  )
}

export default ReportsPage
