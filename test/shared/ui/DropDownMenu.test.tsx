import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DropDownMenu } from '@/shared/ui/DropDownMenu'

jest.mock('@/shared/lib/bodyScrollLock', () => ({
    BodyScrollLock: jest.fn(),
}))

const mockData = [
    { key: '지역 전체', value: '지역전체' },
    { key: '서울', value: '서울' },
    { key: '부산', value: '부산' },
]

describe('DropDownMenu', () => {
    it('정상적으로 마운트된다', () => {
        render(<DropDownMenu data={mockData} defaultValue="서울" validata={jest.fn()} />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    describe('props에 따른 UI', () => {
        it('defaultValue에 해당하는 key가 버튼에 표시된다', () => {
            render(<DropDownMenu data={mockData} defaultValue="서울" validata={jest.fn()} />)
            expect(screen.getByRole('button')).toHaveTextContent('서울')
        })

        it('hiddenText가 전달되면 렌더링된다', () => {
            render(
                <DropDownMenu
                    data={mockData}
                    defaultValue="서울"
                    hiddenText="지역 선택"
                    validata={jest.fn()}
                />,
            )
            expect(screen.getByText('지역 선택')).toBeInTheDocument()
        })

        it('hiddenText 미전달 시 기본 텍스트가 렌더링된다', () => {
            render(<DropDownMenu data={mockData} defaultValue="서울" validata={jest.fn()} />)
            expect(screen.getByText('드롭다운 메뉴')).toBeInTheDocument()
        })
    })

    describe('사용자 인터랙션', () => {
        it('버튼 클릭 시 메뉴 아이템이 렌더링된다', async () => {
            render(<DropDownMenu data={mockData} defaultValue="서울" validata={jest.fn()} />)
            await userEvent.click(screen.getByRole('button'))
            expect(screen.getByText('부산')).toBeInTheDocument()
        })

        it('메뉴 아이템 클릭 시 validata 콜백이 해당 value로 호출된다', async () => {
            const mockValidata = jest.fn()
            render(<DropDownMenu data={mockData} defaultValue="서울" validata={mockValidata} />)
            await userEvent.click(screen.getByRole('button'))
            await userEvent.click(screen.getByText('부산'))
            expect(mockValidata).toHaveBeenCalledWith('부산')
        })

        it('메뉴 선택 후 버튼 텍스트가 선택된 항목의 key로 변경된다', async () => {
            render(<DropDownMenu data={mockData} defaultValue="서울" validata={jest.fn()} />)
            await userEvent.click(screen.getByRole('button'))
            await userEvent.click(screen.getByText('부산'))
            expect(screen.getByRole('button')).toHaveTextContent('부산')
        })

        it('메뉴 선택 시 BodyScrollLock이 호출된다', async () => {
            const { BodyScrollLock } = jest.requireMock('@/shared/lib/bodyScrollLock')
            render(<DropDownMenu data={mockData} defaultValue="서울" validata={jest.fn()} />)
            await userEvent.click(screen.getByRole('button'))
            expect(BodyScrollLock).toHaveBeenCalled()
        })
    })
})
