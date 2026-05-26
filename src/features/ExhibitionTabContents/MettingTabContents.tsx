"use client"

import Link from "next/link"

import { ExternalLink, CalendarClock, UsersRound, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight } from 'lucide-react';

import { useMettingPaginationHook } from "@/entities/metting/list/mettings/hook/useMettingPaginationHook";

import { DateParser } from "@/shared/util/dateParser";

export const MettingTabContents = () => {

    const { 
        data, 
        paginations, 
        currentPage, 
        exhibitionSeq, 
        currentPagination, 
        PageMoveCallback,
        FirstPageMoveCallback,
        PrevPageMoveCallback,
        NextPageMoveCallback,
        LastPageMoveCallback,
    } = useMettingPaginationHook();

    return (
        <article>
            <h3 className="mb-[15px] text-[#fff] text-[1.4rem] font-bold">해당 전시 등록된 모임</h3>
            <table className="table-fixed w-full text-basic-color text-center">
                <thead className="">
                    <tr className="mb-[10px] border-b [&>th]:h-[40px] [&>th]:leading-[40px] [&>th>svg]:inline-block [&>th>svg]:size-[20px] [&>th>svg]:mr-5px">
                        <th><ExternalLink />모임</th>
                        <th><CalendarClock /> 모임 날짜</th>
                        <th><UsersRound /> 정원</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((el, i) => {
                            const { date, time } = DateParser(el["mettingDate"])
                            return (
                                <tr className="[&>td]:h-[50px] [&>td]:leading-[50px] [&>td]:px-[10px] [&>td]:text-[#fff]" key={`전시에등록된모임-page-${el["exhibitionSeq"]}-${i}`}>
                                    <td className="">
                                        <Link className="block truncate underline underline-offset-[6px]" href={`/metting/detail/${el["_id"]}`}>{el["mettingTitle"]}</Link>
                                    </td>
                                    <td>{date} {time}</td>
                                    <td>현재 {el["members"].length} 명 / 총원 {el["totalMember"]} 명</td>
                                </tr>
                            )                            
                        })
                    }
                </tbody>
            </table>

            <div className="flex justify-center items-center w-full mt-[15px] text-basic-color">
                <div className="flex items-center">
                    <button onClick={FirstPageMoveCallback}><ChevronsLeft size={30}/></button>
                    <button onClick={PrevPageMoveCallback}><ChevronLeft size={30}/></button>
                </div>
                <ol className="flex justify-center items-center gap-[15px] mx-[10px]">
                    {
                        paginations[currentPagination]?.map((el, i) => {
                            return <li key={`전시에등록된모임-page-${exhibitionSeq}-${i}`}>
                                <button value={el} className={`min-w-[30px] h-[30px] px-[5px] font-bold border rounded-[5px] ${el === currentPage && "text-[#fff] bg-main-color border-main-color"}`} onClick={() => PageMoveCallback(el)}>{el+1}</button>
                            </li>
                        })
                    }
                </ol>
                <div className="flex items-center">
                    <button onClick={NextPageMoveCallback}><ChevronRight size={30}/></button>
                    <button onClick={LastPageMoveCallback}><ChevronsRight size={30}/></button>
                </div>
            </div>
        </article>
    )
}