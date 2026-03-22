import React from 'react'
import { render, screen } from '@testing-library/react'
import { DetailContents } from '@/entities/exhibition/detail/ui/DetailContents'

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ alt, src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        <img alt={alt} src={src} {...props} />
    ),
}))

jest.mock('@/shared/lib/dateFormat', () => ({
    ExhibitionDateFormat: (date: number | string) => `FMT(${date})`,
}))

jest.mock('@/shared/lib/srcHttpToHttps', () => ({
    SrcHttpToHttps: (src: string) => src,
}))

jest.mock('@/shared/lib/imgError', () => ({
    ImageError: jest.fn(),
}))

jest.mock('he', () => ({
    decode: (str: string) => str,
}))

const baseItem = {
    seq: 'EX001',
    title: '특별 전시회',
    place: '서울 미술관',
    area: '서울',
    startDate: 20241201,
    endDate: 20241231,
    thumbnail: '',
    imgUrl: 'https://example.com/img.jpg',
    price: '무료',
    phone: '02-1234-5678',
    placeAddr: '서울시 종로구',
    placeUrl: '',
    url: '',
    contents1: '',
    serviceName: '',
    realmName: '전시',
    gpsX: '',
    gpsY: '',
    sigungu: '종로구',
} as unknown as EXHIBITION_DETAIL_ITEM

describe('DetailContents', () => {
    it('정상적으로 마운트된다', () => {
        const { container } = render(<DetailContents item={baseItem} />)
        expect(container.firstChild).toBeInTheDocument()
    })

    describe('props에 따른 UI 변경', () => {
        it('전시 이미지를 imgUrl로 렌더링한다', () => {
            render(<DetailContents item={baseItem} />)
            const img = screen.getByRole('img')
            expect(img).toHaveAttribute('src', 'https://example.com/img.jpg')
        })

        it('전화번호를 렌더링한다', () => {
            render(<DetailContents item={baseItem} />)
            expect(screen.getByText('02-1234-5678')).toBeInTheDocument()
        })

        it('phone이 없으면 전화번호를 렌더링하지 않는다', () => {
            render(<DetailContents item={{ ...baseItem, phone: '' }} />)
            expect(screen.queryByText('02-1234-5678')).not.toBeInTheDocument()
        })

        it('주소를 렌더링한다', () => {
            render(<DetailContents item={baseItem} />)
            expect(screen.getByText('서울시 종로구')).toBeInTheDocument()
        })

        it('price가 "무료"이면 카테고리 영역에 "무료"를 표시한다', () => {
            render(<DetailContents item={baseItem} />)
            expect(screen.getByText('무료')).toBeInTheDocument()
        })

        it('price가 "무료"이면 별도 가격 dd를 렌더링하지 않는다', () => {
            render(<DetailContents item={baseItem} />)
            // price dd는 무료/무료관람이 아닐 때만 렌더링
            const priceDds = document.querySelectorAll('dd.price')
            expect(priceDds).toHaveLength(0)
        })

        it('price가 유료이면 가격을 렌더링한다', () => {
            render(<DetailContents item={{ ...baseItem, price: '5,000원' }} />)
            expect(screen.getByText('5,000원')).toBeInTheDocument()
        })

        it('item이 null이면 아무것도 렌더링하지 않는다', () => {
            const { container } = render(
                <DetailContents item={null as unknown as EXHIBITION_DETAIL_ITEM} />,
            )
            expect(container.firstChild).toBeNull()
        })
    })
})
