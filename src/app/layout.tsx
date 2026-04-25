import type { Metadata } from "next"

import { DIST_VER } from "version"

import "./reset.css"
import "./font.css"

import { StyledComponentsRegistry } from "@/provider/StyledComponentsRegistry";
import { LayoutWrapper } from "@/shared/ui/LayoutWrapper";
import QueryProvider from "@/provider/QueryProvider";
import { KakaoInitializer } from "@/script/KakaoInitializer";
import { LoadingView } from "@/shared/ui/LoadingView";

export const metadata : Metadata = {
  verification : {
    google : "YNRCvA1ZisdnrnUT_ide10_p6OFQtGi7Ktcdg1sSeXQ"
  },
  metadataBase: new URL("https://exhibition.psh9321-portfolio.p-e.kr"),
  creator : "프론트엔드 개발자 박수현",
  publisher : "프론트엔드 개발자 박수현",
  title: {
    default: "Discover Exhibitions",
    template: "%s | 전시 정보 플랫폼",
  },
  description: "전국 전시 정보를 한눈에 확인하세요",
  keywords : ["전시", "전시 정보", "전국 전시 정보", "전시 정보 플랫폼", "exhibition", "discover exhibition", "exhibition discover"],
  appLinks : {
    web : {
      url : "https://exhibition.psh9321-portfolio.p-e.kr",
      should_fallback : true,
    }
  },
  category : "전시",
  other : {
    custom : "meta"
  },
  robots : {
    index : true,
    follow : true,
  },
};


export default function RootLayout({ children }: LAYOUT_CHILD) {
  return (
    <html lang="ko">
      <body cz-shortcut-listen="true">

        <KakaoInitializer/>

        <StyledComponentsRegistry>
          <LayoutWrapper>
              <QueryProvider>
                {children}
              </QueryProvider>
          </LayoutWrapper>
        </StyledComponentsRegistry>

        <LoadingView/>
        <h2 className="hidden">{DIST_VER}</h2>
      </body>
    </html>
  );
}
