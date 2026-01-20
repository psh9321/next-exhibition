import IndexPageServer from "@/app/(pages)/(index)/page";
import { API_EXHIBITION_LIST_SERVER } from "@/entities/exhibition/list/api/exhibition.list.server";

jest.mock("@/entities/exhibition/list/api/exhibition.list.server", () => ({
    API_EXHIBITION_LIST_SERVER: jest.fn(),
}));

jest.mock("@/app/(pages)/(index)/_view", () => () => (
    <div>MOCK_INDEX_VIEW</div>
));

describe("전시 목록 페이지 테스트", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
 
    it("기본(검색어없음) or 지역전체", async () => {
        (API_EXHIBITION_LIST_SERVER as jest.Mock).mockResolvedValue({
            page: 1,
            total: 0,
            limit: 24,
            data: [],
        });

        const element = await IndexPageServer({
            searchParams: Promise.resolve({
                searchCategory: "A",
            }),
        });

        expect(API_EXHIBITION_LIST_SERVER).toHaveBeenCalled();
        expect(element).toBeDefined();
    });

    it("검색어 입력, 셀렉트 박스 선택후 replace 시 queryString 로 api 호출", async () => {
        (API_EXHIBITION_LIST_SERVER as jest.Mock).mockResolvedValue({
            page: 1,
            total: 48,
            limit: 24,
            data: [],
        });

        await IndexPageServer({
            searchParams: Promise.resolve({
                searchArea: "서울",
                searchKeyword: "전시",
                searchCategory: "A",
            }),
        });

        expect(API_EXHIBITION_LIST_SERVER).toHaveBeenCalledTimes(1);
    });
});
