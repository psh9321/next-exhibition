export function SrcHttpToHttps(src : string) : string {
    if(src.includes("http://")) {

        return src.replace("http://", "https://");
    }
    
    return src
}