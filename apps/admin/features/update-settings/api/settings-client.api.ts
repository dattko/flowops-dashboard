"use client"

import type { AdminSettings } from "@/entities/settings"
import { baseApiFetcherClient } from "@/shared/api/base/base-fetcher-client"

import type { SettingsFormValues } from "../model/types"

export const updateSettings = async (
  values: SettingsFormValues
): Promise<AdminSettings> => {
  return baseApiFetcherClient.post<AdminSettings>(
    "/rest/v1/rpc/update_admin_settings",
    {
      p_payload: values,
    }
  )
}
