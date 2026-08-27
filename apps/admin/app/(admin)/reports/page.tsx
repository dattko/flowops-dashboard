import { Suspense } from "react"

import { ReportList } from "@/widgets/report-list"

const ReportsPage = () => {
  return (
    <Suspense fallback={null}>
      <ReportList />
    </Suspense>
  )
}

export default ReportsPage
