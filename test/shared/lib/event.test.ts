import { EventTarget } from '@/shared/lib/event'

describe('EventTarget', () => {
    it('touches 이벤트에서 좌표를 반환한다', () => {
        const mockTouchEvent = {
            touches: [{ pageX: 100, pageY: 200 }],
        } as unknown as EVENT_TYPE

        const result = EventTarget(mockTouchEvent)
        expect(result).toEqual({ x: 100, y: 200 })
    })

    it('changedTouches 이벤트에서 좌표를 반환한다', () => {
        const mockTouchEvent = {
            changedTouches: [{ pageX: 150, pageY: 250 }],
        } as unknown as EVENT_TYPE

        const result = EventTarget(mockTouchEvent)
        expect(result).toEqual({ x: 150, y: 250 })
    })

    it('마우스 이벤트에서 좌표를 반환한다', () => {
        const mockMouseEvent = {
            pageX: 300,
            pageY: 400,
        } as unknown as EVENT_TYPE

        const result = EventTarget(mockMouseEvent)
        expect(result).toEqual({ x: 300, y: 400 })
    })

    it('touches가 빈 배열이면 마우스 이벤트로 처리한다', () => {
        const mockEvent = {
            touches: [],
            pageX: 50,
            pageY: 60,
        } as unknown as EVENT_TYPE

        const result = EventTarget(mockEvent)
        expect(result).toEqual({ x: 50, y: 60 })
    })
})
