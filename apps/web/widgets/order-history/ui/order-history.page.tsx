import { redirect } from "next/navigation"

import { getCustomerOrdersServer } from "@/entities/order"
import { ROUTES } from "@/shared/config/routes"
import type { PageSearchParams } from "@/shared/lib/search-params"
import { createClient } from "@/shared/lib/supabase/server"

import { getOrderHistoryFilters } from "../model/order-history-params"
import { OrderHistory } from "./order-history"

type OrderHistoryPageProps = {
  searchParams: Promise<PageSearchParams>
}

const OrderHistoryPage = async ({ searchParams }: OrderHistoryPageProps) => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect(ROUTES.loginWithNext(ROUTES.orders.list))

  const params = await searchParams
  const filters = getOrderHistoryFilters(params.page)
  const data = await getCustomerOrdersServer(filters)

  return <OrderHistory data={data} />
}

export { OrderHistoryPage }
export type { OrderHistoryPageProps }
