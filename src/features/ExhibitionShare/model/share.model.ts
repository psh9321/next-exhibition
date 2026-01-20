import { decode } from "he";

import { ExhibitionDateFormat } from "@/shared/lib/dateFormat";

export class KakaoShareModel {
    objectType : string;
    content : {
        title : string,
        description : string,
        imageUrl : string,
        link : {
            mobileWebUrl : string,
            webUrl : string
        }
    }

    constructor(item : EXHIBITION_DETAIL_ITEM) {

        const origin = process["env"]["NEXT_PUBLIC_DOMAIN"] as string;

        this.objectType = "feed";
        this.content = {
            title : decode(item["title"]),
            description: `장소 : ${item["place"]}\n날짜 : ${ExhibitionDateFormat(item["startDate"])}~${ExhibitionDateFormat(item["endDate"])}\n${item["contents1"]??""}`,
            imageUrl : item["imgUrl"],
            link : {
                mobileWebUrl : `${origin}/exhibition/${item["seq"]}`,
                webUrl : `${origin}/exhibition/${item["seq"]}`
            }
        }
    }
}