type CustomerAddress = {
  recipientName?: string;
  recipientPhone?: string;
  postalCode: string;
  addressLine1: string;
  addressLine2: string | null;
  deliveryMessage: string | null;
};

type CustomerIdentity = {
  name: string;
  email: string;
  phone: string | null;
  phoneVerified: boolean;
};

export type { CustomerAddress, CustomerIdentity };
