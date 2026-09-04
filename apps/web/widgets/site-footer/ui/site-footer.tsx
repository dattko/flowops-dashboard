import { BrandMark } from "@/shared/ui/brand-mark";

export const SiteFooter = () => {
  return (
    <footer className="bg-ink px-5 py-12 text-paper sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[90rem] gap-10 border-b border-white/15 pb-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <BrandMark />
          <p className="mt-5 max-w-sm text-sm leading-6 text-paper/60">
            좋은 하루의 시작과 끝에 자연스럽게 놓이는 커피를 만듭니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-paper/75">
          <a href="#coffee" className="hover:text-white">커피</a>
          <a href="#story" className="hover:text-white">브랜드 이야기</a>
          <a href="#guide" className="hover:text-white">커피 가이드</a>
        </div>
      </div>
      <div className="mx-auto flex max-w-[90rem] flex-col gap-2 pt-6 text-xs text-paper/45 sm:flex-row sm:justify-between">
        <p>© 2026 Morrow Coffee. All rights reserved.</p>
        <p>FlowOps demo storefront</p>
      </div>
    </footer>
  );
};
