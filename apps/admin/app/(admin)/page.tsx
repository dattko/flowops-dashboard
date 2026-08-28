import type { Metadata } from "next"

import { DashboardOverview } from "@/widgets/dashboard"

export const metadata: Metadata = {
  title: "대시보드",
  description: "오늘의 주문, 매출, 재고와 주요 운영 알림을 확인합니다.",
}

const Home = () => {
  return <DashboardOverview />
}

export default Home
