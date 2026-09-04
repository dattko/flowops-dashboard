type BrandMarkProps = {
  compact?: boolean;
};

export const BrandMark = ({ compact = false }: BrandMarkProps) => {
  return (
    <span className="inline-flex items-center gap-2.5" aria-label="Morrow Coffee">
      <span
        className="relative grid size-8 place-items-center rounded-full bg-ink text-paper"
        aria-hidden="true"
      >
        <span className="h-4 w-2.5 -rotate-12 rounded-[50%] border border-current" />
        <span className="absolute h-px w-3 rotate-[62deg] bg-current" />
      </span>
      {!compact && (
        <span className="text-[0.96rem] font-bold tracking-[-0.04em]">
          MORROW COFFEE
        </span>
      )}
    </span>
  );
};
