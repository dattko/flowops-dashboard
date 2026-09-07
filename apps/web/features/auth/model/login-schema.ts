import { z } from "zod";

const emailSchema = z.string().trim().email();

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

export type LoginValues = z.infer<typeof loginSchema>;
