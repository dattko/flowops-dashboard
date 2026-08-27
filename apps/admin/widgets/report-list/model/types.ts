import type { OrderStatus } from "@/entities/order"

export type SalesReportPeriod = {
  dateFrom: string
  dateTo: string
}

export type SalesReportSummary = {
  totalOrders: number
  totalRevenue: number
  averageOrderValue: number
  cancelledOrders: number
}

export type DailySalesReport = {
  statDate: string
  orderCount: number
  grossRevenue: number
}

export type OrderStatusReport = {
  status: OrderStatus
  orderCount: number
}

export type TopProductReport = {
  productId: string | null
  productName: string
  quantity: number
  revenue: number
}

export type SalesReportResponse = {
  period: SalesReportPeriod
  summary: SalesReportSummary
  dailySales: DailySalesReport[]
  statusDistribution: OrderStatusReport[]
  topProducts: TopProductReport[]
}
