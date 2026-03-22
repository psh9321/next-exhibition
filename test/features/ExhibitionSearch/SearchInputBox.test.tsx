import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { SearchInputBox } from '@/features/ExhibitionSearch/ui/SearchInputBox'

const mockReplace = jest.fn()
const mockSetLoadingStatus = jest.fn()

jest.mock('next/navigation', () => ({
    useRouter: () => ({ replace: mockReplace }),
    useSearchParams: () => ({
        get: jest.fn().mockReturnValue(null),
        toString: jest.fn().mockReturnValue(''),
        has: jest.fn().mockReturnValue(false),
    }),
}))

jest.mock('@/shared/store/useLoadingStore', () => ({
    useLoadingStore: (selector: (state: { SetLoadingStatus: jest.Mock }) => unknown) =>
        selector({ SetLoadingStatus: mockSetLoadingStatus }),
}))

describe('SearchInputBox', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.runOnlyPendingTimers()
        jest.useRealTimers()
    })

    it('정상적으로 마운트된다', () => {
        render(<SearchInputBox />)
        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('placeholder 텍스트가 렌더링된다', () => {
        render(<SearchInputBox />)
        expect(screen.getByPlaceholderText('전시 제목, 장소 검색')).toBeInTheDocument()
    })

    describe('사용자 인터랙션', () => {
        it('입력 후 500ms debounce가 지나면 router.replace가 호출된다', () => {
            render(<SearchInputBox />)
            const input = screen.getByRole('textbox')

            fireEvent.input(input, { target: { value: '미술' } })
            expect(mockReplace).not.toHaveBeenCalled()

            act(() => { jest.advanceTimersByTime(500) })

            expect(mockReplace).toHaveBeenCalledTimes(1)
        })

        it('입력 시 SetLoadingStatus("search")가 호출된다', () => {
            render(<SearchInputBox />)
            const input = screen.getByRole('textbox')

            fireEvent.input(input, { target: { value: '전시' } })
            act(() => { jest.advanceTimersByTime(500) })

            expect(mockSetLoadingStatus).toHaveBeenCalledWith('search')
        })

        it('500ms 이전에 재입력하면 debounce가 초기화되어 한 번만 호출된다', () => {
            render(<SearchInputBox />)
            const input = screen.getByRole('textbox')

            fireEvent.input(input, { target: { value: '미' } })
            act(() => { jest.advanceTimersByTime(300) })

            fireEvent.input(input, { target: { value: '미술' } })
            act(() => { jest.advanceTimersByTime(300) })

            expect(mockReplace).not.toHaveBeenCalled()

            act(() => { jest.advanceTimersByTime(200) })
            expect(mockReplace).toHaveBeenCalledTimes(1)
        })
    })
})
