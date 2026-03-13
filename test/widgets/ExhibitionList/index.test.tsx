import React from 'react'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ExhibitionList } from '@/widgets/ExhibitionList'

jest.mock('next/navigation', () => ({
    useSearchParams: () => ({
        get: jest.fn().mockReturnValue(null),
        entries: jest.fn().mockReturnValue([]),
    }),
}))

jest.mock('@/entities/(index)/api/exhibition.list.client', () => ({
    API_EXHIBITION_LIST_CLIENT: jest.fn(),
}))

jest.mock('@/shared/lib/bodyScrollLock', () => ({
    BodyScrollLock: jest.fn(),
}))

jest.mock('@/shared/store/useLoadingStore', () => ({
    useLoadingStore: () => ({
        SetLoadingStatus: jest.fn(),
    }),
}))

jest.mock('@/shared/hook/useInterSectionObserver', () => ({
    useInterSectionObserver: () => ({
        ref: { current: null },
        isView: false,
    }),
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
        const { API_EXHIBITION_LIST_CLIENT } = jest.requireMock('@/entities/(index)/api/exhibition.list.client')
        API_EXHIBITION_LIST_CLIENT.mockResolvedValue(mockData)
    })

    it('로딩 중 FetchLoadingElement가 렌더링된다', () => {
        render(<ExhibitionList />, { wrapper: createWrapper() })
        // FetchLoadingElement가 마운트됨을 확인 (article 태그로 래핑)
        expect(document.querySelector('article')).toBeInTheDocument()
    })

    it('데이터 없을 때 EmptyItem을 렌더링한다', async () => {
        const { API_EXHIBITION_LIST_CLIENT } = jest.requireMock('@/entities/(index)/api/exhibition.list.client')
        API_EXHIBITION_LIST_CLIENT.mockResolvedValue({ page: 1, total: 0, limit: 24, data: [] })

        render(<ExhibitionList />, { wrapper: createWrapper() })
        // total이 0이면 EmptyItem 표시
        // (비동기 처리이므로 findByText 사용)
        const emptyMsg = await screen.findByText('게시물이 없습니다.')
        expect(emptyMsg).toBeInTheDocument()
    })
})
