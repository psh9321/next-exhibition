import React from 'react'
import { render, act, screen } from '@testing-library/react'
import { useInterSectionObserver } from '@/shared/hook/useInterSectionObserver'

const mockObserve = jest.fn()
const mockDisconnect = jest.fn()
let intersectionCallback: (entries: IntersectionObserverEntry[]) => void

beforeEach(() => {
    mockObserve.mockClear()
    mockDisconnect.mockClear()

    global.IntersectionObserver = jest.fn((callback) => {
        intersectionCallback = callback
        return {
            observe: mockObserve,
            disconnect: mockDisconnect,
            unobserve: jest.fn(),
        }
    }) as unknown as typeof IntersectionObserver
})

// 실제 DOM 요소에 ref를 연결하기 위한 래퍼 컴포넌트
const TestComponent = ({
    onIsViewChange,
}: {
    onIsViewChange?: (isView: boolean) => void
}) => {
    const { ref, isView } = useInterSectionObserver<HTMLDivElement>({ threshold: 0 })

    React.useEffect(() => {
        onIsViewChange?.(isView)
    }, [isView])

    return <div ref={ref} data-testid="observer-target" data-isview={String(isView)} />
}

describe('useInterSectionObserver', () => {
    it('초기 isView는 false이다', () => {
        render(<TestComponent />)
        const el = screen.getByTestId('observer-target')
        expect(el.dataset.isview).toBe('false')
    })

    it('ref 요소에 observe가 호출된다', () => {
        render(<TestComponent />)
        expect(mockObserve).toHaveBeenCalled()
    })

    it('요소가 뷰포트에 진입하면 isView가 true로 변경된다', () => {
        render(<TestComponent />)

        act(() => {
            intersectionCallback([{ isIntersecting: true } as IntersectionObserverEntry])
        })

        const el = screen.getByTestId('observer-target')
        expect(el.dataset.isview).toBe('true')
    })

    it('요소가 뷰포트에서 벗어나면 isView가 false로 변경된다', () => {
        render(<TestComponent />)

        act(() => {
            intersectionCallback([{ isIntersecting: true } as IntersectionObserverEntry])
        })
        act(() => {
            intersectionCallback([{ isIntersecting: false } as IntersectionObserverEntry])
        })

        const el = screen.getByTestId('observer-target')
        expect(el.dataset.isview).toBe('false')
    })

    it('컴포넌트 언마운트 시 observer.disconnect가 호출된다', () => {
        const { unmount } = render(<TestComponent />)
        unmount()
        expect(mockDisconnect).toHaveBeenCalled()
    })
})
