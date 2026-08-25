"use client"

import { Package, Save } from "lucide-react"

import {
  PRODUCT_STATUS_OPTIONS,
  type InventoryDetail,
} from "@/entities/inventory"
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

import { useInventoryProductUpdateForm } from "../lib/use-inventory-product-update-form"

type InventoryProductUpdateFormProps = {
  inventory: InventoryDetail
  onUpdated: (inventory: InventoryDetail) => void
}

const InventoryProductUpdateForm = ({
  inventory,
  onUpdated,
}: InventoryProductUpdateFormProps) => {
  const {
    form,
    submit,
    isSaving,
    successMessage,
    errorMessage,
  } = useInventoryProductUpdateForm({ inventory, onUpdated })
  const { errors } = form.formState

  return (
    <form onSubmit={submit}>
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center gap-2">
            <Package className="size-4 text-primary" aria-hidden="true" />
            <CardTitle>상품 정보</CardTitle>
          </div>
          <CardDescription>
            상품명, 판매 가격과 노출 상태를 관리합니다. SKU {inventory.sku}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <InputText
            label="상품명"
            containerClassName="sm:col-span-2"
            error={errors.name?.message}
            {...form.register("name", {
              required: "상품명을 입력해 주세요.",
            })}
          />
          <InputTextarea
            label="상품 설명"
            containerClassName="sm:col-span-2"
            rows={4}
            {...form.register("description")}
          />
          <InputText
            label="판매 가격"
            type="number"
            min={0}
            error={errors.price?.message}
            {...form.register("price", {
              required: "판매 가격을 입력해 주세요.",
              valueAsNumber: true,
              min: { value: 0, message: "0원 이상 입력해 주세요." },
            })}
          />
          <Select
            label="상품 상태"
            options={PRODUCT_STATUS_OPTIONS}
            {...form.register("productStatus")}
          />
          <InputText
            label="안전 재고"
            type="number"
            min={0}
            description="이 수량 이하가 되면 재고 부족으로 표시합니다."
            error={errors.reorderPoint?.message}
            {...form.register("reorderPoint", {
              required: "안전 재고를 입력해 주세요.",
              valueAsNumber: true,
              min: { value: 0, message: "0개 이상 입력해 주세요." },
            })}
          />
        </CardContent>
        <div className="flex flex-col items-start justify-between gap-3 border-t px-4 pt-4 sm:flex-row sm:items-center">
          <FormMessage
            errorMessage={errorMessage}
            successMessage={successMessage}
            defaultMessage="SKU와 현재 재고는 이 영역에서 변경하지 않습니다."
          />
          <Button type="submit" disabled={isSaving}>
            <Save aria-hidden="true" />
            {isSaving ? "저장 중..." : "상품 정보 저장"}
          </Button>
        </div>
      </Card>
    </form>
  )
}

export { InventoryProductUpdateForm }
