const wonFormatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  maximumFractionDigits: 0,
})

export const formatWon = (amount: number) => {
  return wonFormatter.format(amount)
}
