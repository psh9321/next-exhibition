import { render, screen } from "@testing-library/react";

// -------------------- mocks --------------------
const mockFetchNextPage = jest.fn();

// next/navigation
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

// react-query
jest.mock("@tanstack/react-query", () => ({
  useInfiniteQuery: jest.fn(),
}));

// intersection observer hook
jest.mock("@/shared/hook/useInterSectionObserver", () => ({
  useInterSectionObserver: jest.fn(),
}));

// zustand store
jest.mock("@/shared/store/useLoadingStore", () => ({
  useLoadingStore: jest.fn(),
}));

// api
jest.mock("@/entities/exhibition/list/api/exhibition.list.client", () => ({
  API_EXHIBITION_LIST_CLIENT: jest.fn(),
}));

// body scroll lock
jest.mock("@/shared/lib/bodyScrollLock", () => ({
  BodyScrollLock: jest.fn(),
}));

// UI children (복잡한 내부 UI는 테스트 대상 아님 → 더미로 치환)
jest.mock("@/entities/exhibition/list/ui/EmptyItem", () => ({
  EmptyItem: () => <div data-testid="empty-item">EMPTY</div>,
}));

jest.mock("@/entities/exhibition/list/ui/ExhibitionItem", () => ({
  ExhibitionItem: ({ item }: any) => (
    <li data-testid="exhibition-item">{item?.title}</li>
  ),
}));

jest.mock("@/shared/ui/Loading", () => ({
  FetchLoadingElement: () => <div data-testid="fetch-loading">LOADING</div>,
}));

// styled wrappers (의미 없음 → 단순 태그로 대체)
jest.mock("@/widgets/ExhibitionList/_html.ts", () => ({
  Article: ({ children }: any) => <article>{children}</article>,
  Ul: ({ children }: any) => <ul>{children}</ul>,
}));

// -------------------- imports for typed access --------------------
import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInterSectionObserver } from "@/shared/hook/useInterSectionObserver";
import { useLoadingStore } from "@/shared/store/useLoadingStore";
import { API_EXHIBITION_LIST_CLIENT } from "@/entities/exhibition/list/api/exhibition.list.client";
import { BodyScrollLock } from "@/shared/lib/bodyScrollLock";
import { ExhibitionList } from "@/widgets/ExhibitionList";

const useSearchParamsMock = useSearchParams as unknown as jest.Mock;
const useInfiniteQueryMock = useInfiniteQuery as unknown as jest.Mock;
const useInterSectionObserverMock = useInterSectionObserver as unknown as jest.Mock;
const useLoadingStoreMock = useLoadingStore as unknown as jest.Mock;
const API_EXHIBITION_LIST_CLIENT_Mock = API_EXHIBITION_LIST_CLIENT as unknown as jest.Mock;
const BodyScrollLockMock = BodyScrollLock as unknown as jest.Mock;

// -------------------- helpers --------------------
function makeSearchParams(entries: Array<[string, string]>) {
  return {
    get: (key: string) => entries.find(([k]) => k === key)?.[1] ?? null,
    entries: function* () {
      for (const e of entries) yield e;
    },
  };
}

describe("ExhibitionList", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // env query key (테스트 환경에서 process.env 흉내)
    process.env.NEXT_PUBLIC_QUERY_KEY_EXHIBITION = "exhibition";
  });

  test("빈 데이터(total<=0)면 EmptyItem을 보여준다", () => {
    useSearchParamsMock.mockReturnValue(makeSearchParams([]));

    useInterSectionObserverMock.mockReturnValue({
      ref: jest.fn(),
      isView: false,
    });

    useLoadingStoreMock.mockReturnValue({
      SetLoadingStatus: jest.fn(),
    });

    useInfiniteQueryMock.mockReturnValue({
      data: { pages: [{ total: 0, data: [] }] },
      fetchNextPage: mockFetchNextPage,
      isLoading: false,
    });

    render(<ExhibitionList />);

    expect(screen.getByTestId("empty-item")).toBeInTheDocument();
    expect(screen.queryAllByTestId("exhibition-item")).toHaveLength(0);
    expect(screen.getByTestId("fetch-loading")).toBeInTheDocument();
  });

  test("데이터가 있으면 ExhibitionItem들을 렌더링한다", () => {
    useSearchParamsMock.mockReturnValue(makeSearchParams([]));

    useInterSectionObserverMock.mockReturnValue({
      ref: jest.fn(),
      isView: false,
    });

    useLoadingStoreMock.mockReturnValue({
      SetLoadingStatus: jest.fn(),
    });

    useInfiniteQueryMock.mockReturnValue({
      data: {
        pages: [
          {
            total: 2,
            page: 1,
            limit: 10,
            data: [{ title: "A" }, { title: "B" }],
          },
        ],
      },
      fetchNextPage: mockFetchNextPage,
      isLoading: false,
    });

    render(<ExhibitionList />);

    const items = screen.getAllByTestId("exhibition-item");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("A");
    expect(items[1]).toHaveTextContent("B");
    expect(screen.queryByTestId("empty-item")).toBeNull();
  });

  test("sentinel이 보이고(isView=true), 로딩중이 아니고, empty가 아니면 fetchNextPage를 호출한다", () => {
    useSearchParamsMock.mockReturnValue(makeSearchParams([]));

    useInterSectionObserverMock.mockReturnValue({
      ref: jest.fn(),
      isView: true,
    });

    useLoadingStoreMock.mockReturnValue({
      SetLoadingStatus: jest.fn(),
    });

    useInfiniteQueryMock.mockReturnValue({
      data: {
        pages: [
          { total: 10, page: 1, limit: 10, data: [{ title: "A" }] },
        ],
      },
      fetchNextPage: mockFetchNextPage,
      isLoading: false,
    });

    render(<ExhibitionList />);

    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
  });

  test("로딩중이면(isLoading=true) isView=true여도 fetchNextPage를 호출하지 않는다", () => {
    useSearchParamsMock.mockReturnValue(makeSearchParams([]));

    useInterSectionObserverMock.mockReturnValue({
      ref: jest.fn(),
      isView: true,
    });

    useLoadingStoreMock.mockReturnValue({
      SetLoadingStatus: jest.fn(),
    });

    useInfiniteQueryMock.mockReturnValue({
      data: {
        pages: [
          { total: 10, page: 1, limit: 10, data: [{ title: "A" }] },
        ],
      },
      fetchNextPage: mockFetchNextPage,
      isLoading: true,
    });

    render(<ExhibitionList />);

    expect(mockFetchNextPage).not.toHaveBeenCalled();
  });

  test("useInfiniteQuery가 queryKey에 searchParams 기반 객체를 포함해 호출된다", () => {
    useSearchParamsMock.mockReturnValue(
      makeSearchParams([
        ["searchArea", "seoul"],
        ["searchKeyword", "art"],
        ["searchCategory", "A"],
      ])
    );

    useInterSectionObserverMock.mockReturnValue({
      ref: jest.fn(),
      isView: false,
    });

    useLoadingStoreMock.mockReturnValue({
      SetLoadingStatus: jest.fn(),
    });

    useInfiniteQueryMock.mockReturnValue({
      data: { pages: [{ total: 0, data: [] }] },
      fetchNextPage: mockFetchNextPage,
      isLoading: false,
    });

    render(<ExhibitionList />);

    expect(useInfiniteQueryMock).toHaveBeenCalledTimes(1);

    const callArg = useInfiniteQueryMock.mock.calls[0][0];
    expect(callArg.queryKey[0]).toBe("exhibition");
    expect(callArg.queryKey[1]).toBe("list");
    expect(callArg.queryKey[2]).toEqual({
      searchArea: "seoul",
      searchKeyword: "art",
      searchCategory: "A",
    });
  });

  test("getNextPageParam 로직: 마지막 페이지면 undefined, 다음페이지 있으면 page+1", () => {
    useSearchParamsMock.mockReturnValue(makeSearchParams([]));

    useInterSectionObserverMock.mockReturnValue({
      ref: jest.fn(),
      isView: false,
    });

    useLoadingStoreMock.mockReturnValue({
      SetLoadingStatus: jest.fn(),
    });

    useInfiniteQueryMock.mockReturnValue({
      data: { pages: [{ total: 0, data: [] }] },
      fetchNextPage: mockFetchNextPage,
      isLoading: false,
    });

    render(<ExhibitionList />);

    const { getNextPageParam } = useInfiniteQueryMock.mock.calls[0][0];

    // total=100, limit=10 => totalPage=10, page=1 => 2
    expect(getNextPageParam({ total: 100, limit: 10, page: 1 })).toBe(2);

    // page=10이면 마지막 => undefined
    expect(getNextPageParam({ total: 100, limit: 10, page: 10 })).toBeUndefined();

    // total<=0 => undefined
    expect(getNextPageParam({ total: 0, limit: 10, page: 1 })).toBeUndefined();

    // lastPage falsy => undefined
    expect(getNextPageParam(undefined)).toBeUndefined();
  });

  test("queryFn(Setup)이 호출되면 로딩 상태/스크롤락/API 호출이 기대대로 동작한다", async () => {
    const SetLoadingStatus = jest.fn();

    useSearchParamsMock.mockReturnValue(
      makeSearchParams([
        ["searchArea", "seoul"],
        ["searchKeyword", "art"],
      ])
    );

    useInterSectionObserverMock.mockReturnValue({
      ref: jest.fn(),
      isView: false,
    });

    useLoadingStoreMock.mockReturnValue({ SetLoadingStatus });

    // useInfiniteQuery 실행 시 넘겨준 queryFn을 꺼내서 직접 실행해 검증
    useInfiniteQueryMock.mockImplementation((opts: any) => {
      // 호출되기만 하면 됨
      return {
        data: { pages: [{ total: 1, data: [{ title: "A" }] }] },
        fetchNextPage: mockFetchNextPage,
        isLoading: false,
      };
    });

    API_EXHIBITION_LIST_CLIENT_Mock.mockResolvedValue({
      total: 1,
      page: 1,
      limit: 10,
      data: [{ title: "A" }],
    });

    render(<ExhibitionList />);

    const { queryFn } = useInfiniteQueryMock.mock.calls[0][0];

    // pageParam=3으로 실행 → offset=3 이어야 함
    await queryFn({ pageParam: 3 });

    expect(SetLoadingStatus).toHaveBeenCalledWith("fetch");
    expect(BodyScrollLockMock).toHaveBeenCalledWith(true);

    expect(API_EXHIBITION_LIST_CLIENT_Mock).toHaveBeenCalledWith({
      offset: 3,
      searchArea: "seoul",
      searchKeyword: "art",
    });

    expect(SetLoadingStatus).toHaveBeenLastCalledWith("");
    expect(BodyScrollLockMock).toHaveBeenLastCalledWith(false);
  });
});
