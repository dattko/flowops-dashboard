import { notFound, redirect } from "next/navigation"

import { getStorefrontOrderServer } from "@/entities/order"
import { ROUTES } from "@/shared/config/routes"
import { createClient } from "@/shared/lib/supabase/server"

import { OrderComplete } from "./order-complete"

type OrderCompletePageProps = {
  params: Promise<{ orderNumber: string }>
}

const OrderCompletePage = async ({ params }: OrderCompletePageProps) => {
  const { orderNumber } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(ROUTES.loginWithNext(ROUTES.orders.complete(orderNumber)))
  }

  const order = await getStorefrontOrderServer(orderNumber)
  if (!order) notFound()

  return <OrderComplete order={order} />
}

export { OrderCompletePage }
export type { OrderCompletePageProps }
