"use client"

import { MapPin, UserRound } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"

import type { OrderDetail } from "@/entities/order"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import { InputText } from "@/shared/ui/form"

import type { OrderDetailFormValues } from "../model/types"

type OrderInformationFormProps = {
  order: OrderDetail
  form: UseFormReturn<OrderDetailFormValues>
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

export const OrderInformationForm = ({
  order,
  form,
  onSubmit,
}: OrderInformationFormProps) => {
  const canEditCustomer = order.editableFields.includes("customer")
  const canEditShipping = order.editableFields.includes("shipping")
  const canEditTracking = order.editableFields.includes("tracking")

  return (
    <form id="order-detail-form" onSubmit={onSubmit} className="space-y-5">
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center gap-2">
            <UserRound className="size-4 text-primary" aria-hidden="true" />
            <CardTitle>주문자 정보</CardTitle>
          </div>
          <CardDescription>
            {canEditCustomer
              ? "현재 주문 상태에서는 주문자 정보를 수정할 수 있습니다."
              : "현재 주문 상태에서는 주문자 정보를 수정할 수 없습니다."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <InputText
            label="이름"
            disabled={!canEditCustomer}
            {...form.register("customerName", { required: true })}
          />
          <InputText
            label="연락처"
            disabled={!canEditCustomer}
            {...form.register("customerPhone")}
          />
          <InputText
            label="이메일"
            type="email"
            containerClassName="sm:col-span-2"
            disabled={!canEditCustomer}
            {...form.register("customerEmail")}
          />
        </CardContent>
      </Card>

      {order.shipping ? (
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" aria-hidden="true" />
              <CardTitle>배송 정보</CardTitle>
            </div>
            <CardDescription>
              배송지와 출고 정보를 확인하고 수정합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <InputText
              label="수령인"
              disabled={!canEditShipping}
              {...form.register("recipientName", { required: true })}
            />
            <InputText
              label="수령인 연락처"
              disabled={!canEditShipping}
              {...form.register("recipientPhone", { required: true })}
            />
            <InputText
              label="우편번호"
              disabled={!canEditShipping}
              {...form.register("postalCode", { required: true })}
            />
            <div className="hidden sm:block" />
            <InputText
              label="기본 주소"
              containerClassName="sm:col-span-2"
              disabled={!canEditShipping}
              {...form.register("addressLine1", { required: true })}
            />
            <InputText
              label="상세 주소"
              containerClassName="sm:col-span-2"
              disabled={!canEditShipping}
              {...form.register("addressLine2")}
            />
            <InputText
              label="배송 메모"
              containerClassName="sm:col-span-2"
              disabled={!canEditShipping}
              {...form.register("deliveryMemo")}
            />
            <InputText
              label="택배사"
              disabled={!canEditTracking}
              {...form.register("carrier")}
            />
            <InputText
              label="운송장 번호"
              disabled={!canEditTracking}
              {...form.register("trackingNumber")}
            />
          </CardContent>
        </Card>
      ) : null}
    </form>
  )
}
