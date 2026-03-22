import { API_EXHIBITION_DETAIL_SERVER } from '@/entities/exhibition/detail/api/exhibition.detail.server'

jest.mock('@/shared/api/instance', () => ({
    OPEN_API: jest.fn(),
}))

jest.mock('@/shared/lib/xmlToJson', () => ({
    XmlToJson: jest.fn(),
}))

const mockDetailItem = {
    seq: 'EX001',
    title: '특별 전시회',
    place: '서울 미술관',
    area: '서울',
    startDate: 20241201,
    endDate: 20241231,
    imgUrl: 'https://example.com/img.jpg',
} as unknown as EXHIBITION_DETAIL_ITEM

function setupMocks(xmlResponse: object) {
    const { OPEN_API } = jest.requireMock('@/shared/api/instance')
    const { XmlToJson } = jest.requireMock('@/shared/lib/xmlToJson')
    OPEN_API.mockReturnValue({ text: jest.fn().mockResolvedValue('<xml/>') })
    XmlToJson.mockReturnValue(xmlResponse)
}

describe('API_EXHIBITION_DETAIL_SERVER', () => {
    beforeEach(() => jest.clearAllMocks())

    describe('API 정상 호출', () => {
        it('OPEN_API가 detail2 엔드포인트와 seq를 포함하여 호출된다', async () => {
            const { OPEN_API } = jest.requireMock('@/shared/api/instance')
            const { XmlToJson } = jest.requireMock('@/shared/lib/xmlToJson')
            OPEN_API.mockReturnValue({ text: jest.fn().mockResolvedValue('<xml/>') })
            XmlToJson.mockReturnValue({
                response: { body: { items: { item: mockDetailItem } } },
            })

            await API_EXHIBITION_DETAIL_SERVER('EX001')

            expect(OPEN_API).toHaveBeenCalledWith(
                'detail2',
                expect.objectContaining({
                    searchParams: expect.objectContaining({ seq: 'EX001' }),
                }),
            )
        })
    })

    describe('성공/실패 분기 처리', () => {
        it('정상 응답 시 전시 상세 데이터를 반환한다', async () => {
            setupMocks({ response: { body: { items: { item: mockDetailItem } } } })

            const result = await API_EXHIBITION_DETAIL_SERVER('EX001')
            expect(result).toEqual(mockDetailItem)
        })

        it('OpenAPI_ServiceResponse가 있으면 null을 반환한다', async () => {
            setupMocks({ OpenAPI_ServiceResponse: { error: '오류' } })
            expect(await API_EXHIBITION_DETAIL_SERVER('EX001')).toBeNull()
        })

        it('response가 없으면 null을 반환한다', async () => {
            setupMocks({})
            expect(await API_EXHIBITION_DETAIL_SERVER('EX001')).toBeNull()
        })
    })

    describe('에러 핸들링', () => {
        it('Error 인스턴스 발생 시 메시지와 함께 throw한다', async () => {
            const { OPEN_API } = jest.requireMock('@/shared/api/instance')
            OPEN_API.mockReturnValue({
                text: jest.fn().mockRejectedValue(new Error('타임아웃')),
            })

            await expect(API_EXHIBITION_DETAIL_SERVER('EX001')).rejects.toContain('타임아웃')
        })

        it('알 수 없는 에러 발생 시 기본 에러 메시지를 throw한다', async () => {
            const { OPEN_API } = jest.requireMock('@/shared/api/instance')
            OPEN_API.mockReturnValue({
                text: jest.fn().mockRejectedValue('unknown'),
            })

            await expect(API_EXHIBITION_DETAIL_SERVER('EX001')).rejects.toContain(
                'API_EXHIBITION_DETAIL',
            )
        })
    })
})
