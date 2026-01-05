"use client"

import Image from "next/image";
import Link from "next/link";

import { Section, Div } from "./_html";

interface EMPTY_PAGE {
    title? : string,
    contents? : string,
    closeCallback? : () => void
}

export const EmptyPage = ({ title, contents, closeCallback } : EMPTY_PAGE) => {

    return (
        <Section>
            <h2 className="hidden">존재하지 않는 페이지</h2>
            <Div>
                <h1>
                    <strong>404</strong>
                    {title??"페이지를 찾을 수 없습니다."}
                </h1>
                <p>{contents??"요청하신 페이지를 찾을수 없습니다."}</p>
                <p>전시 목록으로 돌아갈까요?</p>
                <Link onClick={e => {
                    if(closeCallback) {
                        e.preventDefault();
                        closeCallback()
                    }
                }} href={"/"}>
                    전시목록으로 돌아가기
                </Link>
            </Div>
            <Image loading="eager" src={"/not-found.png"} alt="존재하지 않는 페이지 이미지" width={650} height={500}/>
        </Section>
    );
};