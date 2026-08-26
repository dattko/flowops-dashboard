import { notFound } from "next/navigation"

import { CustomerDetail, getCustomerDetail } from "@/widgets/customer-detail"

const CustomerDetailPage = async ({
  params,
}: {
  params: Promise<{ customerId: string }>
}) => {
  const { customerId } = await params
  const customer = await getCustomerDetail(customerId)

  if (!customer) {
    notFound()
  }

  return <CustomerDetail initialCustomer={customer} />
}

export default CustomerDetailPage
