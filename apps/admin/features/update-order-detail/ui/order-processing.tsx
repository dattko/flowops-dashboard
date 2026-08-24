"use client"

import { Save } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"

import { ORDER_STATUS_LABELS, type OrderDetail } from "@/entities/order"
import { Button } from "@/shared/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import { Select } from "@/shared/ui/form"
import { Typography } from "@/shared/ui/typography"

import type { OrderDetailFormValues } from "../model/types"

type OrderProcessingProps = {
  order: OrderDetail
  form: UseFormReturn<OrderDetailFormValues>
  isSaving: boolean
  successMessage: string | null
  errorMessage: string | null
}

export const OrderProcessing = ({
  order,
  form,
  isSaving,
  successMessage,
  errorMessage,
}: OrderProcessingProps) => {
  const canEditStatus = order.editableFields.includes("status")
  const canEditOrder = order.editableFields.length > 0
  const statusOptions = [order.status, ...order.availableStatuses].map(
    (status) => ({
      label: ORDER_STATUS_LABELS[status],
      value: status,
    })
  )

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>주문 처리</CardTitle>
        <CardDescription>가능한 다음 상태만 선택할 수 있습니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <Select
          label="주문 상태"
          options={statusOptions}
          disabled={!canEditStatus}
          form="order-detail-form"
          {...form.register("status")}
        />
        {!canEditOrder ? (
          <Typography variant="caption" tone="muted" className="mt-3">
            처리 완료된 주문은 더 이상 수정할 수 없습니다.
          </Typography>
        ) : null}
        {errorMessage ? (
          <Typography
            variant="caption"
            tone="destructive"
            className="mt-3"
            role="alert"
          >
            {errorMessage}
          </Typography>
        ) : successMessage ? (
          <Typography
            variant="caption"
            tone="success"
            className="mt-3"
            role="status"
          >
            {successMessage}
          </Typography>
        ) : null}
        <Button
          type="submit"
          form="order-detail-form"
          className="mt-4 w-full"
          disabled={!canEditOrder || isSaving}
        >
          <Save aria-hidden="true" />
          {isSaving ? "저장 중..." : "변경사항 저장"}
        </Button>
      </CardContent>
    </Card>
  )
}
