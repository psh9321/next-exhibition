import type { MetadataRoute } from "next"

export default function roboto() : MetadataRoute.Robots {

    return {
        rules : [
            {
                userAgent : "*",
                allow : "/"
            }
        ],
        sitemap : "https://next-exhibition.vercel.app/sitemap.xml"
    }
}