import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useInterSectionObserver } from "@/hook/useInterSectionObserver";
import { ExhibitionList } from "@/component/(pages)/(index)/ExhibitionList/Index";
import { API_EXHIBITION_LIST_CLIENT } from "@/api/openApi.client";

interface TEST {
  searchArea?: string;
  searchKeyword?: string;
  searchCategory?: string;
}

jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: (key: string) => {
      const params: TEST = {
        searchArea: undefined,
        searchKeyword: undefined,
        searchCategory: undefined,
      };
      return params[key as keyof TEST];
    },
  }),
}));

jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");
  return {
    ...original,
    useInfiniteQuery: jest.fn(),
  };
});

jest.mock("@/hook/useInterSectionObserver", () => ({
  useInterSectionObserver: jest.fn(),
}));

jest.mock("@/api/openApi.client", () => ({
  API_EXHIBITION_LIST_CLIENT: jest.fn(),
}));

/** test data */
const data = {
  pages: [
    {
      page: 1,
      total: 1,
      limit: 24,
      data: [
        {
          seq: 1,
          title: "테스트 전시",
          place: "서울",
          area: "미술",
          thumbnail: "/test.jpg",
          startDate: "20250101",
          endDate: "20250131",
        },
      ],
    },
  ],
};

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("전시 목록", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // ✅ 기본 hook mock (모든 테스트 안전)
    (useInterSectionObserver as jest.Mock).mockReturnValue({
      ref: { current: null },
      isView: false,
    });
  });

  it("useInfiniteQuery를 호출함", () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data,
      fetchNextPage: API_EXHIBITION_LIST_CLIENT,
      isLoading: false,
    });

    renderWithClient(<ExhibitionList />);

    expect(useInfiniteQuery).toHaveBeenCalled();
  });

  it("데이터가 있을 때 전시 목록을 렌더링 함", () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data,
      fetchNextPage: jest.fn(),
      isLoading: false,
    });

    renderWithClient(<ExhibitionList />);

    expect(screen.getByText("테스트 전시")).toBeInTheDocument();
    expect(screen.getByText("서울")).toBeInTheDocument();
    expect(screen.getByText("미술")).toBeInTheDocument();
  });

  it("isView가 true가 되면 fetchNextPage를 호출 함", async () => {
    const fetchNextPage = jest.fn();

    (useInterSectionObserver as jest.Mock).mockReturnValue({
      ref: { current: null },
      isView: true,
    });

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data,
      fetchNextPage,
      isLoading: false,
    });

    renderWithClient(<ExhibitionList />);

    await waitFor(() => {
      expect(fetchNextPage).toHaveBeenCalledTimes(1);
    });
  });
});
