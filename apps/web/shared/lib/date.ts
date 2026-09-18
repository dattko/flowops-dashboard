const koreanDateTimeFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Seoul",
})

const koreanDateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Seoul",
})

const formatKoreanDateTime = (value: string | Date) =>
  koreanDateTimeFormatter.format(new Date(value))

const formatKoreanDate = (value: string | Date) =>
  koreanDateFormatter.format(new Date(value))

export { formatKoreanDate, formatKoreanDateTime }
