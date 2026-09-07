"use client";

import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";
import { Label } from "@/shared/ui/label";
import { Textarea, type TextareaProps } from "@/shared/ui/textarea";

type InputTextareaProps = TextareaProps & {
  label: ReactNode;
  labelHidden?: boolean;
  containerClassName?: string;
  description?: string;
  error?: string;
};

const InputTextarea = ({ label, labelHidden = false, containerClassName, description, error, id, name, className, ...props }: InputTextareaProps) => {
  const inputId = id ?? name;
  const errorId = inputId ? `${inputId}-error` : undefined;
  const descriptionId = inputId ? `${inputId}-description` : undefined;

  return (
    <div className={cn("space-y-2", containerClassName)}>
      <Label htmlFor={inputId} className={cn("font-semibold", labelHidden && "sr-only")}>{label}</Label>
      <Textarea
        {...props}
        id={inputId}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : description ? descriptionId : undefined}
        className={cn("min-h-24 rounded-xl bg-white px-4 py-3 text-sm", className)}
      />
      {error ? (
        <p id={errorId} role="alert" className="text-xs font-medium text-coral">{error}</p>
      ) : description ? (
        <p id={descriptionId} className="text-xs leading-5 text-ink/55">{description}</p>
      ) : null}
    </div>
  );
};

export { InputTextarea };
export type { InputTextareaProps };
