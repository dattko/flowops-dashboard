import type { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  CustomerProfileForm,
  getCustomerProfileServer,
} from "@/features/customer-profile";
import { ROUTES } from "@/shared/config/routes";
import { createClient } from "@/shared/lib/supabase/server";
import { MemberShell } from "@/widgets/member-shell";

export const metadata: Metadata = {
  title: "내 정보 수정",
  description: "회원 정보와 기본 배송지를 관리하세요.",
};

const ProfilePage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(ROUTES.login);

  const initialProfile = await getCustomerProfileServer();

  return (
    <MemberShell
      eyebrow="MY MORROW"
      title="내 정보 수정"
      description="연락처와 기본 배송지 정보를 최신 상태로 관리해 주세요."
    >
      <CustomerProfileForm initialProfile={initialProfile} />
    </MemberShell>
  );
};

export default ProfilePage;
