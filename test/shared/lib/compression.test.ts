import { DataCompression, DataDeCompression } from '@/shared/lib/compression'

describe('DataCompression / DataDeCompression', () => {
    describe('개발 환경 (NODE_ENV !== "production")', () => {
        it('DataCompression은 입력 문자열을 그대로 반환한다', () => {
            const input = '{"key":"value"}'
            expect(DataCompression(input)).toBe(input)
        })

        it('DataDeCompression은 입력값을 그대로 반환한다', () => {
            const input = new ArrayBuffer(8)
            expect(DataDeCompression(input)).toBe(input)
        })
    })
})
