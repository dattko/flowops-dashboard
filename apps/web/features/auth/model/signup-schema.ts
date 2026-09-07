import { z } from "zod";

import {
  addressLine1Schema,
  addressLine2Schema,
  contactEmailSchema,
  customerNameSchema,
  deliveryMessageSchema,
  koreanPhoneSchema,
  postalCodeSchema,
} from "@/entities/customer";

const passwordSchema = z
  .string()
  .min(8, "비밀번호는 8자 이상이어야 합니다.");

export const signupSchema = z
  .object({
    name: customerNameSchema,
    loginId: z
      .string()
      .trim()
      .regex(
        /^[A-Za-z][A-Za-z0-9_]{3,19}$/,
        "아이디는 영문으로 시작하는 4~20자의 영문·숫자·밑줄만 사용할 수 있습니다.",
      ),
    email: contactEmailSchema,
    password: passwordSchema
      .regex(/[A-Za-z]/, "영문을 1자 이상 포함해 주세요.")
      .regex(/[0-9]/, "숫자를 1자 이상 포함해 주세요."),
    passwordConfirm: z.string().min(1, "비밀번호를 한 번 더 입력해 주세요."),
    phone: koreanPhoneSchema.refine((value) => {
        const digits = value.replace(/[^0-9]/g, "");
        return /^0105550000[1-9]$/.test(digits) || digits === "01055500010";
      }, "무료 테스트 번호 010-5550-0001~0010을 사용해 주세요."),
    verificationCode: z
      .string()
      .trim()
      .refine((value) => value.trim() === "123456", "인증번호가 올바르지 않습니다."),
    postalCode: postalCodeSchema,
    addressLine1: addressLine1Schema,
    addressLine2: addressLine2Schema,
    deliveryMessage: deliveryMessageSchema,
    termsAccepted: z.boolean().refine(Boolean, {
      message: "이용약관과 개인정보 처리방침에 동의해 주세요.",
    }),
    marketingOptIn: z.boolean(),
  })
  .refine((values) => values.password === values.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type SignupValues = z.infer<typeof signupSchema>;
