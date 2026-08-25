import type { ReactNode } from "react"

import { Typography, type TypographyProps } from "@/shared/ui/typography"

type FormMessageProps = Omit<TypographyProps, "children" | "tone"> & {
  errorMessage?: ReactNode
  successMessage?: ReactNode
  defaultMessage?: ReactNode
}

const FormMessage = ({
  errorMessage,
  successMessage,
  defaultMessage,
  variant = "bodySmall",
  ...props
}: FormMessageProps) => {
  if (errorMessage) {
    return (
      <Typography
        {...props}
        variant={variant}
        tone="destructive"
        role="alert"
      >
        {errorMessage}
      </Typography>
    )
  }

  if (successMessage) {
    return (
      <Typography {...props} variant={variant} tone="success" role="status">
        {successMessage}
      </Typography>
    )
  }

  if (defaultMessage) {
    return (
      <Typography {...props} variant={variant} tone="muted">
        {defaultMessage}
      </Typography>
    )
  }

  return null
}

export { FormMessage }
export type { FormMessageProps }
