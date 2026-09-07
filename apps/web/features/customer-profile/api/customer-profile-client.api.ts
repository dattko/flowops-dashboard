"use client";

import { baseApiFetcherClient } from "@/shared/api/base/base-fetcher-client";

import type { ProfileValues } from "../model/profile-schema";
import type { CustomerProfile } from "../model/types";

const getCustomerProfile = async (): Promise<CustomerProfile> => {
  return baseApiFetcherClient.post<CustomerProfile>(
    "/rest/v1/rpc/get_my_customer_profile",
  );
};

const updateCustomerProfile = async (
  values: ProfileValues,
): Promise<CustomerProfile> => {
  return baseApiFetcherClient.post<CustomerProfile>(
    "/rest/v1/rpc/update_my_customer_profile",
    {
      p_name: values.name,
      p_email: values.email,
      p_postal_code: values.postalCode,
      p_address_line1: values.addressLine1,
      p_address_line2: values.addressLine2 || null,
      p_delivery_message: values.deliveryMessage || null,
      p_marketing_opt_in: values.marketingOptIn,
    },
  );
};

export { getCustomerProfile, updateCustomerProfile };
