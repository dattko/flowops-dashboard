import { ProductListSort, type ProductSort } from "@/features/filter-products"

type ProductListToolbarProps = {
  totalCount: number
  isRefreshing: boolean
  sort: ProductSort
  onSortChange: (sort: ProductSort) => void
}

export const ProductListToolbar = ({
  totalCount,
  isRefreshing,
  sort,
  onSortChange,
}: ProductListToolbarProps) => (
  <div className="relative flex items-center justify-between py-7">
    {isRefreshing ? (
      <div className="absolute inset-x-0 top-0 h-0.5 overflow-hidden bg-coffee/10">
        <div className="h-full w-1/3 animate-pulse bg-coffee" />
      </div>
    ) : null}
    <p className="text-sm text-ink/55" aria-live="polite">
      총 <strong className="font-semibold text-ink">{totalCount}</strong>개 상품
    </p>
    <ProductListSort value={sort} onValueChange={onSortChange} />
  </div>
)
