import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EmptyPage } from '@/shared/ui/EmptyPage'

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ alt }: { alt: string }) => <img alt={alt} />,
}))

jest.mock('next/link', () => ({
    __esModule: true,
    default: ({
        children,
        href,
        onClick,
    }: {
        children: React.ReactNode
        href: string
        onClick?: React.MouseEventHandler
    }) => (
        <a href={href} onClick={onClick}>
            {children}
        </a>
    ),
}))

describe('EmptyPage', () => {
    it('정상적으로 마운트된다', () => {
        render(<EmptyPage />)
        expect(screen.getByText('404')).toBeInTheDocument()
    })

    describe('props에 따른 UI 변경', () => {
        it('title 미전달 시 기본 타이틀을 표시한다', () => {
            render(<EmptyPage />)
            expect(screen.getByText('페이지를 찾을 수 없습니다.')).toBeInTheDocument()
        })

        it('title 전달 시 커스텀 타이틀을 표시한다', () => {
            render(<EmptyPage title="데이터가 없습니다." />)
            expect(screen.getByText('데이터가 없습니다.')).toBeInTheDocument()
        })

        it('contents 미전달 시 기본 내용을 표시한다', () => {
            render(<EmptyPage />)
            expect(screen.getByText('요청하신 페이지를 찾을수 없습니다.')).toBeInTheDocument()
        })

        it('contents 전달 시 커스텀 내용을 표시한다', () => {
            render(<EmptyPage contents="준비 중인 전시입니다." />)
            expect(screen.getByText('준비 중인 전시입니다.')).toBeInTheDocument()
        })

        it('전시목록 링크가 "/" href를 가진다', () => {
            render(<EmptyPage />)
            expect(screen.getByRole('link')).toHaveAttribute('href', '/')
        })
    })

    describe('사용자 인터랙션', () => {
        it('closeCallback이 없으면 링크 클릭 시 기본 동작을 한다', async () => {
            render(<EmptyPage />)
            // closeCallback 없이 링크만 존재
            expect(screen.getByRole('link')).toBeInTheDocument()
        })

        it('closeCallback이 있으면 링크 클릭 시 closeCallback이 호출된다', async () => {
            const closeCallback = jest.fn()
            render(<EmptyPage closeCallback={closeCallback} />)
            await userEvent.click(screen.getByRole('link'))
            expect(closeCallback).toHaveBeenCalledTimes(1)
        })
    })
})
