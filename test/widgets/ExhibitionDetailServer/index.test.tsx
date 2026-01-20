import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ExhibitionDetailServer, generateMetadata } from "@/widgets/ExhibitionDetailServer";
import { API_EXHIBITION_DETAIL_SERVER } from "@/entities/exhibition/detail/api/exhibition.detail.server";

jest.mock("@/entities/exhibition/detail/api/exhibition.detail.server", () => ({
  API_EXHIBITION_DETAIL_SERVER: jest.fn(),
}));

// ✅ DetailWrapper를 mock으로 대체해서 seq prop 확인
jest.mock("@/entities/exhibition/detail/ui/DetailWrapper", () => ({
  DetailWrapper: ({ seq }: { seq: string }) => (
    <div data-testid="detail-wrapper">{seq}</div>
  ),
}));

describe("전시 상세페이지 서버컴포넌트 테스트", () => {
  it("generateMetadata 테스트 : API 결과로 metadata를 생성한다", async () => {
    (API_EXHIBITION_DETAIL_SERVER as jest.Mock).mockResolvedValue({
      title: "테스트 전시",
      place: "서울",
      startDate: "20250101",
      endDate: "20250131",
      imgUrl: "test.jpg",
    });

    const result = await generateMetadata({ params: { seq: "1" } });

    expect(result).toEqual(
      expect.objectContaining({
        title: "테스트 전시",
        description: "서울 | 2025.01.01~2025.01.31",
        openGraph: {
          type: "article",
          images: [{ url: "test.jpg" }],
        },
      }),
    );
  });

  it("API 결과가 없으면 빈 metadata를 반환한다", async () => {
    (API_EXHIBITION_DETAIL_SERVER as jest.Mock).mockResolvedValue(null);

    const result = await generateMetadata({ params: { seq: "1" } });

    expect(result).toEqual({});
  });

  it("DetailWrapper 컴포넌트가 seq prop과 함께 렌더링된다", async () => {
    const seq = "12345";
    const searchParams = Promise.resolve({ seq });

    // 서버컴포넌트 내부에서 API를 호출한다면 필요
    (API_EXHIBITION_DETAIL_SERVER as jest.Mock).mockResolvedValue({
      title: "테스트 전시",
      place: "서울",
      startDate: "20250101",
      endDate: "20250131",
      imgUrl: "test.jpg",
    });

    // ✅ 서버 컴포넌트는 “직접 호출”해서 element를 받아 render
    const element = await ExhibitionDetailServer(searchParams);

    render(
      <QueryClientProvider client={new QueryClient()}>
        {element}
      </QueryClientProvider>
    );

    expect(screen.getByTestId("detail-wrapper")).toHaveTextContent(seq);
  });
});
