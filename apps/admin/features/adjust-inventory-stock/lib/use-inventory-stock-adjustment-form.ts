"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import type { InventoryDetail } from "@/entities/inventory"
import { getApiErrorMessage } from "@/shared/api/base/utils"

import { adjustInventoryStock } from "../api/inventory-stock-client.api"
import type { InventoryStockAdjustmentFormValues } from "../model/types"

const DEFAULT_VALUES: InventoryStockAdjustmentFormValues = {
  movementType: "inbound",
  quantity: 1,
  reason: "",
}

const useInventoryStockAdjustmentForm = ({
  inventory,
  onUpdated,
}: {
  inventory: InventoryDetail
  onUpdated: (inventory: InventoryDetail) => void
}) => {
  const queryClient = useQueryClient()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const form = useForm<InventoryStockAdjustmentFormValues>({
    defaultValues: DEFAULT_VALUES,
  })
  const mutation = useMutation({
    mutationFn: (values: InventoryStockAdjustmentFormValues) =>
      adjustInventoryStock(inventory.productId, values),
    onSuccess: (updatedInventory) => {
      form.reset(DEFAULT_VALUES)
      onUpdated(updatedInventory)
      setSuccessMessage("재고 변경 내역이 반영되었습니다.")
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

export { useInventoryStockAdjustmentForm }
