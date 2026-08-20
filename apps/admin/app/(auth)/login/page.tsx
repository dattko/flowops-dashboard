import { BarChart3, Boxes, CircleCheck, ShoppingBag } from "lucide-react"

import { LoginForm } from "@/features/auth"
import { Typography } from "@/shared/ui/typography"

const operationItems = [
  {
    label: "오늘 주문",
    value: "182건",
    icon: ShoppingBag,
    iconClassName: "bg-[#3f4f47] text-[#a8d5bd]",
  },
  {
    label: "재고 확인",
    value: "6개 상품",
    icon: Boxes,
    iconClassName: "bg-[#514332] text-[#e9bf86]",
  },
  {
    label: "운영 상태",
    value: "정상",
    icon: CircleCheck,
    iconClassName: "bg-[#3f4f47] text-[#a8d5bd]",
  },
]

const LoginRoute = () => {
  return (
    <main className="grid min-h-svh bg-background lg:grid-cols-[minmax(0,1.05fr)_minmax(480px,0.95fr)]">
      <section className="relative hidden min-h-svh overflow-hidden bg-sidebar px-12 py-10 text-sidebar-foreground lg:flex lg:flex-col xl:px-16 xl:py-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-40 -left-28 size-[520px] rounded-full bg-primary/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-[0_8px_24px_rgba(215,117,63,0.3)]">
            <BarChart3 className="size-5" aria-hidden="true" />
          </div>
          <div>
            <Typography variant="cardTitle" tone="inherit">
              flowops
            </Typography>
            <Typography
              variant="overline"
              tone="inherit"
              className="text-sidebar-foreground/55"
            >
              Operations
            </Typography>
          </div>
        </div>

        <div className="relative my-auto max-w-xl py-16">
          <Typography
            variant="overline"
            tone="inherit"
            className="mb-5 text-sidebar-primary"
          >
            Smart Operations
          </Typography>
          <Typography
            as="h2"
            variant="display"
            tone="inherit"
            className="max-w-lg text-[clamp(2.5rem,5vw,4.75rem)] leading-[1.02] font-semibold tracking-[-0.055em] text-balance"
          >
            운영의 흐름을
            <br />
            한눈에 관리하세요.
          </Typography>
          <Typography
            variant="body"
            tone="inherit"
            className="mt-6 max-w-md text-base leading-7 text-sidebar-foreground/60"
          >
            주문과 재고, 매출 현황을 빠르게 파악하고 오늘 처리할 업무에 집중할 수 있습니다.
          </Typography>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            {operationItems.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/8 bg-white/[0.045] p-4 backdrop-blur-sm"
                >
                  <div
                    className={`grid size-8 place-items-center rounded-lg ${item.iconClassName}`}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </div>
                  <Typography
                    variant="caption"
                    tone="inherit"
                    className="mt-4 text-sidebar-foreground/50"
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant="body"
                    tone="inherit"
                    className="mt-0.5 font-semibold"
                  >
                    {item.value}
                  </Typography>
                </div>
              )
            })}
          </div>
        </div>

        <Typography
          variant="caption"
          tone="inherit"
          className="relative text-sidebar-foreground/35"
        >
          © 2026 FlowOps. All rights reserved.
        </Typography>
      </section>

      <section className="relative flex min-h-svh items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <div
          className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/[0.06] blur-3xl"
          aria-hidden="true"
        />
        <div className="relative w-full max-w-[440px]">
          <LoginForm />
          <Typography
            variant="caption"
            tone="muted"
            className="mt-6 text-center text-muted-foreground/70 lg:hidden"
          >
            © 2026 FlowOps. All rights reserved.
          </Typography>
        </div>
      </section>
    </main>
  )
}

export default LoginRoute
