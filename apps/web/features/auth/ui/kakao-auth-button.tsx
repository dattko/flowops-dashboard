"use client";

import { LoaderCircle } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { FormMessage } from "@/shared/ui/form";

import { useKakaoAuth } from "../lib/use-kakao-auth";

export const KakaoAuthButton = () => {
  const { login, isPending, errorMessage } = useKakaoAuth();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-ink/10" />
        <span className="text-xs font-medium text-ink/40">또는</span>
        <span className="h-px flex-1 bg-ink/10" />
      </div>

      <Button
        type="button"
        size="lg"
        className="w-full border-transparent bg-[#FEE500] text-[#191919] shadow-none hover:bg-[#f4dc00]"
        onClick={login}
        disabled={isPending}
      >
        {isPending ? (
          <LoaderCircle className="animate-spin" aria-hidden="true" />
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3C6.48 3 2 6.58 2 11c0 2.86 1.87 5.37 4.68 6.79L5.5 22l4.84-2.73c.54.08 1.1.13 1.66.13 5.52 0 10-3.58 10-8S17.52 3 12 3Z" />
          </svg>
        )}
        {isPending ? "카카오로 이동 중..." : "카카오로 로그인·가입"}
      </Button>

      <FormMessage errorMessage={errorMessage} />
    </div>
  );
};
