"use client"

import Link from "next/link"
import { ArrowLeft, PackagePlus, Save } from "lucide-react"

import { PRODUCT_STATUS_OPTIONS } from "@/entities/inventory"
import { ROUTES } from "@/shared/config/routes"
import { buttonVariants, Button } from "@/shared/ui/button"
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
import { PageHeader } from "@/shared/ui/page-header"

import { useInventoryProductCreateForm } from "../lib/use-inventory-product-create-form"

const InventoryProductCreateForm = () => {
  const { form, submit, isCreating, errorMessage } =
    useInventoryProductCreateForm()
  const { errors } = form.formState

  return (
    <section aria-labelledby="inventory-create-title">
      <Link
        href={ROUTES.inventory.list}
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "-ml-3 mb-4 text-muted-foreground",
        })}
      >
        <ArrowLeft aria-hidden="true" />
        재고 목록
      </Link>

      <PageHeader
        titleId="inventory-create-title"
        title="상품 등록"
        description="상품 정보와 최초 재고를 함께 등록합니다. SKU는 등록 후 변경할 수 없습니다."
      />

      <form onSubmit={submit} className="mt-6 space-y-5">
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center gap-2">
              <PackagePlus className="size-4 text-primary" aria-hidden="true" />
              <CardTitle>상품 정보</CardTitle>
            </div>
            <CardDescription>
              자사몰에 판매할 상품의 기본 정보를 입력합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <InputText
              label="SKU"
              placeholder="MC-BEAN-EXAMPLE-200"
              error={errors.sku?.message}
              {...form.register("sku", {
                required: "SKU를 입력해 주세요.",
                pattern: {
                  value: /^[A-Za-z0-9-]+$/,
                  message: "영문, 숫자, 하이픈만 사용할 수 있습니다.",
                },
              })}
            />
            <Select
              label="상품 상태"
              options={PRODUCT_STATUS_OPTIONS}
              {...form.register("productStatus")}
            />
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
              description="원 단위로 입력합니다."
              error={errors.price?.message}
              {...form.register("price", {
                required: "판매 가격을 입력해 주세요.",
                valueAsNumber: true,
                min: { value: 0, message: "0원 이상 입력해 주세요." },
              })}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <CardTitle>최초 재고</CardTitle>
            <CardDescription>
              예약 재고는 주문에 따라 자동 관리되며 최초 등록값은 0개입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <InputText
              label="보유 재고"
              type="number"
              min={0}
              error={errors.onHand?.message}
              {...form.register("onHand", {
                required: "보유 재고를 입력해 주세요.",
                valueAsNumber: true,
                min: { value: 0, message: "0개 이상 입력해 주세요." },
              })}
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
        </Card>

        <div className="flex flex-col items-start justify-between gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center">
          <FormMessage
            errorMessage={errorMessage}
            defaultMessage="등록 후 재고 상세 화면으로 이동합니다."
          />
          <div className="flex gap-2 self-end sm:self-auto">
            <Link
              href={ROUTES.inventory.list}
              className={buttonVariants({ variant: "outline" })}
            >
              취소
            </Link>
            <Button type="submit" disabled={isCreating}>
              <Save aria-hidden="true" />
              {isCreating ? "등록 중..." : "상품 등록"}
            </Button>
          </div>
        </div>
      </form>
    </section>
  )
}

export { InventoryProductCreateForm }
