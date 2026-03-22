import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ExhibitionShare } from '@/features/ExhibitionShare/ui'

jest.mock('@/features/ExhibitionShare/model/share.model', () => ({
    KakaoShareModel: jest.fn().mockImplementation(() => ({ objectType: 'feed' })),
}))

jest.mock('he', () => ({
    decode: (str: string) => str,
}))

const mockItem = {
    title: '특별 전시회',
    place: '서울 미술관',
    imgUrl: 'https://example.com/img.jpg',
} as unknown as EXHIBITION_DETAIL_ITEM

describe('ExhibitionShare', () => {
    it('정상적으로 마운트된다', () => {
        render(<ExhibitionShare item={mockItem} />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('버튼 title에 전시 제목이 포함된다', () => {
        render(<ExhibitionShare item={mockItem} />)
        expect(screen.getByRole('button')).toHaveAttribute('title', expect.stringContaining('특별 전시회'))
    })

    describe('store 및 Kakao 연동', () => {
        it('Kakao.Share.sendDefault가 있으면 클릭 시 호출된다', async () => {
            const mockSendDefault = jest.fn()
            Object.assign(window, {
                Kakao: { Share: { sendDefault: mockSendDefault } },
            })
            render(<ExhibitionShare item={mockItem} />)
            await userEvent.click(screen.getByRole('button'))
            expect(mockSendDefault).toHaveBeenCalledTimes(1)
        })

        it('Kakao.Share.sendDefault가 없으면 console.log를 호출한다', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
            Object.assign(window, { Kakao: { Share: {} } })
            render(<ExhibitionShare item={mockItem} />)
            await userEvent.click(screen.getByRole('button'))
            expect(consoleSpy).toHaveBeenCalledWith('Kakao SDK load failed')
            consoleSpy.mockRestore()
        })

        it('클릭 시 KakaoShareModel이 item으로 생성된다', async () => {
            const mockSendDefault = jest.fn()
            Object.assign(window, { Kakao: { Share: { sendDefault: mockSendDefault } } })
            const { KakaoShareModel } = jest.requireMock('@/features/ExhibitionShare/model/share.model')
            render(<ExhibitionShare item={mockItem} />)
            await userEvent.click(screen.getByRole('button'))
            expect(KakaoShareModel).toHaveBeenCalledWith(mockItem)
        })
    })
})
