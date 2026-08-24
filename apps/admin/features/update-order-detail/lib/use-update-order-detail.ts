"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import type { OrderDetail } from "@/entities/order"
import { getApiErrorMessage } from "@/shared/api/base/utils"

import { updateOrderDetail } from "../api/order-detail-client.api"
import type {
  OrderDetailFormValues,
  UpdateOrderDetailValues,
} from "../model/types"

const getFormValues = (order: OrderDetail): OrderDetailFormValues => ({
  status: order.status,
  customerName: order.customer.name,
  customerEmail: order.customer.email ?? "",
  customerPhone: order.customer.phone ?? "",
  recipientName: order.shipping?.recipientName ?? "",
  recipientPhone: order.shipping?.recipientPhone ?? "",
  postalCode: order.shipping?.postalCode ?? "",
  addressLine1: order.shipping?.addressLine1 ?? "",
  addressLine2: order.shipping?.addressLine2 ?? "",
  deliveryMemo: order.shipping?.deliveryMemo ?? "",
  carrier: order.shipping?.carrier ?? "",
  trackingNumber: order.shipping?.trackingNumber ?? "",
})

const getUpdatePayload = (
  order: OrderDetail,
  values: OrderDetailFormValues
): UpdateOrderDetailValues => {
  const payload: UpdateOrderDetailValues = {}

  if (order.editableFields.includes("status") && values.status !== order.status) {
    payload.status = values.status
  }

  if (order.editableFields.includes("customer")) {
    payload.customerName = values.customerName
    payload.customerEmail = values.customerEmail || null
    payload.customerPhone = values.customerPhone || null
  }

  if (order.editableFields.includes("shipping")) {
    payload.recipientName = values.recipientName
    payload.recipientPhone = values.recipientPhone
    payload.postalCode = values.postalCode
    payload.addressLine1 = values.addressLine1
    payload.addressLine2 = values.addressLine2 || null
    payload.deliveryMemo = values.deliveryMemo || null
  }

  if (order.editableFields.includes("tracking")) {
    payload.carrier = values.carrier || null
    payload.trackingNumber = values.trackingNumber || null
  }

  return payload
}

export const useUpdateOrderDetail = (initialOrder: OrderDetail) => {
  const queryClient = useQueryClient()
  const [order, setOrder] = useState(initialOrder)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const form = useForm<OrderDetailFormValues>({
    defaultValues: getFormValues(initialOrder),
  })
  const mutation = useMutation({
    mutationFn: (values: UpdateOrderDetailValues) =>
      updateOrderDetail(order.id, values),
    onSuccess: (updatedOrder) => {
      setOrder(updatedOrder)
      form.reset(getFormValues(updatedOrder))
      setSuccessMessage("주문 정보가 저장되었습니다.")
      void queryClient.invalidateQueries({ queryKey: ["orders", "list"] })
    },
  })
  const submit = form.handleSubmit((values) => {
    setSuccessMessage(null)
    mutation.mutate(getUpdatePayload(order, values))
  })

  return {
    order,
    form,
    submit,
    isSaving: mutation.isPending,
    successMessage,
    errorMessage: mutation.error ? getApiErrorMessage(mutation.error) : null,
  }
}
