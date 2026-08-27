import { Trophy } from "lucide-react"

import { formatWon } from "@/shared/lib/currency"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"

import type { TopProductReport } from "../model/types"

const TopProductsReportTable = ({
  products,
}: {
  products: TopProductReport[]
}) => {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b py-5">
        <div className="flex items-center gap-2">
          <Trophy className="size-4 text-primary" aria-hidden="true" />
          <CardTitle>판매 상위 상품</CardTitle>
        </div>
        <CardDescription>매출 기준 상위 상품 10개입니다.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {products.length > 0 ? (
          <Table className="min-w-[620px] text-sm">
            <TableHeader className="bg-muted/45 text-xs text-muted-foreground">
              <TableRow>
                <TableHead className="w-16 px-5">순위</TableHead>
                <TableHead>상품</TableHead>
                <TableHead className="text-right">판매 수량</TableHead>
                <TableHead className="px-5 text-right">매출</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow
                  key={product.productId ?? `${product.productName}-${index}`}
                >
                  <TableCell className="px-5 py-4 font-semibold">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium">
                    {product.productName}
                  </TableCell>
                  <TableCell className="text-right">
                    {product.quantity.toLocaleString()}개
                  </TableCell>
                  <TableCell className="px-5 text-right font-semibold">
                    {formatWon(product.revenue)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="px-5 py-12 text-center text-sm text-muted-foreground">
            조회 기간의 판매 상품이 없습니다.
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { TopProductsReportTable }
