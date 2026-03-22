import { CombineZero } from '@/shared/lib/combineZero'

describe('CombineZero', () => {
    describe('정상 동작', () => {
        it('10 미만 숫자에 앞자리 0을 붙인다', () => {
            expect(CombineZero(1)).toBe('01')
            expect(CombineZero(9)).toBe('09')
        })

        it('10 이상 숫자는 그대로 반환한다', () => {
            expect(CombineZero(10)).toBe(10)
            expect(CombineZero(99)).toBe(99)
        })

        it('0은 "00"을 반환한다', () => {
            expect(CombineZero(0)).toBe('00')
        })
    })

    describe('입력 타입 변환', () => {
        it('문자열 숫자도 처리한다', () => {
            expect(CombineZero('5')).toBe('05')
            expect(CombineZero('10')).toBe(10)
        })

        it('숫자가 아닌 문자열은 "-999"를 반환한다', () => {
            expect(CombineZero('abc')).toBe('-999')
        })
    })
})
