import { CheckCircle2 } from "lucide-react";

import { cn } from "@/shared/lib/utils";

type FormMessageProps = {
  errorMessage?: string;
  successMessage?: string;
  className?: string;
};

const FormMessage = ({ errorMessage, successMessage, className }: FormMessageProps) => {
  if (!errorMessage && !successMessage) return null;

  return (
    <p
      role={errorMessage ? "alert" : "status"}
      className={cn(
        "rounded-xl px-4 py-3 text-sm font-medium",
        errorMessage ? "bg-coral/10 text-[#a13f28]" : "flex items-center gap-2 bg-leaf/10 text-leaf",
        className,
      )}
    >
      {successMessage && <CheckCircle2 className="size-4" aria-hidden="true" />}
      {errorMessage ?? successMessage}
    </p>
  );
};

export { FormMessage };
