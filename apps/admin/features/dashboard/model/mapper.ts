import type { WeeklyOrder } from "./types"

export const getTotalOrders = (orders: readonly WeeklyOrder[]) => {
  return orders.reduce((total, item) => total + item.orders, 0)
}
