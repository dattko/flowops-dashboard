import "server-only"

import type { AdminSettings } from "@/entities/settings"
import { baseApiFetcherServer } from "@/shared/api/base/base-fetcher-server"

export const getSettings = async (): Promise<AdminSettings> => {
  return baseApiFetcherServer.post<AdminSettings>(
    "/rest/v1/rpc/get_admin_settings"
  )
}
