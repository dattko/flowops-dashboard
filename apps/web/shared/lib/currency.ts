const wonFormatter = new Intl.NumberFormat("ko-KR")

export const formatWon = (amount: number) => {
  return `${wonFormatter.format(amount)}원`
}
