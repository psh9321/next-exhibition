import { SrcHttpToHttps } from '@/shared/lib/srcHttpToHttps'

describe('SrcHttpToHttps', () => {
    it('http:// URL을 https://로 변환한다', () => {
        expect(SrcHttpToHttps('http://example.com/image.jpg')).toBe('https://example.com/image.jpg')
    })

    it('이미 https://인 URL은 변환하지 않는다', () => {
        expect(SrcHttpToHttps('https://example.com/image.jpg')).toBe('https://example.com/image.jpg')
    })

    it('http를 포함하지 않는 상대경로는 그대로 반환한다', () => {
        expect(SrcHttpToHttps('/img/thumbnail.jpg')).toBe('/img/thumbnail.jpg')
    })

    it('빈 문자열은 그대로 반환한다', () => {
        expect(SrcHttpToHttps('')).toBe('')
    })
})
