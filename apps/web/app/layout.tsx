import type { Metadata } from "next"
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css"
import { SiteHeader } from "@/widgets/site-header"
import { SiteFooter } from "@/widgets/site-footer"
import "./globals.css"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Morrow Coffee | 매일의 리듬을 위한 커피",
    template: "%s | Morrow Coffee",
  },
  description:
    "좋은 원두가 필요한 순간, 취향에 맞는 스페셜티 커피를 만나보세요.",
  applicationName: "Morrow Coffee",
  openGraph: {
    title: "Morrow Coffee | 매일의 리듬을 위한 커피",
    description:
      "좋은 원두가 필요한 순간, 취향에 맞는 스페셜티 커피를 만나보세요.",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Morrow Coffee - 매일의 리듬을 위한 커피",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morrow Coffee | 매일의 리듬을 위한 커피",
    description:
      "좋은 원두가 필요한 순간, 취향에 맞는 스페셜티 커피를 만나보세요.",
    images: ["/og.png"],
  },
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="ko">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}

export default RootLayout
