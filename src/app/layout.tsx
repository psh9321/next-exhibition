import "./reset.css"
import "./font.css"


import { LAYOUT_CHILD } from "@/types/component"

import { StyledComponentsRegistry } from "@/component/shared/StyledComponentsRegistry/Index";
import { LayoutWrapper } from "@/component/shared/LayoutWrapper/Index";
import QueryProvider from "@/component/shared/Provider/QueryProvider/Index";
import { KakaoInitializer } from "@/component/script/KakaoInitializer";


export const metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Discover Exhibitions",
    template: "%s | 전시 정보 플랫폼",
  },
  description: "전국 전시 정보를 한눈에 확인하세요",
  openGraph: {
    siteName: "전시 정보 플랫폼 ()",
    type: "website",
  },
};
export default function RootLayout({ children }: LAYOUT_CHILD) {

  
  return (
    <html lang="ko">
      <body>

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
