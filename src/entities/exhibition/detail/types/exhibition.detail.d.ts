declare global {
    interface EXHIBITION_DETAIL_ITEM extends EXHIBITION_ITEM {
        phone: string; /** 전시회장 연락처 */
        price: string; /** 전시회 가격 */
        imgUrl: string; /** 이미지 src url */
        placeUrl: string; /** 전시회장 seq */
        placeAddr: string; /** 전시회장 주소 */
        url: string;
        contents1: string; /** 설명 */
        isFavorite : boolean /** 좋아요 한 전시 인지  */
    }

    type API_GET_EXHIBITION_DETAIL = RESPONSE_MODEL<EXHIBITION_DETAIL_ITEM>
}

export {}