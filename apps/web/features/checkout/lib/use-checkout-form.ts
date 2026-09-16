"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { ROUTES } from "@/shared/config/routes"
import { getApiErrorMessage } from "@/shared/api/base/utils"

import { createTestOrder } from "../api/checkout-client.api"
import {
  checkoutSchema,
  type CheckoutCustomer,
  type CheckoutItem,
  type CheckoutValues,
} from "../model/checkout-schema"

type UseCheckoutFormOptions = {
  initialCustomer: CheckoutCustomer
  items: CheckoutItem[]
  onOrderCreated: () => void
}

const useCheckoutForm = ({
  initialCustomer,
  items,
  onOrderCreated,
}: UseCheckoutFormOptions) => {
  const router = useRouter()
  const [requestId] = useState(() => crypto.randomUUID())
  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      ...initialCustomer,
      paymentMethod: "card",
      testPaymentConfirmed: false,
    },
  })
  const mutation = useMutation({
    mutationFn: (values: CheckoutValues) =>
      createTestOrder({ requestId, items, values }),
    onSuccess: (order) => {
      onOrderCreated()
      router.replace(ROUTES.orders.complete(order.orderNumber))
    },
    onError: (error: unknown) => {
      form.setError("root", { message: getApiErrorMessage(error) })
    },
  })
  const submit = form.handleSubmit((values) => {
    if (items.length === 0) {
      form.setError("root", { message: "장바구니에 상품을 먼저 담아주세요." })
      return
    }

    form.clearErrors("root")
    mutation.mutate(values)
  })

  return {
    form,
    submit,
    isPaying: mutation.isPending,
  }
}

export { useCheckoutForm }
