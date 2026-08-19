import {
  channelShare,
  metrics,
  operationAlerts,
  recentOrders,
  weeklyOrders,
} from "../data/mock-data"
import type { DashboardPeriod, DashboardSummary } from "../model/types"

export const getDashboardSummary = async (
  period: DashboardPeriod = "7d",
): Promise<DashboardSummary> => {
  // TODO: Supabase 연동 시 목 데이터 대신 집계 쿼리 결과를 반환합니다.
  return {
    period,
    metrics,
    weeklyOrders,
    channelShare,
    operationAlerts,
    recentOrders,
  }
}
