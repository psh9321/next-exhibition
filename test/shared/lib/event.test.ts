import React from 'react'
import { EventTarget } from '@/shared/lib/event'

describe('EventTarget', () => {
    it('touches가 있으면 touches[0]의 pageX, pageY를 반환한다', () => {
        const mockEvent = {
            touches: [{ pageX: 100, pageY: 200 }],
        } as unknown as React.TouchEvent<HTMLElement>

        expect(EventTarget(mockEvent)).toEqual({ x: 100, y: 200 })
    })

    it('changedTouches가 있으면 changedTouches[0]의 pageX, pageY를 반환한다', () => {
        const mockEvent = {
            changedTouches: [{ pageX: 150, pageY: 250 }],
        } as unknown as React.TouchEvent<HTMLElement>

        expect(EventTarget(mockEvent)).toEqual({ x: 150, y: 250 })
    })

    it('MouseEvent이면 pageX, pageY를 반환한다', () => {
        const mockEvent = {
            pageX: 300,
            pageY: 400,
        } as unknown as React.MouseEvent<HTMLButtonElement>

        expect(EventTarget(mockEvent)).toEqual({ x: 300, y: 400 })
    })
})
