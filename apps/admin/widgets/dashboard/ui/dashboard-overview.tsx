import { getDashboard } from "../api/get-dashboard"
import { DashboardHeader } from "./dashboard-header"
import { MetricCards } from "./metric-cards"
import { OperationAlertsCard } from "./operation-alerts-card"
import { OperationStatusCard } from "./operation-status-card"
import { RecentOrdersTable } from "./recent-orders-table"
import { WeeklyOrdersCard } from "./weekly-orders-card"

export const DashboardOverview = async () => {
  const {
    todaySummary: todayOrderSummary,
    inventorySummary: inventoryRiskSummary,
    weeklyRows: weeklySales,
    weeklySummary: weeklyOrderSummary,
    riskInventoryRows: lowStockProducts,
    recentOrderRows: recentOrders,
  } = await getDashboard()

  return (
    <>
      <DashboardHeader />
      <MetricCards
        todayOrderSummary={todayOrderSummary}
        inventoryRiskSummary={inventoryRiskSummary}
      />

      <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.75fr)]">
        <WeeklyOrdersCard
          weeklySales={weeklySales}
          weeklyOrderSummary={weeklyOrderSummary}
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <OperationStatusCard todayOrderSummary={todayOrderSummary} />
          <OperationAlertsCard lowStockProducts={lowStockProducts} />
        </div>
      </section>

      <RecentOrdersTable recentOrders={recentOrders} />
    </>
  )
}
