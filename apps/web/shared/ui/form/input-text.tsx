"use client";

import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";
import { Input, type InputProps } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

type InputTextProps = InputProps & {
  label: ReactNode;
  labelAction?: ReactNode;
  labelHidden?: boolean;
  containerClassName?: string;
  description?: string;
  error?: string;
};

const InputText = ({ label, labelAction, labelHidden = false, containerClassName, description, error, id, name, className, ...props }: InputTextProps) => {
  const inputId = id ?? name;
  const errorId = inputId ? `${inputId}-error` : undefined;
  const descriptionId = inputId ? `${inputId}-description` : undefined;

  return (
    <div className={cn("space-y-2", containerClassName)}>
      <div className={cn("flex items-center justify-between gap-4", labelHidden && "sr-only")}>
        <Label htmlFor={inputId} className="font-semibold">{label}</Label>
        {labelAction}
      </div>
      <Input
        {...props}
        id={inputId}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : description ? descriptionId : undefined}
        className={cn("h-12 rounded-xl bg-white px-4 text-sm", className)}
      />
      {error ? (
        <p id={errorId} role="alert" className="text-xs font-medium text-coral">{error}</p>
      ) : description ? (
        <p id={descriptionId} className="text-xs leading-5 text-ink/55">{description}</p>
      ) : null}
    </div>
  );
};

export { InputText };
export type { InputTextProps };
