
import pako from "pako"
 
export function DataEncrypt(params : string){

    if(process["env"]["NODE_ENV"] !== "production") return params

    const uint8array = new TextEncoder().encode(params)

    const result = pako.gzip(uint8array);

    return result
}

/**
 * 암호화된 문자열을 복호화 함
 * 
 * @returns {any} 복호화된 데이터 
 */
export function DataDecrypt(params : ArrayBuffer){

    if(process["env"]["NODE_ENV"] !== "production") return params

    const uint8Array = pako.ungzip(params);

    const str = new TextDecoder().decode(uint8Array);

    const result = JSON.parse(str);

    return result
}