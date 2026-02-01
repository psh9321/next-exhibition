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

        this.objectType = "feed";
        this.content = {
            title : decode(item["title"]),
            description: `장소 : ${item["place"]}\n날짜 : ${ExhibitionDateFormat(item["startDate"])}~${ExhibitionDateFormat(item["endDate"])}\n${item["contents1"]??""}`,
            imageUrl : item["imgUrl"],
            link : {
                mobileWebUrl : window.location.href,
                webUrl : window.location.href
            }
        }
    }
}