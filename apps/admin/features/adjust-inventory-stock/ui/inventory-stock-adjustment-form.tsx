"use client"

import { ArrowDownToLine, Save } from "lucide-react"

import type { InventoryDetail } from "@/entities/inventory"
import { Button } from "@/shared/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import {
  FormMessage,
  InputText,
  InputTextarea,
  Select,
} from "@/shared/ui/form"

import { useInventoryStockAdjustmentForm } from "../lib/use-inventory-stock-adjustment-form"
import { INVENTORY_STOCK_ADJUSTMENT_OPTIONS } from "../model/constants"

type InventoryStockAdjustmentFormProps = {
  inventory: InventoryDetail
  onUpdated: (inventory: InventoryDetail) => void
}

const InventoryStockAdjustmentForm = ({
  inventory,
  onUpdated,
}: InventoryStockAdjustmentFormProps) => {
  const {
    form,
    submit,
    isSaving,
    successMessage,
    errorMessage,
  } = useInventoryStockAdjustmentForm({ inventory, onUpdated })
  const { errors } = form.formState

  return (
    <form onSubmit={submit}>
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center gap-2">
            <ArrowDownToLine
              className="size-4 text-primary"
              aria-hidden="true"
            />
            <CardTitle>재고 변경</CardTitle>
          </div>
          <CardDescription>
            입출고와 실사 조정은 저장 시 변경 이력에 기록됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Select
            label="변경 유형"
            options={INVENTORY_STOCK_ADJUSTMENT_OPTIONS}
            {...form.register("movementType")}
          />
          <InputText
            label="수량"
            type="number"
            min={0}
            description="실사 조정에서는 변경 후 실제 보유 수량을 입력합니다."
            error={errors.quantity?.message}
            {...form.register("quantity", {
              required: "수량을 입력해 주세요.",
              valueAsNumber: true,
              min: { value: 0, message: "0개 이상 입력해 주세요." },
            })}
          />
          <InputTextarea
            label="변경 사유"
            rows={3}
            containerClassName="sm:col-span-2"
            placeholder="예: 8월 정기 입고, 파손 상품 차감"
            error={errors.reason?.message}
            {...form.register("reason", {
              required: "재고 변경 사유를 입력해 주세요.",
            })}
          />
        </CardContent>
        <div className="flex flex-col items-start justify-between gap-3 border-t px-4 pt-4 sm:flex-row sm:items-center">
          <FormMessage
            errorMessage={errorMessage}
            successMessage={successMessage}
            defaultMessage={`현재 보유 ${inventory.onHand.toLocaleString()}개 · 예약 ${inventory.reserved.toLocaleString()}개`}
          />
          <Button type="submit" disabled={isSaving}>
            <Save aria-hidden="true" />
            {isSaving ? "반영 중..." : "재고 변경 저장"}
          </Button>
        </div>
      </Card>
    </form>
  )
}

export { InventoryStockAdjustmentForm }
