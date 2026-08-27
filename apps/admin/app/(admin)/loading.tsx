import { cn } from "@/shared/lib/utils"
import { Card, CardContent } from "@/shared/ui/card"

const Skeleton = ({ className }: { className?: string }) => {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} />
}

const AdminLoading = () => {
  return (
    <main
      className="space-y-6"
      aria-busy="true"
      aria-label="페이지를 불러오는 중입니다"
    >
      <span className="sr-only" role="status">
        페이지를 불러오는 중입니다.
      </span>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-3">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>
        <Skeleton className="h-10 w-28" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Card key={index} appearance="panel">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="size-9 rounded-lg" />
              </div>
              <Skeleton className="h-8 w-28" />
              <Skeleton className="h-3 w-36" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card appearance="panel">
        <CardContent className="p-0">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-8 w-20" />
          </div>
          <div className="space-y-0 divide-y">
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className="grid grid-cols-[minmax(0,1fr)_100px] items-center gap-6 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_140px_100px]"
              >
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48 max-w-full" />
                  <Skeleton className="h-3 w-32 max-w-full" />
                </div>
                <Skeleton className="hidden h-4 w-24 sm:block" />
                <Skeleton className="h-7 w-20 justify-self-end rounded-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default AdminLoading
