"use client"

import { CustomerUpdateForm } from "@/features/update-customer"

import { useCustomerDetail } from "../lib/use-customer-detail"
import type { CustomerDetailData } from "../model/types"
import { CustomerDetailHeader } from "./customer-detail-header"
import { CustomerRecentOrders } from "./customer-recent-orders"
import { CustomerSummary } from "./customer-summary"

const CustomerDetail = ({
  initialCustomer,
}: {
  initialCustomer: CustomerDetailData
}) => {
  const { customer, updateCustomer } = useCustomerDetail(initialCustomer)

  return (
    <section aria-labelledby="customer-detail-title">
      <CustomerDetailHeader customer={customer} />
      <CustomerSummary summary={customer.summary} />

      <div className="mt-5 space-y-5">
        <CustomerUpdateForm
          customer={customer}
          onUpdated={updateCustomer}
        />
        <CustomerRecentOrders orders={customer.recentOrders} />
      </div>
    </section>
  )
}

export { CustomerDetail }
