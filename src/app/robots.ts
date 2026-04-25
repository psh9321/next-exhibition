import type { MetadataRoute } from "next"

export default function roboto() : MetadataRoute.Robots {

    return {
        rules : [
            {
                userAgent : "*",
                allow : "/"
            }
        ],
        sitemap : "https://exhibition.psh9321-portfolio.p-e.kr/sitemap.xml"
    }
}