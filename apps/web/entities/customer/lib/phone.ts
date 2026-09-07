const normalizeKoreanPhone = (phone: string) => {
  const digits = phone.replace(/[^0-9]/g, "");
  return digits.startsWith("0") ? `+82${digits.slice(1)}` : `+${digits}`;
};

const formatKoreanPhone = (phone: string | null) => {
  if (!phone) return "";
  return phone.replace(/^\+82(\d{2})(\d{4})(\d{4})$/, "0$1-$2-$3");
};

export { formatKoreanPhone, normalizeKoreanPhone };
