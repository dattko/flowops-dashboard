"use client";

import type { ReactNode } from "react";
import { useController, type Control, type FieldPath, type FieldValues } from "react-hook-form";

import { cn } from "@/shared/lib/utils";
import { Label } from "@/shared/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

type SelectOption<TValue extends string = string> = {
  label: ReactNode;
  value: TValue;
  disabled?: boolean;
};

type FormSelectProps<TFieldValues extends FieldValues, TValue extends string = string> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: ReactNode;
  options: readonly SelectOption<TValue>[];
  placeholder?: string;
  description?: string;
  containerClassName?: string;
  disabled?: boolean;
  id?: string;
};

const FormSelect = <TFieldValues extends FieldValues, TValue extends string = string>({ control, name, label, options, placeholder = "선택해 주세요", description, containerClassName, disabled, id = name }: FormSelectProps<TFieldValues, TValue>) => {
  const { field, fieldState } = useController({ control, name });
  const errorId = `${id}-error`;
  const descriptionId = `${id}-description`;

  return (
    <div className={cn("space-y-2", containerClassName)}>
      <Label htmlFor={id} className="font-semibold">{label}</Label>
      <Select name={field.name} value={(field.value || null) as TValue | null} onValueChange={field.onChange} disabled={disabled}>
        <SelectTrigger id={id} onBlur={field.onBlur} aria-invalid={fieldState.invalid} aria-describedby={fieldState.error ? errorId : description ? descriptionId : undefined} className="h-12 w-full rounded-xl bg-white px-4">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} disabled={option.disabled}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {fieldState.error ? (
        <p id={errorId} role="alert" className="text-xs font-medium text-coral">{fieldState.error.message}</p>
      ) : description ? (
        <p id={descriptionId} className="text-xs leading-5 text-ink/55">{description}</p>
      ) : null}
    </div>
  );
};

export { FormSelect };
export type { FormSelectProps, SelectOption };
