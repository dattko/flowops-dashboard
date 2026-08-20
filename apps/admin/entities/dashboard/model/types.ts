export type DailySales = {
  stat_date: string
  order_count: number
  gross_revenue: number
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
  order_items: { product_name: string }[]
}

export type DashboardData = {
  weeklyRows: DailySales[]
  weeklySummary: {
    totalOrders: number
    changeRate: number | null
  }
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
