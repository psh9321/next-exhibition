export {}; // ← 반드시 있어야 함 (모듈로 만들기)

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (params: any) => void;
      };
    };
  }
}