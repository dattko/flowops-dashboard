export type DailySales = {
  stat_date: string
  order_count: number
  gross_revenue: number
}

export type SalesChannelShare = {
  code: string
  name: string
  share_percent: number
}

export type LowStockProduct = {
  available: number
  reorder_point: number
  product_name: string
}

export type RecentOrder = {
  order_number: string
  customer_name: string
  status: string
  total_amount: number
  ordered_at: string
  channel_name: string
  order_items: { product_name: string }[]
}

export type DashboardData = {
  weeklyRows: DailySales[]
  weeklySummary: {
    totalOrders: number
    changeRate: number | null
  }
  channelRows: SalesChannelShare[]
  riskInventoryRows: LowStockProduct[]
  inventorySummary: {
    riskCount: number
    soldOutCount: number
  }
  todaySummary: {
    totalOrders: number
    todayRevenue: number
    pendingCount: number
    completedCount: number
    shippingCount: number
    completionRate: number
    orderChangeRate: number | null
    revenueChangeRate: number | null
    pendingChangeCount: number
  }
  recentOrderRows: RecentOrder[]
}
