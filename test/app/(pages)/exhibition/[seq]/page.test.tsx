import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@/widgets/ExhibitionDetailServer', () => ({
    ExhibitionDetailServer: () => (
        <div data-testid="exhibition-detail">ExhibitionDetailServer</div>
    ),
    generateMetadata: jest.fn().mockResolvedValue({ title: '테스트 전시' }),
}))

import ExhibitionDetailPage from '@/app/(pages)/exhibition/[seq]/page'

describe('ExhibitionDetailPage', () => {
    it('ExhibitionDetailServer 컴포넌트를 렌더링한다', async () => {
        const params = Promise.resolve({ seq: 'EX001' })
        const jsx = await ExhibitionDetailPage({ params })
        render(jsx as React.ReactElement)

        expect(screen.getByTestId('exhibition-detail')).toBeInTheDocument()
    })
})
