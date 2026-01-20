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

export {};