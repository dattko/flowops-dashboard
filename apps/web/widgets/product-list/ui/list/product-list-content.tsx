import { ProductCard, type Product } from "@/entities/product"
import { Button } from "@/shared/ui/button"

type ProductListContentProps = {
  products: Product[]
  isPending: boolean
  isError: boolean
  onRetry: () => void
  onReset: () => void
}

const ProductListSkeleton = () => (
  <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: 8 }, (_, index) => (
      <div key={index} aria-hidden="true">
        <div className="aspect-[0.94] animate-pulse rounded-[1.5rem] bg-cream/65" />
        <div className="mt-5 h-4 w-2/3 animate-pulse rounded-full bg-cream" />
        <div className="mt-3 h-3 w-full animate-pulse rounded-full bg-cream/70" />
      </div>
    ))}
  </div>
)

export const ProductListContent = ({
  products,
  isPending,
  isError,
  onRetry,
  onReset,
}: ProductListContentProps) => {
  if (isPending) return <ProductListSkeleton />

  if (isError) {
    return (
      <div className="grid min-h-80 place-items-center rounded-[1.5rem] bg-cream/55 px-6 text-center">
        <div>
          <p className="text-lg font-semibold">상품을 불러오지 못했어요.</p>
          <p className="mt-2 text-sm text-ink/55">
            잠시 후 다시 시도해 주세요.
          </p>
          <Button type="button" variant="outline" className="mt-6" onClick={onRetry}>
            다시 불러오기
          </Button>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="grid min-h-80 place-items-center rounded-[1.5rem] bg-cream/55 px-6 text-center">
        <div>
          <p className="text-lg font-semibold">찾는 상품이 없어요.</p>
          <p className="mt-2 text-sm text-ink/55">
            다른 검색어나 카테고리를 선택해 보세요.
          </p>
          <Button type="button" variant="outline" className="mt-6" onClick={onReset}>
            전체 상품 보기
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
