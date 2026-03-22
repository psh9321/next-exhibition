import React from 'react'
import { render, screen } from '@testing-library/react'
import { DetailHead } from '@/entities/exhibition/detail/ui/DetailHead'

jest.mock('@/shared/lib/dateFormat', () => ({
    ExhibitionDateFormat: (date: number | string) => `FMT(${date})`,
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
    imgUrl: '',
    price: '무료',
    phone: '',
    placeAddr: '',
    placeUrl: '',
    url: '',
    contents1: '',
    serviceName: '',
    realmName: '',
    gpsX: '',
    gpsY: '',
    sigungu: '',
} as unknown as EXHIBITION_DETAIL_ITEM

describe('DetailHead', () => {
    it('정상적으로 마운트된다', () => {
        const { container } = render(<DetailHead item={baseItem} />)
        expect(container.firstChild).toBeInTheDocument()
    })

    describe('props에 따른 UI 변경', () => {
        it('전시 제목을 렌더링한다', () => {
            render(<DetailHead item={baseItem} />)
            expect(screen.getByText('특별 전시회')).toBeInTheDocument()
        })

        it('전시 장소를 렌더링한다', () => {
            render(<DetailHead item={baseItem} />)
            expect(screen.getByText('서울 미술관')).toBeInTheDocument()
        })

        it('ExhibitionDateFormat을 통해 날짜를 포맷하여 렌더링한다', () => {
            render(<DetailHead item={baseItem} />)
            expect(screen.getByText('FMT(20241201) ~ FMT(20241231)')).toBeInTheDocument()
        })

        it('다른 전시 props로 렌더링 시 해당 내용이 표시된다', () => {
            const anotherItem = { ...baseItem, title: '새로운 전시', place: '부산 갤러리' }
            render(<DetailHead item={anotherItem} />)
            expect(screen.getByText('새로운 전시')).toBeInTheDocument()
            expect(screen.getByText('부산 갤러리')).toBeInTheDocument()
        })
    })
})
