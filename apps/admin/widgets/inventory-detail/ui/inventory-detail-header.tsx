import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import {
  InventoryStockStatusBadge,
  type InventoryDetail,
} from "@/entities/inventory"
import { ROUTES } from "@/shared/config/routes"
import { formatDateTime } from "@/shared/lib/dayjs"
import { buttonVariants } from "@/shared/ui/button"
import { PageHeader } from "@/shared/ui/page-header"

const InventoryDetailHeader = ({
  inventory,
}: {
  inventory: InventoryDetail
}) => {
  return (
    <>
      <Link
        href={ROUTES.inventory.list}
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "-ml-3 mb-4 text-muted-foreground",
        })}
      >
        <ArrowLeft aria-hidden="true" />
        재고 목록
      </Link>

      <PageHeader
        titleId="inventory-detail-title"
        title={inventory.name}
        titleAccessory={
          <InventoryStockStatusBadge status={inventory.stockStatus} />
        }
        description={`SKU ${inventory.sku}`}
        actions={`최근 수정 ${formatDateTime(inventory.updatedAt)}`}
      />
    </>
  )
}

export { InventoryDetailHeader }
