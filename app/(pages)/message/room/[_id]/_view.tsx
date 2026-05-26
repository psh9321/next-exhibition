"use client"

import Link from "next/link";

import { SrcHttpToHttps } from "@/shared/util/srcHttpToHttps"
import { TextArea } from "@/shared/ui/TextArea"
import Image from "next/image";

import TextareaAutosize from "react-textarea-autosize";
import { Send } from "lucide-react";

const MessageRoomPageView = () => {

    return (
        <>
            <article className="max-h-[calc(100%-150px)] min-h-[100%-50px]"> 
                <h2 className="sr-only">메세지 리스트</h2>
                <ol>
                    <li className="flex justify-start gap-[5px]">
                        <div className="relative block size-[50px]">
                            <Image className="rounded-[100%]" fill src={SrcHttpToHttps("http://www.culture.go.kr/upload/rdf/25/04/show_20250415142925884.jpg")} alt="더미" loading="eager" />
                        </div>
                        <div className="w-[calc(100%-55px)]">
                            <h3>유저이름</h3>
                            <TextareaAutosize className="w-full p-[15px] text-[#fff] bg-basic-color rounded-[10px]" defaultValue={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis esse ex ipsam excepturi quis deleniti quo id consequuntur dolor quaerat voluptatum, eos dolore cupiditate labore? Quam, est voluptatum quo doloribus corrupti error tenetur ducimus cumque, provident exercitationem illum tempore incidunt voluptas ratione alias maiores possimus fuga atque ad non temporibus illo. Delectus modi dicta sint debitis est iste veritatis esse, ex fuga alias expedita recusandae totam deserunt quidem possimus aliquam deleniti quod assumenda nesciunt inventore, rem mollitia dignissimos, et minus! Obcaecati totam ex atque labore inventore quas recusandae. Deleniti sequi eveniet vero beatae neque voluptatum iure et, velit maiores ratione?"}/>
                        </div>
                    </li>
                </ol>
            </article>
            <article className="retlaive flex gap-[10px]">
                <div className="relative bottom-0">
                    <TextareaAutosize className="relative origin-bottom w-[calc(100%-75px)] p-[5px_10px] max-h-[150px] border rounded-[10px]" defaultValue={"xxx"}/>
                </div>
                <button className="w-[65px] h-[36px] text-[#fff] text-center bg-main-color rounded-[10px]"><Send className="inline-block" size={25}/></button>
            </article>
        </>
    )
}

export default MessageRoomPageView