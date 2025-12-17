import IndexPageServer from "@/app/(pages)/(index)/page";
import { API_EXHIBITION_LIST_SERVER } from "@/api/openApi.server";

jest.mock("@/api/openApi.server.ts", () => ({
    API_EXHIBITION_LIST_SERVER : jest.fn(),
}));

jest.mock(
    "@/app/(pages)/(index)/_view",
    () => () => <div>MOCK_INDEX_VIEW</div>
);

describe("@/app/(pages)/(index)/page.tsx 테스트", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it("검색어 없을때 (기본)", async () => {
      (API_EXHIBITION_LIST_SERVER as jest.Mock).mockResolvedValue({
        data: {
          page: 1,
          total: 0,
          limit: 24,
          data: [],
        },
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
        data: {
          page: 1,
          total: 48,
          limit: 24,
          data: [],
        },
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
  