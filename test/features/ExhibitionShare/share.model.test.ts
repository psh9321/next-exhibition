import { KakaoShareModel } from '@/features/ExhibitionShare/model/share.model'

jest.mock('@/shared/lib/dateFormat', () => ({
    ExhibitionDateFormat: (date: number | string) => `FMT(${date})`,
}))

jest.mock('he', () => ({
    decode: (str: string) => str,
}))

const mockItem = {
    title: '특별 전시회',
    place: '서울 미술관',
    startDate: 20241201,
    endDate: 20241231,
    imgUrl: 'https://example.com/img.jpg',
    contents1: '전시 내용',
} as unknown as EXHIBITION_DETAIL_ITEM

describe('KakaoShareModel', () => {
    describe('인스턴스 생성', () => {
        it('objectType이 "feed"로 설정된다', () => {
            const model = new KakaoShareModel(mockItem)
            expect(model.objectType).toBe('feed')
        })

        it('content.title이 전시 제목으로 설정된다', () => {
            const model = new KakaoShareModel(mockItem)
            expect(model.content.title).toBe('특별 전시회')
        })

        it('content.description에 장소가 포함된다', () => {
            const model = new KakaoShareModel(mockItem)
            expect(model.content.description).toContain('서울 미술관')
        })

        it('content.description에 포맷된 날짜가 포함된다', () => {
            const model = new KakaoShareModel(mockItem)
            expect(model.content.description).toContain('FMT(20241201)')
            expect(model.content.description).toContain('FMT(20241231)')
        })

        it('content.imageUrl이 imgUrl로 설정된다', () => {
            const model = new KakaoShareModel(mockItem)
            expect(model.content.imageUrl).toBe('https://example.com/img.jpg')
        })

        it('content.link.webUrl과 mobileWebUrl이 window.location.href로 설정된다', () => {
            const model = new KakaoShareModel(mockItem)
            expect(model.content.link.webUrl).toBe(window.location.href)
            expect(model.content.link.mobileWebUrl).toBe(window.location.href)
        })
    })
})
