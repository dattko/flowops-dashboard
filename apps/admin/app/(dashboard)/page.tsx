import { getDashboard } from "@/entities/dashboard"
import {
  DashboardHeader,
  MetricCards,
  OperationAlertsCard,
  OperationStatusCard,
  RecentOrdersTable,
  WeeklyOrdersCard,
} from "@/widgets/dashboard"

const Home = async () => {
  const dashboardData = await getDashboard()
  const {
    todaySummary: todayOrderSummary,
    inventorySummary: inventoryRiskSummary,
    weeklyRows: weeklySales,
    weeklySummary: weeklyOrderSummary,
    channelRows: salesChannelShares,
    riskInventoryRows: lowStockProducts,
    recentOrderRows: recentOrders,
  } = dashboardData

  return (
    <main className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8 xl:px-10">
      <DashboardHeader />
      <MetricCards
        todayOrderSummary={todayOrderSummary}
        inventoryRiskSummary={inventoryRiskSummary}
      />

      <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.75fr)]">
        <WeeklyOrdersCard
          weeklySales={weeklySales}
          weeklyOrderSummary={weeklyOrderSummary}
          salesChannelShares={salesChannelShares}
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <OperationStatusCard todayOrderSummary={todayOrderSummary} />
          <OperationAlertsCard lowStockProducts={lowStockProducts} />
        </div>
      </section>

      <RecentOrdersTable recentOrders={recentOrders} />
    </main>
  )
}

export default Home
