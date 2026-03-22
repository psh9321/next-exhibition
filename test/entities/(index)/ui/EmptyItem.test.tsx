import React from 'react'
import { render, screen } from '@testing-library/react'
import { EmptyItem } from '@/entities/(index)/ui/EmptyItem'

describe('EmptyItem', () => {
    it('정상적으로 마운트된다', () => {
        const { container } = render(<EmptyItem />)
        expect(container.firstChild).toBeInTheDocument()
    })

    it('"게시물이 없습니다." 텍스트를 렌더링한다', () => {
        render(<EmptyItem />)
        expect(screen.getByText('게시물이 없습니다.')).toBeInTheDocument()
    })
})
