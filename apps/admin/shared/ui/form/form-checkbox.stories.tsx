import { useForm, useWatch } from "react-hook-form"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Typography } from "../typography"
import { FormCheckbox } from "./form-checkbox"

type CheckboxFormValues = {
  rememberMe: boolean
}

const FormCheckboxPreview = ({ defaultChecked = false }: { defaultChecked?: boolean }) => {
  const { control } = useForm<CheckboxFormValues>({
    defaultValues: {
      rememberMe: defaultChecked,
    },
  })
  const rememberMe = useWatch({ control, name: "rememberMe" })

  return (
    <div className="grid gap-3">
      <FormCheckbox
        control={control}
        name="rememberMe"
        label="로그인 상태 유지"
      />
      <Typography variant="caption" tone="muted">
        현재 값: {rememberMe ? "선택됨" : "선택 안 됨"}
      </Typography>
    </div>
  )
}

const meta: Meta<typeof FormCheckboxPreview> = {
  title: "Shared/Form/FormCheckbox",
  component: FormCheckboxPreview,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}
