"use client"

import { Save, UserRound } from "lucide-react"

import {
  CUSTOMER_STATUS_OPTIONS,
  type CustomerProfile,
} from "@/entities/customer"
import { Button } from "@/shared/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import {
  FormMessage,
  InputText,
  InputTextarea,
  Select,
} from "@/shared/ui/form"

import { useCustomerUpdateForm } from "../lib/use-customer-update-form"

type CustomerUpdateFormProps = {
  customer: CustomerProfile
  onUpdated: (customer: CustomerProfile) => void
}

const CustomerUpdateForm = ({
  customer,
  onUpdated,
}: CustomerUpdateFormProps) => {
  const {
    form,
    submit,
    isSaving,
    successMessage,
    errorMessage,
  } = useCustomerUpdateForm({ customer, onUpdated })
  const { errors } = form.formState

  return (
    <form onSubmit={submit}>
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center gap-2">
            <UserRound className="size-4 text-primary" aria-hidden="true" />
            <CardTitle>고객 정보</CardTitle>
          </div>
          <CardDescription>
            연락처와 고객 상태, 운영 메모를 관리합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <InputText
            label="고객명"
            error={errors.name?.message}
            {...form.register("name", {
              required: "고객명을 입력해 주세요.",
            })}
          />
          <Select
            label="고객 상태"
            options={CUSTOMER_STATUS_OPTIONS}
            {...form.register("status")}
          />
          <InputText
            label="이메일"
            type="email"
            error={errors.email?.message}
            {...form.register("email", {
              required: "이메일을 입력해 주세요.",
            })}
          />
          <InputText label="연락처" {...form.register("phone")} />
          <InputTextarea
            label="관리 메모"
            rows={5}
            containerClassName="sm:col-span-2"
            placeholder="고객 응대 시 참고할 내용을 입력해 주세요."
            {...form.register("memo")}
          />
        </CardContent>
        <div className="flex flex-col items-start justify-between gap-3 border-t px-4 pt-4 sm:flex-row sm:items-center">
          <FormMessage
            errorMessage={errorMessage}
            successMessage={successMessage}
            defaultMessage="변경한 정보는 저장 즉시 고객 목록에도 반영됩니다."
          />
          <Button type="submit" disabled={isSaving}>
            <Save aria-hidden="true" />
            {isSaving ? "저장 중..." : "고객 정보 저장"}
          </Button>
        </div>
      </Card>
    </form>
  )
}

export { CustomerUpdateForm }
