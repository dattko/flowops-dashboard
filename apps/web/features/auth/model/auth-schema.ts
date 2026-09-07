import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, "이메일을 입력해 주세요.")
  .email("올바른 이메일 형식이 아닙니다.");

const passwordSchema = z
  .string()
  .min(8, "비밀번호는 8자 이상이어야 합니다.");

export const loginSchema = z.object({
  loginId: z
    .string()
    .trim()
    .min(1, "아이디를 입력해 주세요.")
    .refine(
      (value) =>
        /^[A-Za-z][A-Za-z0-9_]{3,19}$/.test(value) ||
        emailSchema.safeParse(value).success,
      "올바른 아이디를 입력해 주세요.",
    ),
  password: z.string().min(1, "비밀번호를 입력해 주세요."),
});

export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "이름은 2자 이상 입력해 주세요.")
      .max(30, "이름은 30자 이하로 입력해 주세요."),
    loginId: z
      .string()
      .trim()
      .regex(
        /^[A-Za-z][A-Za-z0-9_]{3,19}$/,
        "아이디는 영문으로 시작하는 4~20자의 영문·숫자·밑줄만 사용할 수 있습니다.",
      ),
    email: emailSchema,
    password: passwordSchema
      .regex(/[A-Za-z]/, "영문을 1자 이상 포함해 주세요.")
      .regex(/[0-9]/, "숫자를 1자 이상 포함해 주세요."),
    passwordConfirm: z.string().min(1, "비밀번호를 한 번 더 입력해 주세요."),
    phone: z
      .string()
      .trim()
      .refine(
        (value) => /^010\d{8}$/.test(value.replace(/[^0-9]/g, "")),
        "010으로 시작하는 휴대폰 번호를 입력해 주세요.",
      )
      .refine((value) => {
        const digits = value.replace(/[^0-9]/g, "");
        return /^0105550000[1-9]$/.test(digits) || digits === "01055500010";
      }, "무료 테스트 번호 010-5550-0001~0010을 사용해 주세요."),
    verificationCode: z
      .string()
      .trim()
      .refine((value) => value.trim() === "123456", "인증번호가 올바르지 않습니다."),
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
  })
  .refine((values) => values.password === values.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;
