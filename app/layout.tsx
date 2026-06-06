import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Discover Exhibitions",
  description: "전국 문화정보를 한눈에 확인하세요",
  creator : "프론트엔드 개발자 박수현",
  publisher : "프론트엔드 개발자 박수현",
  keywords : ["전시", "전시 정보", "전국 전시 정보", "전시 정보 플랫폼", "exhibition", "discover exhibition", "exhibition discover"],
  appLinks : {
    web : {
      url : "https://exhibition.psh9321.cloud",
      should_fallback : true,
    }
  },
  category : "전시",
  other : {
    custom : "meta"
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ko" >
      <body>
        {children}
      </body>
    </html>
  );
}
