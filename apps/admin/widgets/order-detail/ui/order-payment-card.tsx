import { CreditCard } from "lucide-react"

import {
  ORDER_PAYMENT_METHOD_LABELS,
  ORDER_PAYMENT_STATUS_LABELS,
  type OrderPayment,
} from "@/entities/order"
import { formatWon } from "@/shared/lib/currency"
import { formatDateTime } from "@/shared/lib/dayjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Typography } from "@/shared/ui/typography"

const DetailRow = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => {
  return (
    <div className="grid grid-cols-[108px_1fr] gap-4 border-b border-border/70 py-3 last:border-b-0">
      <dt className="type-label text-muted-foreground">{label}</dt>
      <dd className="type-body-small min-w-0 break-words text-foreground">
        {children}
      </dd>
    </div>
  )
}

export const OrderPaymentCard = ({
  payment,
}: {
  payment: OrderPayment | null
}) => {
  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center gap-2">
          <CreditCard className="size-4 text-primary" aria-hidden="true" />
          <CardTitle>결제 정보</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {payment ? (
          <dl>
            <DetailRow label="결제 상태">
              {ORDER_PAYMENT_STATUS_LABELS[payment.status]}
            </DetailRow>
            <DetailRow label="결제 수단">
              {ORDER_PAYMENT_METHOD_LABELS[payment.method]}
            </DetailRow>
            <DetailRow label="상품 금액">{formatWon(payment.productAmount)}</DetailRow>
            <DetailRow label="할인 금액">-{formatWon(payment.discountAmount)}</DetailRow>
            <DetailRow label="배송비">{formatWon(payment.shippingFee)}</DetailRow>
            <DetailRow label="최종 결제 금액">
              <strong>{formatWon(payment.paidAmount)}</strong>
            </DetailRow>
            <DetailRow label="승인 번호">{payment.transactionId ?? "-"}</DetailRow>
            <DetailRow label="결제 일시">{formatDateTime(payment.paidAt)}</DetailRow>
          </dl>
        ) : (
          <Typography variant="bodySmall" tone="muted">
            결제 정보가 없습니다.
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
