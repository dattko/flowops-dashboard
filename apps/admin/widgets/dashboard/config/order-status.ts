export const ORDER_STATUS: Record<string, { label: string; className: string }> = {
  paid: { label: "결제완료", className: "bg-warning/10 text-warning" },
  preparing: { label: "상품준비", className: "bg-warning/10 text-warning" },
  shipping: { label: "배송중", className: "bg-success/10 text-success" },
  delivered: { label: "배송완료", className: "bg-muted text-muted-foreground" },
}
