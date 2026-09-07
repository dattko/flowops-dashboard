export { customerQueryKeys } from "./api/customer-query-keys";
export { formatKoreanPhone, normalizeKoreanPhone } from "./lib/phone";
export {
  addressLine1Schema,
  addressLine2Schema,
  contactEmailSchema,
  customerNameSchema,
  deliveryMessageSchema,
  koreanPhoneSchema,
  postalCodeSchema,
  recipientNameSchema,
} from "./model/customer-schema";
export type { CustomerAddress, CustomerIdentity } from "./model/types";
export { CustomerConsentFields } from "./ui/customer-consent-fields";
export { ShippingAddressFields } from "./ui/shipping-address-fields";
