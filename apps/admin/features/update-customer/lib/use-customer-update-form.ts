"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import type { CustomerProfile } from "@/entities/customer"
import { getApiErrorMessage } from "@/shared/api/base/utils"

import { updateCustomer } from "../api/customer-client.api"
import type { CustomerUpdateFormValues } from "../model/types"

const getFormValues = (customer: CustomerProfile): CustomerUpdateFormValues => ({
  name: customer.name,
  email: customer.email,
  phone: customer.phone ?? "",
  status: customer.status,
  memo: customer.memo ?? "",
})

const useCustomerUpdateForm = ({
  customer,
  onUpdated,
}: {
  customer: CustomerProfile
  onUpdated: (customer: CustomerProfile) => void
}) => {
  const queryClient = useQueryClient()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const form = useForm<CustomerUpdateFormValues>({
    defaultValues: getFormValues(customer),
  })
  const mutation = useMutation({
    mutationFn: (values: CustomerUpdateFormValues) =>
      updateCustomer(customer.id, values),
    onSuccess: (updatedCustomer) => {
      form.reset(getFormValues(updatedCustomer))
      onUpdated(updatedCustomer)
      setSuccessMessage("고객 정보가 저장되었습니다.")
      void queryClient.invalidateQueries({ queryKey: ["customers", "list"] })
    },
  })
  const submit = form.handleSubmit((values) => {
    setSuccessMessage(null)
    mutation.mutate(values)
  })

  return {
    form,
    submit,
    isSaving: mutation.isPending,
    successMessage,
    errorMessage: mutation.error ? getApiErrorMessage(mutation.error) : null,
  }
}

export { useCustomerUpdateForm }
