"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { getApiErrorMessage } from "@/shared/api/base/utils"
import { ROUTES } from "@/shared/config/routes"

import { createInventoryProduct } from "../api/inventory-product-client.api"
import type { InventoryProductCreateFormValues } from "../model/types"

const DEFAULT_VALUES: InventoryProductCreateFormValues = {
  sku: "",
  name: "",
  description: "",
  price: 0,
  productStatus: "active",
  onHand: 0,
  reorderPoint: 10,
}

const useInventoryProductCreateForm = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const form = useForm<InventoryProductCreateFormValues>({
    defaultValues: DEFAULT_VALUES,
  })
  const mutation = useMutation({
    mutationFn: createInventoryProduct,
    onSuccess: (inventory) => {
      void queryClient.invalidateQueries({ queryKey: ["inventory", "list"] })
      router.replace(ROUTES.inventory.detail(inventory.productId))
    },
    onError: (error) => {
      setErrorMessage(getApiErrorMessage(error))
    },
  })
  const submit = form.handleSubmit((values) => {
    setErrorMessage(null)
    mutation.mutate(values)
  })

  return {
    form,
    submit,
    isCreating: mutation.isPending,
    errorMessage,
  }
}

export { useInventoryProductCreateForm }
