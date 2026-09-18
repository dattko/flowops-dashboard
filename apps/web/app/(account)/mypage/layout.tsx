import { AccountNav } from "@/widgets/account-nav"

const MyPageLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <AccountNav />
    {children}
  </>
)

export default MyPageLayout
