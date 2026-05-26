import { CombineZero } from "./combineZero";

export function DateParser(date : Date | string) : {
    date : string,
    time : string
} {
    const time = new Date(date);
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

    const year = time.getFullYear();
    const month = CombineZero(time.getMonth()+1);
    const day = CombineZero(time.getDate());
    const weekDay = weekDays[time.getDay()];

    const hours = CombineZero(time.getHours());
    const min = CombineZero(time.getMinutes());

    return {
        date : `${year}.${month}.${day} (${weekDay})`,
        time : `${hours}:${min}`
    }        
}