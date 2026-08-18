export type DashboardPeriod = "7d" | "30d" | "90d"

export type DashboardMetric = {
  label: string
  value: string
  change: string
  detail: string
  trend: "up" | "down" | "warning"
  icon: "orders" | "pending" | "revenue" | "stock"
}

export type WeeklyOrder = {
  day: string
  orders: number
  revenue: number
}

export type ChannelShare = {
  label: string
  value: number
  color: string
}

export type OperationAlert = {
  title: string
  description: string
  tone: "warning" | "danger"
}

export type OrderStatus = "결제완료" | "상품준비" | "배송중" | "배송완료"

export type RecentOrder = {
  id: string
  customer: string
  product: string
  channel: string
  amount: string
  status: OrderStatus
  time: string
}

export type DashboardSummary = {
  period: DashboardPeriod
  metrics: readonly DashboardMetric[]
  weeklyOrders: readonly WeeklyOrder[]
  channelShare: readonly ChannelShare[]
  operationAlerts: readonly OperationAlert[]
  recentOrders: readonly RecentOrder[]
}
