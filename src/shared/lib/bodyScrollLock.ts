export function BodyScrollLock (is : boolean) {
    document.body.style.overflow = is ? "hidden" : ""
}