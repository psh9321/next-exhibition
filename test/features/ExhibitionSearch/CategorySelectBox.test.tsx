import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CategorySelectBox } from '@/features/ExhibitionSearch/ui/CategorySelectBox'

const mockReplace = jest.fn()
const mockSetLoadingStatus = jest.fn()
let mockSearchParamsGet = jest.fn().mockReturnValue(null)

jest.mock('next/navigation', () => ({
    useRouter: () => ({ replace: mockReplace }),
    useSearchParams: () => ({
        get: mockSearchParamsGet,
        toString: jest.fn().mockReturnValue(''),
        has: jest.fn().mockReturnValue(false),
        delete: jest.fn(),
        set: jest.fn(),
    }),
}))

jest.mock('@/shared/store/useLoadingStore', () => ({
    useLoadingStore: (selector: (state: { SetLoadingStatus: jest.Mock }) => unknown) =>
        selector({ SetLoadingStatus: mockSetLoadingStatus }),
}))

jest.mock('@/shared/lib/bodyScrollLock', () => ({
    BodyScrollLock: jest.fn(),
}))

describe('CategorySelectBox', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockSearchParamsGet = jest.fn().mockReturnValue(null)
    })

    it('정상적으로 마운트된다', () => {
        render(<CategorySelectBox />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('기본 카테고리(공연/전시, value=A)가 버튼에 표시된다', () => {
        render(<CategorySelectBox />)
        // defaultValue는 A이고 data에서 A의 key는 "공연/전시"
        expect(screen.getByRole('button')).toHaveTextContent('공연/전시')
    })

    describe('사용자 인터랙션', () => {
        it('버튼 클릭 시 카테고리 목록이 표시된다', async () => {
            render(<CategorySelectBox />)
            await userEvent.click(screen.getByRole('button'))
            expect(screen.getByText('행사/축제')).toBeInTheDocument()
            expect(screen.getByText('교육/체험')).toBeInTheDocument()
        })

        it('카테고리 선택 시 router.replace가 호출된다', async () => {
            render(<CategorySelectBox />)
            await userEvent.click(screen.getByRole('button'))
            await userEvent.click(screen.getByText('행사/축제'))
            expect(mockReplace).toHaveBeenCalledTimes(1)
        })

        it('카테고리 선택 시 SetLoadingStatus("search")가 호출된다', async () => {
            render(<CategorySelectBox />)
            await userEvent.click(screen.getByRole('button'))
            await userEvent.click(screen.getByText('교육/체험'))
            expect(mockSetLoadingStatus).toHaveBeenCalledWith('search')
        })

        it('같은 카테고리 재선택 시 router.replace가 호출되지 않는다', async () => {
            mockSearchParamsGet = jest.fn().mockReturnValue('B')
            render(<CategorySelectBox />)
            await userEvent.click(screen.getByRole('button'))
            await userEvent.click(screen.getAllByText('행사/축제')[0])
            expect(mockReplace).not.toHaveBeenCalled()
        })
    })
})
