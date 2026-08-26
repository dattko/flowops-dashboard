import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import {
  CustomerStatusBadge,
  type CustomerProfile,
} from "@/entities/customer"
import { formatDateTime } from "@/shared/lib/dayjs"
import { buttonVariants } from "@/shared/ui/button"
import { PageHeader } from "@/shared/ui/page-header"

const CustomerDetailHeader = ({
  customer,
}: {
  customer: CustomerProfile
}) => {
  return (
    <>
      <Link
        href="/customers"
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "-ml-3 mb-4 text-muted-foreground",
        })}
      >
        <ArrowLeft aria-hidden="true" />
        고객 목록
      </Link>

      <PageHeader
        titleId="customer-detail-title"
        title={customer.name}
        titleAccessory={<CustomerStatusBadge status={customer.status} />}
        description={customer.email}
        actions={`최근 수정 ${formatDateTime(customer.updatedAt)}`}
      />
    </>
  )
}

export { CustomerDetailHeader }
