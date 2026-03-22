import { XmlToJson } from '@/shared/lib/xmlToJson'

describe('XmlToJson', () => {
    it('정상 XML을 JSON 객체로 변환한다', () => {
        const xml = `<response><body><item><title>전시회</title></item></body></response>`
        const result = XmlToJson(xml)
        expect(result.response.body.item.title).toBe('전시회')
    })

    it('중첩 구조를 올바르게 변환한다', () => {
        const xml = `<root><parent><child>value</child></parent></root>`
        expect(XmlToJson(xml).root.parent.child).toBe('value')
    })
})
