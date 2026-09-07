"use client";

import type { ReactNode } from "react";
import { useController, type Control, type FieldPath, type FieldValues } from "react-hook-form";

import { cn } from "@/shared/lib/utils";
import { Checkbox, type CheckboxProps } from "@/shared/ui/checkbox";
import { Label } from "@/shared/ui/label";

type FormCheckboxProps<TFieldValues extends FieldValues> = Omit<CheckboxProps, "checked" | "defaultChecked" | "name" | "onCheckedChange"> & {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: ReactNode;
  containerClassName?: string;
};

const FormCheckbox = <TFieldValues extends FieldValues>({ control, name, label, containerClassName, id = name, className, ...props }: FormCheckboxProps<TFieldValues>) => {
  const { field, fieldState } = useController({ control, name });
  const errorId = `${id}-error`;

  return (
    <div className={cn("space-y-2", containerClassName)}>
      <Label htmlFor={id} className="w-fit cursor-pointer items-start font-normal leading-5">
        <Checkbox
          {...props}
          id={id}
          name={field.name}
          checked={Boolean(field.value)}
          onBlur={field.onBlur}
          onCheckedChange={field.onChange}
          aria-invalid={fieldState.invalid}
          aria-describedby={fieldState.error ? errorId : undefined}
          className={cn("mt-0.5 data-checked:border-coffee data-checked:bg-coffee", className)}
        />
        <span>{label}</span>
      </Label>
      {fieldState.error && <p id={errorId} role="alert" className="text-xs font-medium text-coral">{fieldState.error.message}</p>}
    </div>
  );
};

export { FormCheckbox };
export type { FormCheckboxProps };
