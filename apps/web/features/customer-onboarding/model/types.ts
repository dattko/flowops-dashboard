type CustomerAddress = {
  recipientName: string;
  recipientPhone: string;
  postalCode: string;
  addressLine1: string;
  addressLine2: string | null;
  deliveryMessage: string | null;
};

export type CustomerOnboarding = {
  customerId: string;
  name: string;
  email: string;
  phone: string | null;
  phoneVerified: boolean;
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
