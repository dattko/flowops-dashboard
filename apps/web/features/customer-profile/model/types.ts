import type { CustomerAddress, CustomerIdentity } from "@/entities/customer";

export type CustomerProfile = CustomerIdentity & {
  loginId: string | null;
  marketingOptIn: boolean;
  address: CustomerAddress | null;
};
