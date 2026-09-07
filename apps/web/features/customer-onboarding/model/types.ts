import type { CustomerAddress, CustomerIdentity } from "@/entities/customer";

export type CustomerOnboarding = CustomerIdentity & {
  customerId: string;
  onboardingCompleted: boolean;
  address: CustomerAddress | null;
};

export type CompleteOnboardingPayload = {
  recipientName: string;
  postalCode: string;
  addressLine1: string;
  addressLine2: string;
  deliveryMessage: string;
  termsAccepted: boolean;
  marketingOptIn: boolean;
};
