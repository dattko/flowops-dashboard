import { useState } from "react"
import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Pagination } from "./pagination"

const PaginationPreview = ({
  page: initialPage,
  onPageChange,
  ...props
}: ComponentProps<typeof Pagination>) => {
  const [page, setPage] = useState(initialPage)

  return (
    <div className="w-full overflow-hidden rounded-xl border bg-white">
      <Pagination
        {...props}
        page={page}
        onPageChange={(nextPage) => {
          setPage(nextPage)
          onPageChange(nextPage)
        }}
      />
    </div>
  )
}

const meta: Meta<typeof Pagination> = {
  title: "Shared/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-4xl">
        <Story />
      </div>
    ),
  ],
  args: {
    page: 1,
    totalPages: 10,
    totalCount: 96,
    onPageChange: () => undefined,
  },
  render: (args) => <PaginationPreview {...args} />,
}

export default meta

type Story = StoryObj<typeof meta>

export const FirstPage: Story = {}

export const MiddlePage: Story = {
  args: {
    page: 5,
  },
}

export const LastPage: Story = {
  args: {
    page: 10,
  },
}

export const FewPages: Story = {
  args: {
    page: 2,
    totalPages: 3,
    totalCount: 24,
  },
}
