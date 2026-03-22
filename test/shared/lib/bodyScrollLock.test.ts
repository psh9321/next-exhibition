import { BodyScrollLock } from '@/shared/lib/bodyScrollLock'

describe('BodyScrollLock', () => {
    afterEach(() => {
        document.body.style.overflow = ''
    })

    it('true 전달 시 body overflow를 "hidden"으로 설정한다', () => {
        BodyScrollLock(true)
        expect(document.body.style.overflow).toBe('hidden')
    })

    it('false 전달 시 body overflow를 빈 문자열로 초기화한다', () => {
        BodyScrollLock(true)
        BodyScrollLock(false)
        expect(document.body.style.overflow).toBe('')
    })
})
