"use client"

import { Dialog } from "@base-ui/react/dialog"
import { Search, X } from "lucide-react"

import { Button, buttonVariants } from "@/shared/ui/button"
import { InputText } from "@/shared/ui/form"

import { useProductSearch } from "../lib/use-product-search"

const ProductSearchDialog = () => {
  const { form, isOpen, onOpenChange, onSubmit } = useProductSearch()
  const {
    formState: { errors },
    register,
  } = form

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger
        className={buttonVariants({ variant: "ghost", size: "icon" })}
        aria-label="상품 검색 열기"
      >
        <Search className="size-[1.15rem]" strokeWidth={1.7} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[60] min-h-dvh bg-ink/45 backdrop-blur-[2px] transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Viewport className="fixed inset-0 z-[61] flex min-h-dvh items-start justify-center overflow-y-auto px-4 py-[12svh] sm:px-8 sm:py-[16svh]">
          <Dialog.Popup className="relative w-full max-w-2xl rounded-[1.75rem] border border-ink/10 bg-paper p-6 text-ink shadow-[0_28px_90px_rgba(45,35,28,0.24)] transition-[transform,opacity] duration-150 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0 sm:p-8">
            <div className="pr-12">
              <p className="text-xs font-bold tracking-[0.16em] text-coffee uppercase">
                PRODUCT SEARCH
              </p>
              <Dialog.Title className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                어떤 커피를 찾으세요?
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-6 text-ink/60">
                상품명이나 키워드를 입력하면 전체 상품에서 찾아드려요.
              </Dialog.Description>
            </div>

            <Dialog.Close
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className: "absolute right-4 top-4 sm:right-6 sm:top-6",
              })}
              aria-label="상품 검색 닫기"
            >
              <X className="size-5" aria-hidden="true" />
            </Dialog.Close>

            <form
              className="mt-7 flex flex-col items-start gap-3 sm:flex-row"
              onSubmit={onSubmit}
              noValidate
            >
              <div className="relative w-full flex-1">
                <Search
                  className="pointer-events-none absolute left-4 top-4 z-10 size-5 text-ink/40"
                  aria-hidden="true"
                />
                <InputText
                  {...register("keyword", {
                    validate: (value) =>
                      value.trim().length > 0 || "검색어를 입력해 주세요.",
                  })}
                  type="search"
                  label="상품 검색어"
                  labelHidden
                  placeholder="원두, 드립백, 디카페인..."
                  autoComplete="off"
                  maxLength={50}
                  error={errors.keyword?.message}
                  className="h-14 rounded-full border-ink/15 bg-cream/45 pl-12 pr-5 text-base focus-visible:bg-paper"
                />
              </div>
              <Button type="submit" variant="brand" size="lg" className="h-14 w-full sm:w-auto">
                검색하기
                <Search className="size-4" aria-hidden="true" />
              </Button>
            </form>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { ProductSearchDialog }
