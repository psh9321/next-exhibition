import { generateMetadata } from "@/component/shared/ExhibitionDetailServer/Index";
import { API_EXHIBITION_DETAIL } from "@/api/openApi.server";

jest.mock("@/api/openApi.server", () => ({
  API_EXHIBITION_DETAIL: jest.fn(),
}));

describe("Exhibition Detail Page - Server Logic", () => {
  it("generateMetadata는 API 결과로 metadata를 생성한다", async () => {
    (API_EXHIBITION_DETAIL as jest.Mock).mockResolvedValue({
      resultCode: 200,
      data: {
        title: "테스트 전시",
        place: "서울",
        startDate: "20250101",
        endDate: "20250131",
        imgUrl: "test.jpg",
      },
    });

    const result = await generateMetadata({
      params: { seq: "1" },
    });

    expect(result).toEqual(
      expect.objectContaining({
        title: "테스트 전시",
        description: "서울 | 2025.01.01~2025.01.31",
        openGraph: {
          type: "article",
          images: [{ url: "test.jpg" }],
        },
      })
    );
  });

  it("API 결과가 없으면 빈 metadata를 반환한다", async () => {
    (API_EXHIBITION_DETAIL as jest.Mock).mockResolvedValue(null);

    const result = await generateMetadata({
      params: { seq: "1" },
    });

    expect(result).toEqual({});
  });
});