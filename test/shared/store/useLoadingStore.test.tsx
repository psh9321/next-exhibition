import { act, renderHook } from '@testing-library/react'
import { useLoadingStore } from '@/shared/store/useLoadingStore'

describe('useLoadingStore', () => {
    beforeEach(() => {
        useLoadingStore.setState({ loadingStatus: '' })
    })

    it('초기 loadingStatus는 빈 문자열이다', () => {
        const { result } = renderHook(() => useLoadingStore())
        expect(result.current.loadingStatus).toBe('')
    })

    it('SetLoadingStatus("fetch") 호출 시 상태가 변경된다', () => {
        const { result } = renderHook(() => useLoadingStore())

        act(() => {
            result.current.SetLoadingStatus('fetch')
        })

        expect(result.current.loadingStatus).toBe('fetch')
    })

    it('SetLoadingStatus("search") 호출 시 상태가 변경된다', () => {
        const { result } = renderHook(() => useLoadingStore())

        act(() => {
            result.current.SetLoadingStatus('search')
        })

        expect(result.current.loadingStatus).toBe('search')
    })

    it('SetLoadingStatus("route") 호출 시 상태가 변경된다', () => {
        const { result } = renderHook(() => useLoadingStore())

        act(() => {
            result.current.SetLoadingStatus('route')
        })

        expect(result.current.loadingStatus).toBe('route')
    })

    it('SetLoadingStatus("") 호출 시 상태가 초기화된다', () => {
        const { result } = renderHook(() => useLoadingStore())

        act(() => {
            result.current.SetLoadingStatus('fetch')
        })
        act(() => {
            result.current.SetLoadingStatus('')
        })

        expect(result.current.loadingStatus).toBe('')
    })
})
