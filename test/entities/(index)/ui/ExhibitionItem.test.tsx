import React from 'react'
import { render, screen } from '@testing-library/react'
import { ExhibitionItem } from '@/entities/(index)/ui/ExhibitionItem'

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ fill, sizes, unoptimized, onError, loading, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; sizes?: string; unoptimized?: boolean; loading?: string }) => {
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        return <img {...props} />
    },
}))

jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href, onClick }: { children: React.ReactNode; href: string; onClick?: () => void }) => (
        <a href={href} onClick={onClick}>
            {children}
        </a>
    ),
}))

jest.mock('next/navigation', () => ({
    useSearchParams: () => ({
        toString: () => '',
    }),
}))

jest.mock('zustand/shallow', () => ({
    useShallow: (selector: <T>(state: T) => T) => selector,
}))

jest.mock('@/shared/store/useLoadingStore', () => ({
    useLoadingStore: (selector: (state: { SetLoadingStatus: jest.Mock }) => unknown) =>
        selector({ SetLoadingStatus: jest.fn() }),
}))

jest.mock('@/shared/lib/bodyScrollLock', () => ({
    BodyScrollLock: jest.fn(),
}))

jest.mock('he', () => ({
    decode: (str: string) => str,
}))

jest.mock('@/shared/lib/srcHttpToHttps', () => ({
    SrcHttpToHttps: (src: string) => src,
}))

jest.mock('@/shared/lib/imgError', () => ({
    ImageError: jest.fn(),
}))

const mockItem: EXHIBITION_ITEM = {
    seq: 'EX001',
    title: '특별 전시회',
    place: '서울 미술관',
    area: '서울',
    startDate: '20241201',
    endDate: '20241231',
    thumbnail: 'https://example.com/thumb.jpg',
}

describe('ExhibitionItem', () => {
    it('전시 제목을 렌더링한다', () => {
        render(<ExhibitionItem item={mockItem} />)
        expect(screen.getByText('특별 전시회')).toBeInTheDocument()
    })

    it('전시 장소를 렌더링한다', () => {
        render(<ExhibitionItem item={mockItem} />)
        expect(screen.getByText('서울 미술관')).toBeInTheDocument()
    })

    it('전시 지역을 렌더링한다', () => {
        render(<ExhibitionItem item={mockItem} />)
        expect(screen.getByText('서울')).toBeInTheDocument()
    })

    it('전시 날짜를 포맷하여 렌더링한다', () => {
        render(<ExhibitionItem item={mockItem} />)
        expect(screen.getByText('2024.12.01 ~ 2024.12.31')).toBeInTheDocument()
    })

    it('전시 상세 링크가 seq를 포함한다', () => {
        render(<ExhibitionItem item={mockItem} />)
        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', '/exhibition/EX001?')
    })

    it('item이 없으면 아무것도 렌더링하지 않는다', () => {
        const { container } = render(<ExhibitionItem item={null as unknown as EXHIBITION_ITEM} />)
        expect(container.firstChild).toBeNull()
    })
})
