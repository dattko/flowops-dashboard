import { z } from "zod";

const koreanPhoneSchema = z
  .string()
  .trim()
  .min(1, "휴대폰 번호를 입력해 주세요.")
  .refine(
    (value) => /^010\d{8}$/.test(value.replace(/[^0-9]/g, "")),
    "010으로 시작하는 휴대폰 번호를 입력해 주세요.",
  );

export const onboardingSchema = z.object({
  phone: koreanPhoneSchema,
  verificationCode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "인증번호 6자리를 입력해 주세요."),
  recipientName: z
    .string()
    .trim()
    .min(2, "받는 분 이름을 2자 이상 입력해 주세요.")
    .max(30, "받는 분 이름은 30자 이하로 입력해 주세요."),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "우편번호 5자리를 입력해 주세요."),
  addressLine1: z
    .string()
    .trim()
    .min(5, "기본 주소를 입력해 주세요.")
    .max(120, "기본 주소는 120자 이하로 입력해 주세요."),
  addressLine2: z
    .string()
    .trim()
    .max(120, "상세 주소는 120자 이하로 입력해 주세요."),
  deliveryMessage: z
    .string()
    .trim()
    .max(100, "배송 메모는 100자 이하로 입력해 주세요."),
  termsAccepted: z.boolean().refine(Boolean, {
    message: "이용약관과 개인정보 처리방침에 동의해 주세요.",
  }),
  marketingOptIn: z.boolean(),
});

export type OnboardingValues = z.infer<typeof onboardingSchema>;
