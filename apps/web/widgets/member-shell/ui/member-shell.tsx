import { Coffee, ShieldCheck, Sparkles } from "lucide-react";

import { BrandMark } from "@/shared/ui/brand-mark";

type MemberShellProps = {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
};

const highlights = [
  { icon: Coffee, text: "취향에 맞는 커피를 더 빠르게 찾아보세요." },
  { icon: Sparkles, text: "관심 있는 상품과 주문 내역을 한곳에서 관리해요." },
  { icon: ShieldCheck, text: "안전하게 보호되는 계정으로 이용할 수 있어요." },
];

const MemberShell = ({ children, eyebrow, title, description }: MemberShellProps) => (
  <section className="relative overflow-hidden bg-cream px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
    <div className="absolute -right-40 -top-44 size-[32rem] rounded-full border-[6rem] border-paper/55" />
    <div className="relative mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-ink/10 bg-paper shadow-[0_30px_90px_rgba(45,35,28,0.12)] lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="hidden bg-leaf p-10 text-paper lg:flex lg:flex-col lg:justify-between">
        <BrandMark />
        <div className="py-14">
          <p className="text-xs font-bold tracking-[0.16em] text-[#e6cda0]">MORROW MEMBERS</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.045em]">
            오늘 고른 취향을
            <br />
            내일도 이어가세요.
          </h2>
          <ul className="mt-9 space-y-5">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm leading-6 text-paper/75">
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-paper/10">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-paper/45">Morrow Coffee membership</p>
      </aside>

      <div className="px-6 py-9 sm:px-10 sm:py-12 lg:px-14">
        <p className="text-xs font-bold tracking-[0.14em] text-coffee">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-ink/60">{description}</p>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  </section>
);

export { MemberShell };
