"use client"

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from "chart.js"
import { Bar } from "react-chartjs-2"

import { useWeeklyOrdersChartConfig } from "../lib/use-weekly-orders-chart-config"
import type { DailySales } from "../model/types"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

type WeeklyOrdersChartProps = {
  weeklySales: readonly DailySales[]
}

export const WeeklyOrdersChart = ({ weeklySales }: WeeklyOrdersChartProps) => {
  const { data, options } = useWeeklyOrdersChartConfig(weeklySales)

  return (
    <div
      className="mt-8 h-48"
      role="img"
      aria-label="월요일부터 일요일까지 주간 주문량 막대 차트"
    >
      <Bar data={data} options={options} />
    </div>
  )
}
