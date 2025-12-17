'use client'

import Script from "next/script";

export const KakaoInitializer = () => {
    return (
      <Script 
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
        integrity="sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6"
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onLoad={() => {
          window.Kakao.init(process["env"]["NEXT_PUBLIC_KAKAO_KEY"] as string);
        }}
      ></Script>
    );
};