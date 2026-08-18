import type {
  ChannelShare,
  DashboardMetric,
  OperationAlert,
  RecentOrder,
  WeeklyOrder,
} from "../model/types"

export const metrics = [
  {
    label: "오늘 주문",
    value: "142건",
    change: "+12.5%",
    detail: "어제보다 16건 증가",
    trend: "up",
    icon: "orders",
  },
  {
    label: "처리 대기",
    value: "18건",
    change: "-4건",
    detail: "오전 대비 감소",
    trend: "down",
    icon: "pending",
  },
  {
    label: "오늘 매출",
    value: "₩8,420,000",
    change: "+8.2%",
    detail: "목표의 84% 달성",
    trend: "up",
    icon: "revenue",
  },
  {
    label: "재고 위험",
    value: "6 SKU",
    change: "확인 필요",
    detail: "품절 2 · 부족 4",
    trend: "warning",
    icon: "stock",
  },
] as const satisfies readonly DashboardMetric[]

export const weeklyOrders = [
  { day: "월", orders: 98, revenue: 5.4 },
  { day: "화", orders: 124, revenue: 6.8 },
  { day: "수", orders: 112, revenue: 6.2 },
  { day: "목", orders: 156, revenue: 8.1 },
  { day: "금", orders: 138, revenue: 7.5 },
  { day: "토", orders: 184, revenue: 9.8 },
  { day: "일", orders: 142, revenue: 8.4 },
] as const satisfies readonly WeeklyOrder[]

export const channelShare = [
  { label: "스마트스토어", value: 48, color: "bg-[#c96d3a]" },
  { label: "자사몰", value: 31, color: "bg-[#3c8674]" },
  { label: "쿠팡", value: 21, color: "bg-[#d6b76d]" },
] as const satisfies readonly ChannelShare[]

export const operationAlerts = [
  {
    title: "제주 감귤 선물세트 재고 부족",
    description: "현재 8개 남음 · 평균 일 판매량 12개",
    tone: "warning",
  },
  {
    title: "배송 지연 주문 3건",
    description: "출고 예정 시간을 2시간 초과했어요",
    tone: "danger",
  },
] as const satisfies readonly OperationAlert[]

export const recentOrders = [
  {
    id: "FO-240727-0182",
    customer: "김서윤",
    product: "제주 감귤 선물세트 외 1건",
    channel: "스마트스토어",
    amount: "₩78,000",
    status: "결제완료",
    time: "14:32",
  },
  {
    id: "FO-240727-0181",
    customer: "박지훈",
    product: "프리미엄 견과 6종 세트",
    channel: "자사몰",
    amount: "₩54,000",
    status: "상품준비",
    time: "14:18",
  },
  {
    id: "FO-240727-0180",
    customer: "이민정",
    product: "유기농 레몬청 500ml 외 2건",
    channel: "쿠팡",
    amount: "₩42,500",
    status: "배송중",
    time: "13:56",
  },
  {
    id: "FO-240727-0179",
    customer: "최도현",
    product: "콜드브루 원액 세트",
    channel: "자사몰",
    amount: "₩36,000",
    status: "배송완료",
    time: "13:41",
  },
] as const satisfies readonly RecentOrder[]
