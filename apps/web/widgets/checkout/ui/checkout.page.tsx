import { redirect } from "next/navigation"

import { formatKoreanPhone } from "@/entities/customer"
import { getCustomerProfileServer } from "@/features/customer-profile"
import { ROUTES } from "@/shared/config/routes"
import { createClient } from "@/shared/lib/supabase/server"

import { Checkout } from "./checkout/checkout"

const CheckoutPage = async () => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect(ROUTES.loginWithNext(ROUTES.checkout))

  const profile = await getCustomerProfileServer()

  return (
    <Checkout
      initialCustomer={{
        recipientName: profile.address?.recipientName ?? profile.name,
        recipientPhone: formatKoreanPhone(
          profile.address?.recipientPhone ?? profile.phone,
        ),
        postalCode: profile.address?.postalCode ?? "",
        addressLine1: profile.address?.addressLine1 ?? "",
        addressLine2: profile.address?.addressLine2 ?? "",
        deliveryMessage: profile.address?.deliveryMessage ?? "",
      }}
    />
  )
}

export { CheckoutPage }
