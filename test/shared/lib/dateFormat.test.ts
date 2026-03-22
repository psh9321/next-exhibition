import { ExhibitionDateFormat, GetNextDateFormat } from '@/shared/lib/dateFormat'

describe('ExhibitionDateFormat', () => {
    describe('정상 변환', () => {
        it('숫자 날짜를 YYYY.MM.DD 형식으로 변환한다', () => {
            expect(ExhibitionDateFormat(20241201)).toBe('2024.12.01')
            expect(ExhibitionDateFormat(20250101)).toBe('2025.01.01')
        })

        it('문자열 날짜도 YYYY.MM.DD 형식으로 변환한다', () => {
            expect(ExhibitionDateFormat('20241201')).toBe('2024.12.01')
        })
    })

    describe('엣지 케이스', () => {
        it('숫자가 0 이하이면 "-999"를 반환한다', () => {
            expect(ExhibitionDateFormat(0)).toBe('-999')
            expect(ExhibitionDateFormat(-1)).toBe('-999')
        })

        it('8자리 미만 문자열은 그대로 반환한다', () => {
            expect(ExhibitionDateFormat('2024')).toBe('2024')
        })
    })
})

describe('GetNextDateFormat', () => {
    it('오늘 기준 다음 날짜가 포함된 문자열을 반환한다', () => {
        const result = GetNextDateFormat()
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        expect(result).toContain(String(tomorrow.getFullYear()))
    })
})
