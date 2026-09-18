import { notFound, redirect } from "next/navigation"

import { getCustomerOrderServer } from "@/entities/order"
import { ROUTES } from "@/shared/config/routes"
import { createClient } from "@/shared/lib/supabase/server"

import { OrderDetail } from "./order-detail"

type OrderDetailPageProps = {
  params: Promise<{ orderNumber: string }>
}

const OrderDetailPage = async ({ params }: OrderDetailPageProps) => {
  const { orderNumber } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(ROUTES.loginWithNext(ROUTES.orders.detail(orderNumber)))
  }

  const order = await getCustomerOrderServer(orderNumber)
  if (!order) notFound()

  return <OrderDetail order={order} />
}

export { OrderDetailPage }
export type { OrderDetailPageProps }
