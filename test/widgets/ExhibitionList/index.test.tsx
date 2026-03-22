import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ExhibitionList } from '@/widgets/ExhibitionList'

const mockSetLoadingStatus = jest.fn()

jest.mock('next/navigation', () => ({
    useSearchParams: () => ({
        get: jest.fn().mockReturnValue(null),
        entries: jest.fn().mockReturnValue([]),
        toString: jest.fn().mockReturnValue(''),
    }),
}))

jest.mock('@/entities/(index)/api/exhibition.list.client', () => ({
    API_EXHIBITION_LIST_CLIENT: jest.fn(),
}))

jest.mock('@/shared/lib/bodyScrollLock', () => ({
    BodyScrollLock: jest.fn(),
}))

jest.mock('@/shared/store/useLoadingStore', () => ({
    useLoadingStore: jest.fn((selector: (state: { SetLoadingStatus: jest.Mock }) => jest.Mock) =>
        selector({ SetLoadingStatus: mockSetLoadingStatus })
    ),
}))

jest.mock('@/shared/hook/useInterSectionObserver', () => ({
    useInterSectionObserver: () => ({
        ref: { current: null },
        isView: false,
    }),
}))

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}))

jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href }: { children: React.ReactNode; href: string }) => (
        <a href={href}>{children}</a>
    ),
}))

jest.mock('@/shared/lib/srcHttpToHttps', () => ({
    SrcHttpToHttps: (src: string) => src,
}))

jest.mock('@/shared/lib/imgError', () => ({
    ImageError: jest.fn(),
}))

jest.mock('@/shared/lib/dateFormat', () => ({
    ExhibitionDateFormat: (date: number) => String(date),
}))

jest.mock('he', () => ({
    decode: (str: string) => str,
}))

const mockData = {
    page: 1,
    total: 2,
    limit: 24,
    data: [
        {
            seq: 'EX001',
            title: '첫 번째 전시',
            place: '서울 미술관',
            area: '서울',
            startDate: 20241201,
            endDate: 20241231,
            thumbnail: 'https://example.com/1.jpg',
        },
        {
            seq: 'EX002',
            title: '두 번째 전시',
            place: '부산 갤러리',
            area: '부산',
            startDate: 20241201,
            endDate: 20241231,
            thumbnail: 'https://example.com/2.jpg',
        },
    ],
}

function createWrapper() {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    })
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

describe('ExhibitionList', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        const { API_EXHIBITION_LIST_CLIENT } = jest.requireMock('@/entities/(index)/api/exhibition.list.client')
        API_EXHIBITION_LIST_CLIENT.mockResolvedValue(mockData)
    })

    describe('렌더링 테스트', () => {
        it('마운트 시 article 컨테이너가 렌더링된다', () => {
            render(<ExhibitionList />, { wrapper: createWrapper() })
            expect(document.querySelector('article')).toBeInTheDocument()
        })

        it('데이터 로드 후 전시 아이템이 렌더링된다', async () => {
            render(<ExhibitionList />, { wrapper: createWrapper() })
            expect(await screen.findByText('첫 번째 전시')).toBeInTheDocument()
            expect(screen.getByText('두 번째 전시')).toBeInTheDocument()
        })

        it('total이 0이면 EmptyItem이 렌더링된다', async () => {
            const { API_EXHIBITION_LIST_CLIENT } = jest.requireMock('@/entities/(index)/api/exhibition.list.client')
            API_EXHIBITION_LIST_CLIENT.mockResolvedValue({ page: 1, total: 0, limit: 24, data: [] })

            render(<ExhibitionList />, { wrapper: createWrapper() })
            expect(await screen.findByText('게시물이 없습니다.')).toBeInTheDocument()
        })

        it('무한 스크롤 감지용 li 요소가 렌더링된다', () => {
            render(<ExhibitionList />, { wrapper: createWrapper() })
            const sentinel = document.querySelector('li[style]')
            expect(sentinel).toBeInTheDocument()
        })
    })

    describe('API 호출 테스트', () => {
        it('마운트 시 API_EXHIBITION_LIST_CLIENT가 호출된다', async () => {
            const { API_EXHIBITION_LIST_CLIENT } = jest.requireMock('@/entities/(index)/api/exhibition.list.client')
            render(<ExhibitionList />, { wrapper: createWrapper() })
            await waitFor(() => {
                expect(API_EXHIBITION_LIST_CLIENT).toHaveBeenCalledTimes(1)
            })
        })

        it('API 호출 시 offset 파라미터가 포함된다', async () => {
            const { API_EXHIBITION_LIST_CLIENT } = jest.requireMock('@/entities/(index)/api/exhibition.list.client')
            render(<ExhibitionList />, { wrapper: createWrapper() })
            await waitFor(() => {
                expect(API_EXHIBITION_LIST_CLIENT).toHaveBeenCalledWith(
                    expect.objectContaining({ offset: 1 })
                )
            })
        })
    })

    describe('기능 테스트', () => {
        it('데이터 fetching 중 SetLoadingStatus("fetch")가 호출된다', async () => {
            render(<ExhibitionList />, { wrapper: createWrapper() })
            await waitFor(() => {
                expect(mockSetLoadingStatus).toHaveBeenCalledWith('fetch')
            })
        })

        it('데이터 로드 완료 후 SetLoadingStatus("")가 호출된다', async () => {
            render(<ExhibitionList />, { wrapper: createWrapper() })
            await waitFor(() => {
                expect(mockSetLoadingStatus).toHaveBeenCalledWith('')
            })
        })

        it('데이터 fetching 중 BodyScrollLock(true)이 호출된다', async () => {
            const { BodyScrollLock } = jest.requireMock('@/shared/lib/bodyScrollLock')
            render(<ExhibitionList />, { wrapper: createWrapper() })
            await waitFor(() => {
                expect(BodyScrollLock).toHaveBeenCalledWith(true)
            })
        })

        it('데이터 로드 완료 후 BodyScrollLock(false)이 호출된다', async () => {
            const { BodyScrollLock } = jest.requireMock('@/shared/lib/bodyScrollLock')
            render(<ExhibitionList />, { wrapper: createWrapper() })
            await waitFor(() => {
                expect(BodyScrollLock).toHaveBeenCalledWith(false)
            })
        })
    })
})
