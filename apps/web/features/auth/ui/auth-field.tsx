import { type InputHTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const AuthField = ({ label, error, id, className, ...props }: AuthFieldProps) => {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-sm outline-none transition placeholder:text-ink/35 focus:border-coffee focus:ring-3 focus:ring-coffee/12",
          error && "border-coral focus:border-coral focus:ring-coral/10",
          className,
        )}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-coral">
          {error}
        </p>
      )}
    </div>
  );
};
