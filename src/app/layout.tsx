import "./reset.css"
import "./font.css"

import { StyledComponentsRegistry } from "@/Provider/StyledComponentsRegistry";
import { LayoutWrapper } from "@/shared/ui/LayoutWrapper";
import QueryProvider from "@/Provider/QueryProvider";
import { KakaoInitializer } from "@/script/KakaoInitializer";

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
