import type { InputTextProps, InputTextareaProps } from "@/shared/ui/form";
import { InputText, InputTextarea } from "@/shared/ui/form";

type AddressInputProps = Omit<InputTextProps, "label">;
type DeliveryMessageInputProps = Omit<InputTextareaProps, "label">;

type ShippingAddressFieldsProps = {
  recipientName?: AddressInputProps;
  postalCode: AddressInputProps;
  addressLine1: AddressInputProps;
  addressLine2: AddressInputProps;
  deliveryMessage: DeliveryMessageInputProps;
};

const ShippingAddressFields = ({
  recipientName,
  postalCode,
  addressLine1,
  addressLine2,
  deliveryMessage,
}: ShippingAddressFieldsProps) => (
  <>
    {recipientName ? (
      <div className="grid gap-4 sm:grid-cols-2">
        <InputText label="받는 분" autoComplete="name" placeholder="받는 분 이름" {...recipientName} />
        <InputText label="우편번호" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="우편번호 5자리" {...postalCode} />
      </div>
    ) : (
      <InputText label="우편번호" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="우편번호 5자리" {...postalCode} />
    )}
    <InputText label="기본 주소" autoComplete="address-line1" placeholder="도로명 주소를 입력해 주세요" {...addressLine1} />
    <InputText label="상세 주소" autoComplete="address-line2" placeholder="동·호수 등 상세 주소" {...addressLine2} />
    <InputTextarea label="배송 메모 (선택)" rows={3} placeholder="예: 문 앞에 놓아주세요" {...deliveryMessage} />
  </>
);

export { ShippingAddressFields };
