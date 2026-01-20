declare global {

    /** 조회할 지역 */
    type DISTRICT = "서울" | "경기" | "세종" | "대전" | "대구" | "부산" | "광주" | "제주" | "강원" | "경남" | "경북" | "울산" | "인천" | "전남" | "전북" | "충남" | "충북";

    /** 분야별구분 (A:공연/전시, B:행사/축제, C:교육/체험) */
    type SERVICE_TYPE = "A" | "B" | "C"; 

    /** 정렬기준 (1:등록일, 2:공연명, 3:지역) */
    type SORT_STDR = "1" | "2" | "3"; 

    /** 분야별구분(A:공연/전시, B:행사/축제, C:교육/체험) */
    type EXHIBITION_CATEGORY = "A" | "B" | "C";

    interface EXHIBITION_ITEM {
        serviceName: string; /** ex) 공연/전시 */
        seq: string; /** ex) 311142 */
        title: string; /** ex) 창작의 순간 - 예술가의 작업실 */
        startDate: string; /** ex) 20250214 */
        endDate: string; /** ex) 20250214 */
        place: string; /** ex) 국립현대미술관 서울관 */
        realmName: string; /** ex) 전시 */
        area: DISTRICT | string; /** ex) 서울, 경기 ... */
        thumbnail: string; /** image src url */
        gpsX: string; /** ex) 126.98010361777375 */
        gpsY: string; /** ex) 37.578627490528596 */
        sigungu: string; /** 시, 군, 구 */
        serviceName: string; /** 카테고리(서비스명) */
    }

    interface EXHIBITION_DETAIL_ITEM extends EXHIBITION_ITEM {
        phone: string; /** 전시회장 연락처 */
        price: string; /** 전시회 가격 */
        imgUrl: string; /** 이미지 src url */
        placeUrl: string; /** 전시회장 seq */
        placeAddr: string; /** 전시회장 주소 */
        url: string;
        contents1: string; /** 설명 */
    }
}

export {};
