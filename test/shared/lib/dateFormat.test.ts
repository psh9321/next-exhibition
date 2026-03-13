import { ExhibitionDateFormat, GetNextDateFormat } from '@/shared/lib/dateFormat'

describe('ExhibitionDateFormat', () => {
    it('숫자 날짜를 YYYY.MM.DD 포맷으로 변환한다', () => {
        expect(ExhibitionDateFormat(20241201)).toBe('2024.12.01')
        expect(ExhibitionDateFormat(20000101)).toBe('2000.01.01')
    })

    it('문자열 날짜도 YYYY.MM.DD 포맷으로 변환한다', () => {
        expect(ExhibitionDateFormat('20241201')).toBe('2024.12.01')
    })

    it('0 이하의 숫자는 -999를 반환한다', () => {
        expect(ExhibitionDateFormat(0)).toBe('-999')
        expect(ExhibitionDateFormat(-1)).toBe('-999')
    })

    it('8자리 미만 문자열은 그대로 반환한다', () => {
        expect(ExhibitionDateFormat('2024')).toBe('2024')
        expect(ExhibitionDateFormat('202412')).toBe('202412')
    })
})

describe('GetNextDateFormat', () => {
    it('내일 날짜를 YYYYMDd 형식의 문자열로 반환한다', () => {
        const result = GetNextDateFormat()
        expect(typeof result).toBe('string')
        expect(result.length).toBeGreaterThan(0)
    })

    it('내일 날짜의 연도가 포함된다', () => {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        const year = String(tomorrow.getFullYear())

        const result = GetNextDateFormat()
        expect(result.startsWith(year)).toBe(true)
    })
})
