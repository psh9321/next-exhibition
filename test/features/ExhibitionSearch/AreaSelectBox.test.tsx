import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AreaSelectBox } from '@/features/ExhibitionSearch/ui/AreaSelectBox'

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

describe('AreaSelectBox', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockSearchParamsGet = jest.fn().mockReturnValue(null)
    })

    it('정상적으로 마운트된다', () => {
        render(<AreaSelectBox />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('searchParams에 searchArea가 없으면 기본 "지역" 버튼이 표시된다', () => {
        render(<AreaSelectBox />)
        expect(screen.getByRole('button')).toHaveTextContent('지역')
    })

    describe('사용자 인터랙션', () => {
        it('버튼 클릭 시 지역 목록이 표시된다', async () => {
            render(<AreaSelectBox />)
            await userEvent.click(screen.getByRole('button'))
            expect(screen.getByText('서울')).toBeInTheDocument()
            expect(screen.getByText('부산')).toBeInTheDocument()
        })

        it('지역 선택 시 SetLoadingStatus("search")가 호출된다', async () => {
            render(<AreaSelectBox />)
            await userEvent.click(screen.getByRole('button'))
            await userEvent.click(screen.getByText('서울'))
            expect(mockSetLoadingStatus).toHaveBeenCalledWith('search')
        })

        it('지역 선택 시 router.replace가 호출된다', async () => {
            render(<AreaSelectBox />)
            await userEvent.click(screen.getByRole('button'))
            await userEvent.click(screen.getByText('부산'))
            expect(mockReplace).toHaveBeenCalledTimes(1)
        })

        it('같은 지역을 재선택하면 router.replace가 호출되지 않는다', async () => {
            mockSearchParamsGet = jest.fn().mockReturnValue('서울')
            render(<AreaSelectBox />)
            await userEvent.click(screen.getByRole('button'))
            await userEvent.click(screen.getAllByText('서울')[0])
            expect(mockReplace).not.toHaveBeenCalled()
        })
    })
})
