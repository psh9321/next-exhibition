
/** Fade in or out */
type ANIMATION_TYPE = "in" | "out";

/** 애니메이션 진행 시간 */
type DURATION = number;

/** 애니메이션 종료 시 콜백 */
type END_CALLBACK = () => void | undefined;

/** Fade In or Out + Scale */
export function FadeInOutScaleAnimation<T extends HTMLElement>(element : T, type : ANIMATION_TYPE, duration : DURATION, endCallback? : END_CALLBACK) {
    const start = performance.now();

    function AnimCallback(time : number) {
        const calcTime = time - start;
        const progress = Math.min(calcTime / duration, 1);

        const isIn = type === "in";

        element.style.transform = `scale(${isIn ? `${progress}` : `${1 - progress}`})`;
        element.style.opacity = isIn ? `${progress}` : `${1 - progress}`;

        if(progress < 1) {
            requestAnimationFrame(AnimCallback);
        }
        else {
            if(endCallback) {
                const timer = setTimeout(() => {
                    endCallback();
                    clearTimeout(timer)
                }, duration);
            }
        }
    }

    requestAnimationFrame(AnimCallback);
}
