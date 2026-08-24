"use client"

import type { OrderDetail as OrderDetailData } from "@/entities/order"
import { OrderConsultationNote } from "@/features/add-order-consultation-note"
import {
  OrderInformationForm,
  OrderProcessing,
  useUpdateOrderDetail,
} from "@/features/update-order-detail"

import { OrderDetailHeader } from "./order-detail-header"
import { OrderItemsCard } from "./order-items-card"
import { OrderPaymentCard } from "./order-payment-card"
import { OrderStatusHistory } from "./order-status-history"

type OrderDetailProps = {
  initialOrder: OrderDetailData
}

export const OrderDetail = ({ initialOrder }: OrderDetailProps) => {
  const {
    order,
    form,
    submit,
    isSaving,
    successMessage,
    errorMessage,
  } = useUpdateOrderDetail(initialOrder)

  return (
    <section aria-labelledby="order-detail-title">
      <OrderDetailHeader order={order} />

      <div className="mt-6 grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-5">
          <OrderItemsCard
            items={order.items}
            totalAmount={order.totalAmount}
          />
          <OrderInformationForm order={order} form={form} onSubmit={submit} />
          <OrderPaymentCard payment={order.payment} />
        </div>

        <aside className="space-y-5 xl:sticky xl:top-8">
          <OrderProcessing
            order={order}
            form={form}
            isSaving={isSaving}
            successMessage={successMessage}
            errorMessage={errorMessage}
          />
          <OrderConsultationNote
            orderId={order.id}
            initialNotes={initialOrder.consultationNotes}
          />
          <OrderStatusHistory statusHistory={order.statusHistory} />
        </aside>
      </div>
    </section>
  )
}
