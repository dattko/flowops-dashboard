import type { RecentOrder } from "../model/types"

const getProductSummary = (items: RecentOrder["order_items"]) => {
  const firstItem = items[0]

  if (!firstItem) return "상품 정보 없음"

  return items.length > 1
    ? `${firstItem.product_name} 외 ${items.length - 1}건`
    : firstItem.product_name
}

export const useRecentOrders = (recentOrders: readonly RecentOrder[]) => {
  return recentOrders.map((order) => ({
    ...order,
    productSummary: getProductSummary(order.order_items),
  }))
}
