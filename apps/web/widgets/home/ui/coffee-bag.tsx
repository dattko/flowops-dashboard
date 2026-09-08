type CoffeeBagProps = {
  tone: string
  label: string
  size?: "default" | "large"
}

export const CoffeeBag = ({
  tone,
  label,
  size = "default",
}: CoffeeBagProps) => (
  <div
    className={`relative mx-auto w-[55%] min-w-36 max-w-56 overflow-hidden rounded-[0.4rem_0.4rem_1.2rem_1.2rem] shadow-[0_24px_50px_rgba(38,29,22,0.17)] ${tone} ${
      size === "large" ? "aspect-[0.74] max-w-[18rem]" : "aspect-[0.76]"
    }`}
    aria-hidden="true"
  >
    <div className="absolute inset-x-0 top-[7%] h-px bg-white/25" />
    <div className="absolute left-1/2 top-[34%] flex aspect-[1.25] w-[66%] -translate-x-1/2 flex-col items-center justify-center bg-[#f8f3e9] px-3 text-center text-ink">
      <span className="text-[0.48rem] font-semibold tracking-[0.18em]">
        MORROW
      </span>
      <span className="mt-2 font-serif text-base italic sm:text-lg">Coffee</span>
      <span className="mt-2 text-[0.46rem] tracking-[0.12em] text-black/60">
        {label}
      </span>
    </div>
    <div className="absolute bottom-[7%] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/45" />
  </div>
)
