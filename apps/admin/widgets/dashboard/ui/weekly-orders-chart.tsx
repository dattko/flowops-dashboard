"use client"

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js"
import { Bar } from "react-chartjs-2"

import type { DailySales } from "@/entities/dashboard"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

type WeeklyOrdersChartProps = {
  weeklySales: readonly DailySales[]
}

const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"]

const getDayLabel = (date: string) => {
  return DAY_LABELS[new Date(`${date}T00:00:00`).getDay()] ?? "-"
}

export const WeeklyOrdersChart = ({ weeklySales }: WeeklyOrdersChartProps) => {
  const lastOrderIndex = weeklySales.length - 1

  const data: ChartData<"bar", number[], string> = {
    labels: weeklySales.map((dailySales) => getDayLabel(dailySales.stat_date)),
    datasets: [
      {
        label: "주문 수",
        data: weeklySales.map((dailySales) => dailySales.order_count),
        backgroundColor: weeklySales.map((_, index) =>
          index === lastOrderIndex ? "#d7753f" : "#dfdcd3",
        ),
        hoverBackgroundColor: weeklySales.map((_, index) =>
          index === lastOrderIndex ? "#c56635" : "#cec9be",
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
            return dailySales ? `${getDayLabel(dailySales.stat_date)}요일` : ""
          },
          label: (context) => {
            const dailySales = weeklySales[context.dataIndex]

            if (!dailySales) {
              return ""
            }

            return [
              `주문 ${dailySales.order_count.toLocaleString()}건`,
              `매출 ${Number((dailySales.gross_revenue / 1_000_000).toFixed(1))}백만원`,
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
