import React from 'react'
import { render } from '@testing-library/react'
import { LoadingView } from '@/shared/ui/LoadingView'
import { useLoadingStore } from '@/shared/store/useLoadingStore'

jest.mock('@/shared/ui/LoadingView/_icon', () => ({
    FetchLoadingIcon: () => <div data-testid="fetch-icon" />,
    RouteLoadingIcon: () => <div data-testid="route-icon" />,
    SearchLoadingIcon: () => <div data-testid="search-icon" />,
}))

describe('LoadingView', () => {
    beforeEach(() => {
        useLoadingStore.setState({ loadingStatus: '' })
    })

    it('정상적으로 마운트된다', () => {
        const { container } = render(<LoadingView />)
        expect(container).toBeInTheDocument()
    })

    describe('store 상태에 따른 UI 변경', () => {
        it('loadingStatus가 ""이면 아무것도 렌더링하지 않는다', () => {
            const { container } = render(<LoadingView />)
            expect(container.firstChild).toBeNull()
        })

        it('loadingStatus가 "fetch"이면 FetchLoadingIcon을 렌더링한다', () => {
            useLoadingStore.setState({ loadingStatus: 'fetch' })
            const { getByTestId } = render(<LoadingView />)
            expect(getByTestId('fetch-icon')).toBeInTheDocument()
        })

        it('loadingStatus가 "route"이면 RouteLoadingIcon을 렌더링한다', () => {
            useLoadingStore.setState({ loadingStatus: 'route' })
            const { getByTestId } = render(<LoadingView />)
            expect(getByTestId('route-icon')).toBeInTheDocument()
        })

        it('loadingStatus가 "search"이면 SearchLoadingIcon을 렌더링한다', () => {
            useLoadingStore.setState({ loadingStatus: 'search' })
            const { getByTestId } = render(<LoadingView />)
            expect(getByTestId('search-icon')).toBeInTheDocument()
        })

        it('status가 변경되면 렌더링되는 컴포넌트가 바뀐다', () => {
            useLoadingStore.setState({ loadingStatus: 'fetch' })
            const { getByTestId, queryByTestId, rerender } = render(<LoadingView />)
            expect(getByTestId('fetch-icon')).toBeInTheDocument()

            useLoadingStore.setState({ loadingStatus: 'route' })
            rerender(<LoadingView />)
            expect(queryByTestId('fetch-icon')).not.toBeInTheDocument()
            expect(getByTestId('route-icon')).toBeInTheDocument()
        })
    })
})
