import { generateMetadata } from '@/widgets/ExhibitionDetailServer'

jest.mock('@/entities/exhibition/detail/api/exhibition.detail.server', () => ({
    API_EXHIBITION_DETAIL_SERVER: jest.fn(),
}))

const mockDetail: EXHIBITION_DETAIL_ITEM = {
    seq: 'EX001',
    title: '특별 전시회',
    place: '서울 미술관',
    area: '서울',
    startDate: 20241201,
    endDate: 20241231,
    thumbnail: 'https://example.com/thumb.jpg',
    imgUrl: 'https://example.com/img.jpg',
    price: '무료',
    phone: '02-1234-5678',
    homepage: 'https://example.com',
    contents: '전시 내용',
}

describe('generateMetadata', () => {
    it('전시 데이터로 메타데이터를 생성한다', async () => {
        const { API_EXHIBITION_DETAIL_SERVER } = jest.requireMock(
            '@/entities/exhibition/detail/api/exhibition.detail.server',
        )
        API_EXHIBITION_DETAIL_SERVER.mockResolvedValue(mockDetail)

        const metadata = await generateMetadata({ params: Promise.resolve({ seq: 'EX001' }) })

        expect(metadata.title).toBe('특별 전시회')
        expect(metadata.description).toContain('서울 미술관')
        expect(metadata.description).toContain('2024.12.01')
    })

    it('전시 데이터가 없으면 빈 객체를 반환한다', async () => {
        const { API_EXHIBITION_DETAIL_SERVER } = jest.requireMock(
            '@/entities/exhibition/detail/api/exhibition.detail.server',
        )
        API_EXHIBITION_DETAIL_SERVER.mockResolvedValue(null)

        const metadata = await generateMetadata({ params: Promise.resolve({ seq: 'EX999' }) })

        expect(metadata).toEqual({})
    })
})
