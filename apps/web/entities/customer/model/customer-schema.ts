import { z } from "zod";

const customerNameSchema = z
  .string()
  .trim()
  .min(2, "이름을 2자 이상 입력해 주세요.")
  .max(30, "이름은 30자 이하로 입력해 주세요.");

const recipientNameSchema = z
  .string()
  .trim()
  .min(2, "받는 분 이름을 2자 이상 입력해 주세요.")
  .max(30, "받는 분 이름은 30자 이하로 입력해 주세요.");

const contactEmailSchema = z
  .string()
  .trim()
  .min(1, "이메일을 입력해 주세요.")
  .email("올바른 이메일 형식이 아닙니다.");

const koreanPhoneSchema = z
  .string()
  .trim()
  .min(1, "휴대폰 번호를 입력해 주세요.")
  .refine(
    (value) => /^010\d{8}$/.test(value.replace(/[^0-9]/g, "")),
    "010으로 시작하는 휴대폰 번호를 입력해 주세요.",
  );

const postalCodeSchema = z
  .string()
  .trim()
  .regex(/^\d{5}$/, "우편번호 5자리를 입력해 주세요.");

const addressLine1Schema = z
  .string()
  .trim()
  .min(5, "기본 주소를 입력해 주세요.")
  .max(120, "기본 주소는 120자 이하로 입력해 주세요.");

const addressLine2Schema = z
  .string()
  .trim()
  .max(120, "상세 주소는 120자 이하로 입력해 주세요.");

const deliveryMessageSchema = z
  .string()
  .trim()
  .max(100, "배송 메모는 100자 이하로 입력해 주세요.");

export {
  addressLine1Schema,
  addressLine2Schema,
  contactEmailSchema,
  customerNameSchema,
  deliveryMessageSchema,
  koreanPhoneSchema,
  postalCodeSchema,
  recipientNameSchema,
};
