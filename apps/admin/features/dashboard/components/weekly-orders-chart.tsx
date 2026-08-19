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

import type { WeeklyOrder } from "@/features/dashboard/model/types"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

type WeeklyOrdersChartProps = {
  orders: readonly WeeklyOrder[]
}

export const WeeklyOrdersChart = ({ orders }: WeeklyOrdersChartProps) => {
  const lastOrderIndex = orders.length - 1

  const data: ChartData<"bar", number[], string> = {
    labels: orders.map((item) => item.day),
    datasets: [
      {
        label: "주문 수",
        data: orders.map((item) => item.orders),
        backgroundColor: orders.map((_, index) =>
          index === lastOrderIndex ? "#d7753f" : "#dfdcd3",
        ),
        hoverBackgroundColor: orders.map((_, index) =>
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
            const item = orders[items[0]?.dataIndex]
            return item ? `${item.day}요일` : ""
          },
          label: (context) => {
            const item = orders[context.dataIndex]

            if (!item) {
              return ""
            }

            return [`주문 ${item.orders.toLocaleString()}건`, `매출 ${item.revenue}백만원`]
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
