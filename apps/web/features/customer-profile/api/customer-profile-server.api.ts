import "server-only";

import { cache } from "react";

import { baseApiFetcherServer } from "@/shared/api/base/base-fetcher-server";

import type { CustomerProfile } from "../model/types";

const getCustomerProfileServer = cache(async () =>
  baseApiFetcherServer.post<CustomerProfile>(
    "/rest/v1/rpc/get_my_customer_profile",
  ),
);

export { getCustomerProfileServer };
