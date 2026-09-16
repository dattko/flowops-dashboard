import { z } from "zod"

import {
  addressLine1Schema,
  addressLine2Schema,
  deliveryMessageSchema,
  koreanPhoneSchema,
  postalCodeSchema,
  recipientNameSchema,
} from "@/entities/customer"

const checkoutSchema = z.object({
  recipientName: recipientNameSchema,
  recipientPhone: koreanPhoneSchema,
  postalCode: postalCodeSchema,
  addressLine1: addressLine1Schema,
  addressLine2: addressLine2Schema,
  deliveryMessage: deliveryMessageSchema,
  paymentMethod: z.enum(["card", "kakao_pay"]),
  testPaymentConfirmed: z.boolean().refine(Boolean, {
    message: "테스트 결제임을 확인해 주세요.",
  }),
})

type CheckoutValues = z.infer<typeof checkoutSchema>

type CheckoutCustomer = Omit<CheckoutValues, "paymentMethod" | "testPaymentConfirmed">

type CheckoutItem = {
  productId: string
  quantity: number
}

export { checkoutSchema }
export type { CheckoutCustomer, CheckoutItem, CheckoutValues }
