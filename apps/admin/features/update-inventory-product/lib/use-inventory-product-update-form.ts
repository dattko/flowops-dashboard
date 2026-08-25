"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import type { InventoryDetail } from "@/entities/inventory"
import { getApiErrorMessage } from "@/shared/api/base/utils"

import { updateInventoryProduct } from "../api/inventory-product-client.api"
import type { InventoryProductUpdateFormValues } from "../model/types"

const getFormValues = (
  inventory: InventoryDetail
): InventoryProductUpdateFormValues => ({
  name: inventory.name,
  description: inventory.description ?? "",
  price: inventory.price,
  productStatus: inventory.productStatus,
  reorderPoint: inventory.reorderPoint,
})

const useInventoryProductUpdateForm = ({
  inventory,
  onUpdated,
}: {
  inventory: InventoryDetail
  onUpdated: (inventory: InventoryDetail) => void
}) => {
  const queryClient = useQueryClient()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const form = useForm<InventoryProductUpdateFormValues>({
    defaultValues: getFormValues(inventory),
  })
  const mutation = useMutation({
    mutationFn: (values: InventoryProductUpdateFormValues) =>
      updateInventoryProduct(inventory.productId, values),
    onSuccess: (updatedInventory) => {
      form.reset(getFormValues(updatedInventory))
      onUpdated(updatedInventory)
      setSuccessMessage("상품 정보가 저장되었습니다.")
      void queryClient.invalidateQueries({ queryKey: ["inventory", "list"] })
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

export { useInventoryProductUpdateForm }
