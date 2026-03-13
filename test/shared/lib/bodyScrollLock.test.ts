import { BodyScrollLock } from '@/shared/lib/bodyScrollLock'

describe('BodyScrollLock', () => {
    it('true 전달 시 body overflow를 hidden으로 설정한다', () => {
        BodyScrollLock(true)
        expect(document.body.style.overflow).toBe('hidden')
    })

    it('false 전달 시 body overflow를 빈 문자열로 설정한다', () => {
        BodyScrollLock(false)
        expect(document.body.style.overflow).toBe('')
    })

    it('토글 동작이 올바르게 작동한다', () => {
        BodyScrollLock(true)
        expect(document.body.style.overflow).toBe('hidden')

        BodyScrollLock(false)
        expect(document.body.style.overflow).toBe('')
    })
})
