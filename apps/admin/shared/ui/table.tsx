import * as React from "react"

import { cn } from "@/shared/lib/utils"

type TableProps = React.ComponentProps<"table"> & {
  containerClassName?: string
}

const Table = ({ className, containerClassName, ...props }: TableProps) => {
  return (
    <div
      data-slot="table-container"
      className={cn("w-full overflow-x-auto", containerClassName)}
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-left", className)}
        {...props}
      />
    </div>
  )
}

const TableHeader = ({ className, ...props }: React.ComponentProps<"thead">) => {
  return (
    <thead data-slot="table-header" className={cn(className)} {...props} />
  )
}

const TableBody = ({ className, ...props }: React.ComponentProps<"tbody">) => {
  return <tbody data-slot="table-body" className={cn(className)} {...props} />
}

const TableFooter = ({ className, ...props }: React.ComponentProps<"tfoot">) => {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("border-t bg-muted/50 font-medium", className)}
      {...props}
    />
  )
}

const TableRow = ({ className, ...props }: React.ComponentProps<"tr">) => {
  return (
    <tr
      data-slot="table-row"
      className={cn("transition-colors", className)}
      {...props}
    />
  )
}

const TableHead = ({
  className,
  scope = "col",
  ...props
}: React.ComponentProps<"th">) => {
  return (
    <th
      data-slot="table-head"
      scope={scope}
      className={cn("px-4 py-3 text-left align-middle font-medium", className)}
      {...props}
    />
  )
}

const TableCell = ({ className, ...props }: React.ComponentProps<"td">) => {
  return (
    <td
      data-slot="table-cell"
      className={cn("px-4 py-3.5 align-middle", className)}
      {...props}
    />
  )
}

const TableCaption = ({
  className,
  ...props
}: React.ComponentProps<"caption">) => {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
export type { TableProps }
