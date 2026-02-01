import type { Metadata } from "next"

import "./reset.css"
import "./font.css"

import { StyledComponentsRegistry } from "@/Provider/StyledComponentsRegistry";
import { LayoutWrapper } from "@/shared/ui/LayoutWrapper";
import QueryProvider from "@/Provider/QueryProvider";
import { KakaoInitializer } from "@/script/KakaoInitializer";

export const metadata : Metadata = {
  metadataBase: new URL("https://next-exhibition.vercel.app"),
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
      url : "https://next-exhibition.vercel.app",
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
    nocache : true,
    noimageindex : true,
    "max-video-preview" : -1,
    "max-snippet" :  -1,
    "max-image-preview" : "standard",
    googleBot : {
      index : true,
      follow : true,
      nocache : true,
      noimageindex : true,
      "max-video-preview" : -1,
      "max-snippet" :  -1,
      "max-image-preview" : "standard",
    }
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

        <div id="portal-root"></div>
      </body>
    </html>
  );
}
