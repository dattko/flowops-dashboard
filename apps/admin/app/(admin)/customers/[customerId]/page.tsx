import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CustomerDetail, getCustomerDetail } from "@/widgets/customer-detail"

type CustomerDetailPageProps = {
  params: Promise<{ customerId: string }>
}

export const generateMetadata = async ({
  params,
}: CustomerDetailPageProps): Promise<Metadata> => {
  const { customerId } = await params
  const customer = await getCustomerDetail(customerId)

  if (!customer) {
    return {
      title: "고객을 찾을 수 없음",
      description: "요청한 고객 정보를 찾을 수 없습니다.",
    }
  }

  return {
    title: `${customer.name} 고객`,
    description: `${customer.name} 고객의 상태, 주문 요약과 최근 주문을 확인합니다.`,
  }
}

const CustomerDetailPage = async ({
  params,
}: CustomerDetailPageProps) => {
  const { customerId } = await params
  const customer = await getCustomerDetail(customerId)

  if (!customer) {
    notFound()
  }

  return <CustomerDetail initialCustomer={customer} />
}

export default CustomerDetailPage
