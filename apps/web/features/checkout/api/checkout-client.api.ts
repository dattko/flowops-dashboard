"use client"

import type { StorefrontOrder } from "@/entities/order"
import { baseApiFetcherClient } from "@/shared/api/base/base-fetcher-client"

import type { CheckoutItem, CheckoutValues } from "../model/checkout-schema"

type CreateTestOrderInput = {
  requestId: string
  items: CheckoutItem[]
  values: CheckoutValues
}

const createTestOrder = ({
  requestId,
  items,
  values,
}: CreateTestOrderInput) =>
  baseApiFetcherClient.post<StorefrontOrder>(
    "/rest/v1/rpc/create_test_storefront_order",
    {
      p_request_id: requestId,
      p_payload: {
        recipientName: values.recipientName,
        recipientPhone: values.recipientPhone,
        postalCode: values.postalCode,
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2 || null,
        deliveryMemo: values.deliveryMessage || null,
        paymentMethod: values.paymentMethod,
        items,
      },
    },
  )

export { createTestOrder }
