import { DashboardHeader } from "./dashboard-header"
import { MetricCards } from "./metric-cards"
import { OperationAlertsCard } from "./operation-alerts-card"
import { OperationStatusCard } from "./operation-status-card"
import { RecentOrdersTable } from "./recent-orders-table"
import { WeeklyOrdersCard } from "./weekly-orders-card"

export const DashboardPage = () => {
  return (
    <main className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8 xl:px-10">
      <DashboardHeader />
      <MetricCards />

      <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.75fr)]">
        <WeeklyOrdersCard />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <OperationStatusCard />
          <OperationAlertsCard />
        </div>
      </section>

      <RecentOrdersTable />
    </main>
  )
}
