import { Spinner } from "@/shared/ui/spinner"

const AdminLoading = () => {
  return (
      <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full" aria-busy="true" aria-live="polite">
        <div role="status">
          <Spinner className="size-8" />
          <span className="sr-only">페이지를 불러오는 중입니다.</span>
        </div>
      </div>
  )
}

export default AdminLoading
