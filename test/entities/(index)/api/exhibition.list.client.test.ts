import { API_EXHIBITION_LIST_CLIENT } from '@/entities/(index)/api/exhibition.list.client'

jest.mock('@/shared/api/instance', () => ({
    CLIENT_API: jest.fn(),
}))

const mockData: OPEN_API_CLIENT_RESPONSE_DATA = {
    total: 10,
    page: 1,
    limit: 24,
    data: [],
}

const mockSuccessResponse = {
    resultCode: 200,
    data: mockData,
}

const mockFailResponse = {
    resultCode: 403,
    data: null,
    errMsg: '실패',
}

function createMockClientApi(response: object) {
    return {
        json: jest.fn().mockResolvedValue(response),
    }
}

describe('API_EXHIBITION_LIST_CLIENT', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('성공 시 전시 목록 데이터를 반환한다', async () => {
        const { CLIENT_API } = jest.requireMock('@/shared/api/instance')
        CLIENT_API.mockReturnValue(createMockClientApi(mockSuccessResponse))

        const result = await API_EXHIBITION_LIST_CLIENT({ offset: 1, limit: 24, type: 'A' })

        expect(result).toEqual(mockData)
        expect(CLIENT_API).toHaveBeenCalledWith('openApi', {
            json: { offset: 1, limit: 24, type: 'A' },
        })
    })

    it('resultCode가 200이 아니면 에러를 throw한다', async () => {
        const { CLIENT_API } = jest.requireMock('@/shared/api/instance')
        CLIENT_API.mockReturnValue(createMockClientApi(mockFailResponse))

        await expect(API_EXHIBITION_LIST_CLIENT({ offset: 1, limit: 24, type: 'A' })).rejects.toEqual(
            mockFailResponse,
        )
    })

    it('기본 파라미터(offset=1, limit=24, type="A")로 호출된다', async () => {
        const { CLIENT_API } = jest.requireMock('@/shared/api/instance')
        CLIENT_API.mockReturnValue(createMockClientApi(mockSuccessResponse))

        await API_EXHIBITION_LIST_CLIENT({} as CLIENT_EXHIBITION_API_PARAMS)

        expect(CLIENT_API).toHaveBeenCalledWith('openApi', {
            json: expect.objectContaining({ offset: 1, limit: 24, type: 'A' }),
        })
    })

    it('검색 파라미터가 포함된 경우 함께 전달된다', async () => {
        const { CLIENT_API } = jest.requireMock('@/shared/api/instance')
        CLIENT_API.mockReturnValue(createMockClientApi(mockSuccessResponse))

        await API_EXHIBITION_LIST_CLIENT({
            offset: 2,
            limit: 24,
            type: 'B',
            searchKeyword: '미술',
            searchArea: '서울',
        })

        expect(CLIENT_API).toHaveBeenCalledWith('openApi', {
            json: expect.objectContaining({ searchKeyword: '미술', searchArea: '서울' }),
        })
    })
})
