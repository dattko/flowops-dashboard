import type { ChartData, ChartOptions } from "chart.js"

import { formatWon } from "@/shared/lib/currency"
import { dayjs } from "@/shared/lib/dayjs"

import type { DailySales } from "../model/types"

export const useWeeklyOrdersChartConfig = (
  weeklySales: readonly DailySales[]
) => {
  const lastOrderIndex = weeklySales.length - 1

  const data: ChartData<"bar", number[], string> = {
    labels: weeklySales.map((dailySales) =>
      dayjs(dailySales.stat_date).format("dd")
    ),
    datasets: [
      {
        label: "주문 수",
        data: weeklySales.map((dailySales) => dailySales.order_count),
        backgroundColor: weeklySales.map((_, index) =>
          index === lastOrderIndex ? "#d7753f" : "#dfdcd3"
        ),
        hoverBackgroundColor: weeklySales.map((_, index) =>
          index === lastOrderIndex ? "#c56635" : "#cec9be"
        ),
        borderRadius: 6,
        borderSkipped: false,
        maxBarThickness: 40,
      },
    ],
  }

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    animation: {
      duration: 500,
    },
    layout: {
      padding: {
        top: 8,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#2a271f",
        bodyColor: "#f8f6f1",
        bodySpacing: 4,
        cornerRadius: 8,
        displayColors: false,
        padding: 12,
        titleColor: "#ffffff",
        callbacks: {
          title: (items) => {
            const dailySales = weeklySales[items[0]?.dataIndex]
            return dailySales
              ? dayjs(dailySales.stat_date).format("dddd")
              : ""
          },
          label: (context) => {
            const dailySales = weeklySales[context.dataIndex]

            if (!dailySales) return ""

            return [
              `주문 ${dailySales.order_count.toLocaleString()}건`,
              `매출 ${formatWon(dailySales.gross_revenue)}`,
            ]
          },
        },
      },
    },
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          color: "#7c776c",
          font: {
            size: 11,
            weight: 500,
          },
        },
      },
      y: {
        beginAtZero: true,
        border: {
          display: false,
        },
        grid: {
          color: "#eeece6",
        },
        ticks: {
          color: "#9a958a",
          precision: 0,
          font: {
            size: 10,
          },
        },
      },
    },
  }

  return { data, options }
}
