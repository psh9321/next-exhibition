import { ApiSuccess, ApiFail, ApiError } from '@/shared/model/response'

describe('ApiSuccess', () => {
    it('resultCode가 200이고 data를 포함한다', () => {
        const data = { id: 1, name: '전시회' }
        const response = new ApiSuccess(data)

        expect(response.resultCode).toBe(200)
        expect(response.data).toEqual(data)
        expect(response.errMsg).toBe('')
    })

    it('null 데이터도 처리한다', () => {
        const response = new ApiSuccess(null)
        expect(response.resultCode).toBe(200)
        expect(response.data).toBeNull()
    })
})

describe('ApiFail', () => {
    it('resultCode가 403이고 errMsg를 포함한다', () => {
        const data = { query: 'test' }
        const msg = '전시 목록 불러오기 실패'
        const response = new ApiFail(data, msg)

        expect(response.resultCode).toBe(403)
        expect(response.data).toEqual(data)
        expect(response.errMsg).toBe(msg)
    })
})

describe('ApiError', () => {
    it('resultCode가 500이고 errMsg를 포함한다', () => {
        const err = new Error('서버 오류')
        const msg = '전시 목록 불러오기 통신 에러'
        const response = new ApiError(err, msg)

        expect(response.resultCode).toBe(500)
        expect(response.data).toEqual(err)
        expect(response.errMsg).toBe(msg)
    })
})
