import React from 'react'
import { render, screen } from '@testing-library/react'
import { LayoutWrapper } from '@/shared/ui/LayoutWrapper'

describe('LayoutWrapper', () => {
    it('정상적으로 마운트된다', () => {
        const { container } = render(<LayoutWrapper />)
        expect(container.firstChild).toBeInTheDocument()
    })

    describe('props에 따른 UI 변경', () => {
        it('children을 렌더링한다', () => {
            render(
                <LayoutWrapper>
                    <div data-testid="child-a">자식 컴포넌트</div>
                </LayoutWrapper>,
            )
            expect(screen.getByTestId('child-a')).toBeInTheDocument()
        })

        it('복수 children도 렌더링한다', () => {
            render(
                <LayoutWrapper>
                    <span data-testid="child-1" />
                    <span data-testid="child-2" />
                </LayoutWrapper>,
            )
            expect(screen.getByTestId('child-1')).toBeInTheDocument()
            expect(screen.getByTestId('child-2')).toBeInTheDocument()
        })
    })
})
