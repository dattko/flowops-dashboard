"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { useProfile } from "@/entities/profile"
import type { AdminSettings } from "@/entities/settings"
import { getApiErrorMessage } from "@/shared/api/base/utils"

import { updateSettings } from "../api/settings-client.api"
import type { SettingsFormValues } from "../model/types"

const getFormValues = (settings: AdminSettings): SettingsFormValues => ({
  ...settings.store,
  ...settings.shipping,
  displayName: settings.account.displayName ?? "",
  avatarUrl: settings.account.avatarUrl ?? "",
})

export const useSettingsForm = (initialSettings: AdminSettings) => {
  const { setProfile } = useProfile()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const form = useForm<SettingsFormValues>({
    defaultValues: getFormValues(initialSettings),
  })
  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: (settings) => {
      form.reset(getFormValues(settings))
      setProfile((profile) => ({
        ...profile,
        displayName: settings.account.displayName,
        avatarUrl: settings.account.avatarUrl,
      }))
      setSuccessMessage("설정이 저장되었습니다.")
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
