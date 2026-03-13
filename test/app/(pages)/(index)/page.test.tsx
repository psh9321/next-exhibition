import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@/widgets/TitleOrHeader', () => ({
    TitleOrHeader: () => <div data-testid="title-or-header">TitleOrHeader</div>,
}))

jest.mock('@/widgets/ExhibitionList', () => ({
    ExhibitionList: () => <div data-testid="exhibition-list">ExhibitionList</div>,
}))

// _view.tsx는 TitleOrHeader + ExhibitionList를 조합한 클라이언트 컴포넌트
import IndexView from '@/app/(pages)/(index)/_view'

describe('IndexView (index page 클라이언트 뷰)', () => {
    it('TitleOrHeader를 렌더링한다', () => {
        render(<IndexView />)
        expect(screen.getByTestId('title-or-header')).toBeInTheDocument()
    })

    it('ExhibitionList를 렌더링한다', () => {
        render(<IndexView />)
        expect(screen.getByTestId('exhibition-list')).toBeInTheDocument()
    })
})
