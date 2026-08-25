"use client"

import { Save, Store, Truck, UserRound } from "lucide-react"

import type { AdminSettings } from "@/entities/settings"
import { Button } from "@/shared/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import { FormMessage, InputText } from "@/shared/ui/form"

import { useSettingsForm } from "../lib/use-settings-form"

export const SettingsForm = ({
  initialSettings,
}: {
  initialSettings: AdminSettings
}) => {
  const {
    form,
    submit,
    isSaving,
    successMessage,
    errorMessage,
  } = useSettingsForm(initialSettings)

  return (
    <form onSubmit={submit} className="space-y-5">
      <Card id="store-settings" className="scroll-mt-8">
        <CardHeader className="border-b">
          <div className="flex items-center gap-2">
            <Store className="size-4 text-primary" aria-hidden="true" />
            <CardTitle>상점 정보</CardTitle>
          </div>
          <CardDescription>
            고객에게 안내되는 스페셜티 커피 스토어의 기본 정보를 관리합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <InputText
            label="상점명"
            {...form.register("storeName", { required: true })}
          />
          <InputText
            label="사업자등록번호"
            placeholder="000-00-00000"
            {...form.register("businessNumber", { required: true })}
          />
          <InputText
            label="고객센터 이메일"
            type="email"
            {...form.register("supportEmail", { required: true })}
          />
          <InputText
            label="고객센터 연락처"
            {...form.register("supportPhone", { required: true })}
          />
        </CardContent>
      </Card>

      <Card id="shipping-settings" className="scroll-mt-8">
        <CardHeader className="border-b">
          <div className="flex items-center gap-2">
            <Truck className="size-4 text-primary" aria-hidden="true" />
            <CardTitle>배송 설정</CardTitle>
          </div>
          <CardDescription>
            주문 처리에 적용할 기본 배송 정책과 주소입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <InputText
            label="기본 배송비"
            type="number"
            min={0}
            description="원 단위로 입력합니다."
            {...form.register("defaultShippingFee", {
              required: true,
              valueAsNumber: true,
              min: 0,
            })}
          />
          <InputText
            label="무료 배송 기준"
            type="number"
            min={0}
            description="0원으로 입력하면 모든 주문이 무료 배송됩니다."
            {...form.register("freeShippingThreshold", {
              required: true,
              valueAsNumber: true,
              min: 0,
            })}
          />
          <InputText
            label="기본 택배사"
            {...form.register("defaultCarrier", { required: true })}
          />
          <InputText
            label="반품 배송비"
            type="number"
            min={0}
            {...form.register("returnShippingFee", {
              required: true,
              valueAsNumber: true,
              min: 0,
            })}
          />
          <InputText
            label="기본 출고지"
            containerClassName="sm:col-span-2"
            {...form.register("shippingAddress", { required: true })}
          />
          <InputText
            label="기본 반품지"
            containerClassName="sm:col-span-2"
            {...form.register("returnAddress", { required: true })}
          />
        </CardContent>
      </Card>

      <Card id="account-settings" className="scroll-mt-8">
        <CardHeader className="border-b">
          <div className="flex items-center gap-2">
            <UserRound className="size-4 text-primary" aria-hidden="true" />
            <CardTitle>내 계정</CardTitle>
          </div>
          <CardDescription>
            관리자 화면에서 사용할 프로필 정보를 관리합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <InputText
            label="관리자 이름"
            {...form.register("displayName", { required: true })}
          />
          <InputText
            label="로그인 이메일"
            type="email"
            value={initialSettings.account.email}
            disabled
            readOnly
            description="로그인 이메일은 Supabase Auth에서 관리합니다."
          />
          <InputText
            label="프로필 이미지 URL"
            type="url"
            containerClassName="sm:col-span-2"
            placeholder="https://"
            {...form.register("avatarUrl")}
          />
        </CardContent>
      </Card>

      <div className="flex flex-col items-start justify-between gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center">
        <div>
          <FormMessage
            errorMessage={errorMessage}
            successMessage={successMessage}
            defaultMessage="변경한 설정은 저장 즉시 관리자 화면에 반영됩니다."
          />
        </div>
        <Button type="submit" disabled={isSaving}>
          <Save aria-hidden="true" />
          {isSaving ? "저장 중..." : "설정 저장"}
        </Button>
      </div>
    </form>
  )
}
