import { z } from "zod"

const emailSchema = z
  .string()
  .trim()
  .min(1, "이메일을 입력해 주세요.")
  .email("올바른 이메일 형식이 아닙니다.")

export const findPasswordSchema = z.object({
  email: emailSchema,
})

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "새 비밀번호를 입력해 주세요.")
      .min(8, "비밀번호는 8자 이상이어야 합니다."),
    passwordConfirm: z
      .string()
      .min(1, "새 비밀번호를 한 번 더 입력해 주세요."),
  })
  .refine((values) => values.password === values.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  })

export type FindPasswordValues = z.infer<typeof findPasswordSchema>
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>
