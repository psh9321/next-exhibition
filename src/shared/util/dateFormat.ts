import { CombineZero } from "./combineZero";

export function ExhibitionDateFormat(dateNo : number | string) : string {

    if(typeof dateNo === "number" && dateNo <= 0) return "-999";

    const dateStr = String(dateNo);

    if(dateStr.length < 8) return dateStr;

    const year = dateStr.substring(0,4);
    const month = dateStr.substring(4,6);
    const day = dateStr.substring(6,8)
    
    return `${year}.${month}.${day}`
}

export function DateFormat(date : Date, isSecond? : boolean) {
    const time = new Date(date);

    const year = time.getFullYear();
    const month = CombineZero(time.getMonth()+1);
    const day = CombineZero(time.getDate());

    const result = `${year}.${month}.${day}`

    if(isSecond) {
        const hours = CombineZero(time.getHours());
        const min = CombineZero(time.getMinutes());
        const second = CombineZero(time.getSeconds());

        return `${result} ${hours}:${min}:${second}`
    }
    else {
        return result
    }

    
}