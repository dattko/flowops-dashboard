import type { Control, FieldPath, FieldValues } from "react-hook-form";

import { FormCheckbox } from "@/shared/ui/form";

type CustomerConsentFieldsProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  termsName?: FieldPath<TFieldValues>;
  marketingName: FieldPath<TFieldValues>;
};

const CustomerConsentFields = <TFieldValues extends FieldValues>({
  control,
  termsName,
  marketingName,
}: CustomerConsentFieldsProps<TFieldValues>) => (
  <div className="space-y-2 rounded-2xl bg-cream/55 p-4 text-sm leading-5">
    {termsName && (
      <FormCheckbox
        control={control}
        name={termsName}
        label={<><strong className="font-semibold">[필수]</strong> 이용약관 및 개인정보 수집·이용에 동의합니다.</>}
      />
    )}
    <FormCheckbox
      control={control}
      name={marketingName}
      label={<><strong className="font-semibold">[선택]</strong> 신상품과 할인 소식을 받아봅니다.</>}
    />
  </div>
);

export { CustomerConsentFields };
