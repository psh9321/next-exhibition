import { API_EXHIBITION_LIST_SERVER } from '@/entities/(index)/api/exhibition.list.server'

jest.mock('@/shared/api/instance', () => ({
    OPEN_API: jest.fn(),
}))

jest.mock('@/shared/lib/xmlToJson', () => ({
    XmlToJson: jest.fn(),
}))

const mockQueryData: OPEN_API_QUERY_DATA = {
    PageNo: '1',
    numOfrows: '24',
    serviceTp: 'A',
}

function setupMocks(xmlResponse: object) {
    const { OPEN_API } = jest.requireMock('@/shared/api/instance')
    const { XmlToJson } = jest.requireMock('@/shared/lib/xmlToJson')
    OPEN_API.mockReturnValue({ text: jest.fn().mockResolvedValue('<xml/>') })
    XmlToJson.mockReturnValue(xmlResponse)
}

describe('API_EXHIBITION_LIST_SERVER', () => {
    beforeEach(() => jest.clearAllMocks())

    describe('API 정상 호출', () => {
        it('OPEN_API가 올바른 엔드포인트로 호출된다', async () => {
            const { OPEN_API } = jest.requireMock('@/shared/api/instance')
            const { XmlToJson } = jest.requireMock('@/shared/lib/xmlToJson')
            OPEN_API.mockReturnValue({ text: jest.fn().mockResolvedValue('<xml/>') })
            XmlToJson.mockReturnValue({
                response: {
                    body: {
                        totalCount: '1',
                        PageNo: '1',
                        numOfrows: '24',
                        items: { item: [{ seq: 'EX001' }] },
                    },
                },
            })

            await API_EXHIBITION_LIST_SERVER(mockQueryData)

            expect(OPEN_API).toHaveBeenCalledWith('realm2', expect.objectContaining({ method: 'get' }))
        })

        it('searchParams에 serviceKey와 쿼리 데이터가 포함된다', async () => {
            const { OPEN_API } = jest.requireMock('@/shared/api/instance')
            const { XmlToJson } = jest.requireMock('@/shared/lib/xmlToJson')
            OPEN_API.mockReturnValue({ text: jest.fn().mockResolvedValue('<xml/>') })
            XmlToJson.mockReturnValue({
                response: {
                    body: {
                        totalCount: '1',
                        PageNo: '1',
                        numOfrows: '24',
                        items: { item: [{ seq: 'EX001' }] },
                    },
                },
            })

            await API_EXHIBITION_LIST_SERVER(mockQueryData)

            expect(OPEN_API).toHaveBeenCalledWith(
                'realm2',
                expect.objectContaining({
                    searchParams: expect.objectContaining({ PageNo: '1', numOfrows: '24' }),
                }),
            )
        })
    })

    describe('성공/실패 분기 처리', () => {
        it('정상 응답 시 total, page, limit, data를 포함한 객체를 반환한다', async () => {
            setupMocks({
                response: {
                    body: {
                        totalCount: '10',
                        PageNo: '1',
                        numOfrows: '24',
                        items: {
                            item: [
                                { seq: 'EX001', title: '전시1' },
                                { seq: 'EX002', title: '전시2' },
                            ],
                        },
                    },
                },
            })

            const result = await API_EXHIBITION_LIST_SERVER(mockQueryData)

            expect(result?.total).toBe(10)
            expect(result?.page).toBe(1)
            expect(result?.limit).toBe(24)
            expect(result?.data).toHaveLength(2)
        })

        it('OpenAPI_ServiceResponse가 있으면 null을 반환한다', async () => {
            setupMocks({ OpenAPI_ServiceResponse: { error: '서비스 오류' } })
            expect(await API_EXHIBITION_LIST_SERVER(mockQueryData)).toBeNull()
        })

        it('response가 없으면 null을 반환한다', async () => {
            setupMocks({})
            expect(await API_EXHIBITION_LIST_SERVER(mockQueryData)).toBeNull()
        })

        it('item이 단일 객체이면 배열로 감싸서 반환한다', async () => {
            setupMocks({
                response: {
                    body: {
                        totalCount: '1',
                        PageNo: '1',
                        numOfrows: '24',
                        items: { item: { seq: 'EX001' } },
                    },
                },
            })

            const result = await API_EXHIBITION_LIST_SERVER(mockQueryData)
            expect(Array.isArray(result?.data)).toBe(true)
        })
    })

    describe('에러 핸들링', () => {
        it('Error 인스턴스 발생 시 메시지와 함께 throw한다', async () => {
            const { OPEN_API } = jest.requireMock('@/shared/api/instance')
            OPEN_API.mockReturnValue({
                text: jest.fn().mockRejectedValue(new Error('네트워크 오류')),
            })

            await expect(API_EXHIBITION_LIST_SERVER(mockQueryData)).rejects.toContain('네트워크 오류')
        })

        it('알 수 없는 에러 발생 시 기본 에러 메시지를 throw한다', async () => {
            const { OPEN_API } = jest.requireMock('@/shared/api/instance')
            OPEN_API.mockReturnValue({
                text: jest.fn().mockRejectedValue('unknown'),
            })

            await expect(API_EXHIBITION_LIST_SERVER(mockQueryData)).rejects.toContain(
                'API_EXHIBITION_LIST_SERVER',
            )
        })
    })
})
