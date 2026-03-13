import { SrcHttpToHttps } from '@/shared/lib/srcHttpToHttps'

describe('SrcHttpToHttps', () => {
    it('http:// URL을 https:// 로 변환한다', () => {
        expect(SrcHttpToHttps('http://example.com/image.jpg')).toBe('https://example.com/image.jpg')
    })

    it('이미 https:// 인 URL은 그대로 반환한다', () => {
        expect(SrcHttpToHttps('https://example.com/image.jpg')).toBe('https://example.com/image.jpg')
    })

    it('http:// 가 없는 URL은 그대로 반환한다', () => {
        expect(SrcHttpToHttps('//example.com/image.jpg')).toBe('//example.com/image.jpg')
        expect(SrcHttpToHttps('/relative/path.jpg')).toBe('/relative/path.jpg')
    })

    it('빈 문자열은 그대로 반환한다', () => {
        expect(SrcHttpToHttps('')).toBe('')
    })
})
