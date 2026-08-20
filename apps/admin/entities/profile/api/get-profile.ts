import "server-only"

import { baseApiFetcherServer } from "@/shared/api/base/base-api-fetcher-server"

import type { Profile } from "../model/types"

export const getProfile = async (): Promise<Profile> => {
  return baseApiFetcherServer.post<Profile>(
    "/rest/v1/rpc/get_my_profile"
  )
}