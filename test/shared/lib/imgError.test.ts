import React from 'react'
import { ImageError } from '@/shared/lib/imgError'

describe('ImageError', () => {
    it('이미지 src를 "/img404.png"로 교체한다', () => {
        const img = document.createElement('img')
        img.src = 'https://example.com/broken.jpg'
        img.alt = '전시 이미지'

        ImageError({ currentTarget: img } as unknown as React.UIEvent<HTMLImageElement>)

        expect(img.src).toContain('img404.png')
    })

    it('alt에 "(콘텐츠 에러)"를 추가한다', () => {
        const img = document.createElement('img')
        img.alt = '전시 이미지'

        ImageError({ currentTarget: img } as unknown as React.UIEvent<HTMLImageElement>)

        expect(img.alt).toBe('전시 이미지(콘텐츠 에러)')
    })
})
