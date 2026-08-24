import "server-only"

import { baseApiFetcherServer } from "@/shared/api/base/base-fetcher-server"

import type { NavigationItem } from "../model/types"

export const getNavigation = async (): Promise<NavigationItem[]> => {
  return baseApiFetcherServer.post<NavigationItem[]>(
    "/rest/v1/rpc/get_admin_navigation"
  )
}
