import { ExhibitionDateFormat } from "@/shared/util/dateFormat";

export function ExhibitionStatus(startDate : EXHIBITION_DETAIL_ITEM["startDate"], endDate : EXHIBITION_DETAIL_ITEM["endDate"]) : "전시 예정" | "전시 중" | "전시 종료" {
    const startTime = new Date(ExhibitionDateFormat(startDate).replaceAll(".","-"));
    const endTime = new Date(ExhibitionDateFormat(endDate).replaceAll(".","-"));

    const currentTime = new Date();

    if(currentTime < startTime) {
        return "전시 예정"
    }
    else {
        if(currentTime <= endTime) return "전시 중"
        else return "전시 종료"
    }
}