import React from "react";

export function ImageError (e : React.UIEvent<HTMLImageElement>) {
    const self = e.currentTarget;
    self.src = "/img404.png";

    self.alt+="(콘텐츠 에러)"

}