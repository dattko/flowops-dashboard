import {
  STOREFRONT_ORDER_STATUS_LABELS,
  type CustomerOrderStatusHistory,
} from "@/entities/order"
import { formatKoreanDateTime } from "@/shared/lib/date"

type OrderStatusTimelineProps = {
  history: CustomerOrderStatusHistory[]
}

const OrderStatusTimeline = ({ history }: OrderStatusTimelineProps) => (
  <section
    className="rounded-[1.5rem] border border-ink/10 bg-paper p-5 sm:p-7"
    aria-labelledby="order-status-title"
  >
    <h2 id="order-status-title" className="text-lg font-semibold">
      주문 진행 상황
    </h2>
    <ol className="mt-5 space-y-0">
      {history.map((item, index) => (
        <li key={item.id} className="relative grid grid-cols-[1rem_1fr] gap-4 pb-6 last:pb-0">
          {index < history.length - 1 ? (
            <span
              className="absolute left-[0.4375rem] top-4 h-[calc(100%-0.5rem)] w-px bg-coffee/20"
              aria-hidden="true"
            />
          ) : null}
          <span className="relative mt-1.5 size-3 rounded-full border-[3px] border-paper bg-coffee ring-1 ring-coffee/30" aria-hidden="true" />
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-semibold">{STOREFRONT_ORDER_STATUS_LABELS[item.status]}</p>
              <time className="text-xs text-ink/50" dateTime={item.changedAt}>
                {formatKoreanDateTime(item.changedAt)}
              </time>
            </div>
            {item.note ? <p className="mt-1 text-sm text-ink/60">{item.note}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  </section>
)

export { OrderStatusTimeline }
