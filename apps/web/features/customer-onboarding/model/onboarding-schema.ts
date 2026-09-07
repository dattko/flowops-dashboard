import { z } from "zod";

import {
  addressLine1Schema,
  addressLine2Schema,
  deliveryMessageSchema,
  koreanPhoneSchema,
  postalCodeSchema,
  recipientNameSchema,
} from "@/entities/customer";

export const onboardingSchema = z.object({
  phone: koreanPhoneSchema,
  verificationCode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "인증번호 6자리를 입력해 주세요."),
  recipientName: recipientNameSchema,
  postalCode: postalCodeSchema,
  addressLine1: addressLine1Schema,
  addressLine2: addressLine2Schema,
  deliveryMessage: deliveryMessageSchema,
  termsAccepted: z.boolean().refine(Boolean, {
    message: "이용약관과 개인정보 처리방침에 동의해 주세요.",
  }),
  marketingOptIn: z.boolean(),
});

export type OnboardingValues = z.infer<typeof onboardingSchema>;
