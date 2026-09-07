import { z } from "zod";

import {
  addressLine1Schema,
  addressLine2Schema,
  contactEmailSchema,
  customerNameSchema,
  deliveryMessageSchema,
  postalCodeSchema,
} from "@/entities/customer";

export const profileSchema = z.object({
  name: customerNameSchema,
  email: contactEmailSchema,
  postalCode: postalCodeSchema,
  addressLine1: addressLine1Schema,
  addressLine2: addressLine2Schema,
  deliveryMessage: deliveryMessageSchema,
  marketingOptIn: z.boolean(),
});

export type ProfileValues = z.infer<typeof profileSchema>;
