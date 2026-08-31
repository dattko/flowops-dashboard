import { z } from "zod"

export const addAdminSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "이메일을 입력해 주세요.")
    .email("올바른 이메일 형식이 아닙니다."),
  displayName: z
    .string()
    .trim()
    .min(1, "관리자 이름을 입력해 주세요.")
    .max(50, "관리자 이름은 50자 이하로 입력해 주세요."),
})

export const acceptAdminInvitationSchema = z
  .object({
    password: z
      .string()
      .min(1, "비밀번호를 입력해 주세요.")
      .min(8, "비밀번호는 8자 이상이어야 합니다."),
    passwordConfirm: z
      .string()
      .min(1, "비밀번호를 한 번 더 입력해 주세요."),
  })
  .refine((values) => values.password === values.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  })

export const revokeAdminSchema = z.object({
  userId: z.string().uuid(),
})

export type AddAdminValues = z.infer<typeof addAdminSchema>
export type AcceptAdminInvitationValues = z.infer<
  typeof acceptAdminInvitationSchema
>
