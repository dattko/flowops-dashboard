import dayjs from "dayjs"
import "dayjs/locale/ko"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")
dayjs.tz.setDefault("Asia/Seoul")

const formatDateTime = (date: string | null) => {
  return date ? dayjs(date).tz().format("YYYY.MM.DD HH:mm") : "-"
}

export { dayjs, formatDateTime }
