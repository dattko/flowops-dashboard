"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import type { OrderConsultationNote } from "@/entities/order"
import { getApiErrorMessage } from "@/shared/api/base/utils"

import { addOrderConsultationNote } from "../api/order-consultation-note-client.api"

export const useOrderConsultationNote = (
  orderId: string,
  initialNotes: OrderConsultationNote[]
) => {
  const [notes, setNotes] = useState(initialNotes)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const form = useForm<{ content: string }>({
    defaultValues: { content: "" },
  })
  const mutation = useMutation({
    mutationFn: (content: string) =>
      addOrderConsultationNote(orderId, content),
    onSuccess: (newNote) => {
      setNotes((currentNotes) => [newNote, ...currentNotes])
      form.reset()
      setSuccessMessage("상담 메모가 등록되었습니다.")
    },
  })
  const submit = form.handleSubmit(({ content }) => {
    setSuccessMessage(null)
    mutation.mutate(content.trim())
  })

  return {
    notes,
    form,
    submit,
    isAdding: mutation.isPending,
    successMessage,
    errorMessage: mutation.error ? getApiErrorMessage(mutation.error) : null,
  }
}
