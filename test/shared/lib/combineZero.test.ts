import { CombineZero } from '@/shared/lib/combineZero'

describe('CombineZero', () => {
    it('한 자리 숫자에 앞에 0을 붙여 반환한다', () => {
        expect(CombineZero(5)).toBe('05')
        expect(CombineZero(0)).toBe('00')
        expect(CombineZero(9)).toBe('09')
    })

    it('두 자리 이상 숫자는 그대로 반환한다', () => {
        expect(CombineZero(10)).toBe(10)
        expect(CombineZero(99)).toBe(99)
        expect(CombineZero(100)).toBe(100)
    })

    it('문자열 숫자도 처리한다', () => {
        expect(CombineZero('5')).toBe('05')
        expect(CombineZero('10')).toBe(10)
    })

    it('숫자가 아닌 문자열은 -999를 반환한다', () => {
        expect(CombineZero('abc')).toBe('-999')
    })

    it('빈 문자열은 0으로 변환되어 "00"을 반환한다', () => {
        // Number('') === 0 이므로 '00' 반환
        expect(CombineZero('')).toBe('00')
    })
})
