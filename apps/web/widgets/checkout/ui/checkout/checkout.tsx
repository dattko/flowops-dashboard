"use client"

import { CreditCard, LoaderCircle, MapPin, TestTube2 } from "lucide-react"
import Link from "next/link"

import { ShippingAddressFields } from "@/entities/customer"
import { useCart } from "@/features/cart"
import {
  type CheckoutCustomer,
  useCheckoutForm,
} from "@/features/checkout"
import { ROUTES } from "@/shared/config/routes"
import { Button, buttonVariants } from "@/shared/ui/button"
import {
  FormCheckbox,
  FormMessage,
  FormSelect,
  InputText,
} from "@/shared/ui/form"
import { Typography } from "@/shared/ui/typography"

import { CheckoutOrderSummary } from "./checkout-order-summary"

const PAYMENT_OPTIONS = [
  { value: "card", label: "테스트 카드" },
  { value: "kakao_pay", label: "테스트 카카오페이" },
] as const

type CheckoutProps = {
  initialCustomer: CheckoutCustomer
}

const Checkout = ({ initialCustomer }: CheckoutProps) => {
  const {
    hasHydrated,
    items,
    subtotal,
    shippingFee,
    total,
    clearCart,
  } = useCart()
  const { form, submit, isPaying } = useCheckoutForm({
    initialCustomer,
    items: items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
    onOrderCreated: clearCart,
  })
  const { errors } = form.formState

  if (!hasHydrated) {
    return (
      <div
        className="min-h-[34rem] animate-pulse bg-cream/45"
        aria-label="주문 정보를 불러오는 중입니다."
      />
    )
  }

  if (items.length === 0) {
    return (
      <section className="px-5 py-20 text-center sm:px-8 lg:px-12">
        <Typography as="h1" variant="sectionTitle">
          주문할 상품이 없어요
        </Typography>
        <Typography tone="muted" className="mt-4">
          장바구니에 원하는 커피를 먼저 담아주세요.
        </Typography>
        <Link
          href={ROUTES.products.list}
          className={`${buttonVariants({ variant: "brand", size: "lg" })} mt-8`}
        >
          상품 둘러보기
        </Link>
      </section>
    )
  }

  return (
    <section className="bg-paper px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <Typography variant="overline" tone="brand">
          TEST CHECKOUT
        </Typography>
        <Typography as="h1" variant="sectionTitle" className="mt-3">
          주문서
        </Typography>
        <Typography tone="muted" className="mt-3">
          배송 정보를 확인하고 포트폴리오용 테스트 결제를 진행해 주세요.
        </Typography>

        <form
          className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-start"
          onSubmit={submit}
          noValidate
          aria-busy={isPaying}
        >
          <div className="space-y-8">
            <section
              className="rounded-[1.75rem] border border-ink/10 p-6 sm:p-8"
              aria-labelledby="checkout-shipping-title"
            >
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-coffee/10 text-coffee">
                  <MapPin className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <h2
                    id="checkout-shipping-title"
                    className="text-lg font-semibold"
                  >
                    배송 정보
                  </h2>
                  <p className="mt-1 text-xs text-ink/50">
                    기본 배송지를 불러왔어요. 이번 주문에서만 변경할 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <InputText
                    id="checkout-recipient-name"
                    label="받는 분"
                    autoComplete="name"
                    error={errors.recipientName?.message}
                    {...form.register("recipientName")}
                  />
                  <InputText
                    id="checkout-recipient-phone"
                    label="휴대폰 번호"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="010-0000-0000"
                    error={errors.recipientPhone?.message}
                    {...form.register("recipientPhone")}
                  />
                </div>
                <ShippingAddressFields
                  postalCode={{
                    id: "checkout-postal-code",
                    error: errors.postalCode?.message,
                    ...form.register("postalCode"),
                  }}
                  addressLine1={{
                    id: "checkout-address-line1",
                    error: errors.addressLine1?.message,
                    ...form.register("addressLine1"),
                  }}
                  addressLine2={{
                    id: "checkout-address-line2",
                    error: errors.addressLine2?.message,
                    ...form.register("addressLine2"),
                  }}
                  deliveryMessage={{
                    id: "checkout-delivery-message",
                    error: errors.deliveryMessage?.message,
                    ...form.register("deliveryMessage"),
                  }}
                />
              </div>
            </section>

            <section
              className="rounded-[1.75rem] border border-ink/10 p-6 sm:p-8"
              aria-labelledby="checkout-payment-title"
            >
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-leaf/10 text-leaf">
                  <CreditCard className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <h2
                    id="checkout-payment-title"
                    className="text-lg font-semibold"
                  >
                    테스트 결제
                  </h2>
                  <p className="mt-1 text-xs text-ink/50">
                    실제 카드 승인이나 금액 청구 없이 주문 데이터만 생성합니다.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <FormSelect
                  control={form.control}
                  name="paymentMethod"
                  label="결제 수단"
                  options={PAYMENT_OPTIONS}
                  disabled={isPaying}
                />
                <div className="rounded-2xl bg-mustard/15 p-4 text-xs leading-5 text-ink/65">
                  <p className="flex items-start gap-2 font-medium text-ink">
                    <TestTube2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    포트폴리오 테스트 모드
                  </p>
                  <p className="mt-2 pl-6">
                    테스트 승인번호가 발급되고 관리자 주문 목록에는 결제 완료
                    주문으로 표시됩니다.
                  </p>
                </div>
                <FormCheckbox
                  control={form.control}
                  name="testPaymentConfirmed"
                  label="실제 결제가 아닌 테스트 결제임을 확인했습니다."
                  disabled={isPaying}
                />
              </div>
            </section>

            <FormMessage errorMessage={errors.root?.message} />

            <Button
              type="submit"
              variant="brand"
              size="lg"
              className="w-full"
              disabled={isPaying}
            >
              {isPaying && (
                <LoaderCircle className="animate-spin" aria-hidden="true" />
              )}
              {isPaying ? "테스트 결제 승인 중..." : "테스트 결제하기"}
            </Button>
          </div>

          <CheckoutOrderSummary
            items={items}
            subtotal={subtotal}
            shippingFee={shippingFee}
            total={total}
          />
        </form>
      </div>
    </section>
  )
}

export { Checkout }
