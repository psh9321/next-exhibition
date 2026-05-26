"use client"

import { CalendarClock, UsersRound, UserStar } from 'lucide-react';

import { useMettingDetailHook } from "@/entities/metting/detail/hook/useMettingDetailHook";

export const MettingInfo = () => {

    const { mettingDate, createUser, members, totalMember } = useMettingDetailHook();



    return (
        <article className="w-[calc(100%-320px)]">
            <h3 className="mb-[30px] text-[#fff] text-left text-[1.4rem] font-bold">모임 정보</h3>
            <ul className="flex justify-around text-basic-color text-center [&>li>h3]:inline-flex [&>li>h3]:items-center [&>li>h3]:gap-[5px] [&>li>h3]:mb-[10px] [&>li>h3]:text-[1.05rem] [&>li>h3>svg]:size-[20px] [&>li:nth-child(n+2)]:relative [&>li:nth-child(n+2)]:[&:after]:content-[''] [&>li:nth-child(n+2)]:[&:after]:absolute [&>li:nth-child(n+2)]:[&:after]:top-1/2 [&>li:nth-child(n+2)]:[&:after]:left-[-50%] [&>li:nth-child(n+2)]:[&:after]:-translate-1/2 [&>li:nth-child(n+2)]:[&:after]:block [&>li:nth-child(n+2)]:[&:after]:w-[1px] [&>li:nth-child(n+2)]:[&:after]:h-[40%] [&>li:nth-child(n+2)]:[&:after]:bg-basic-color">
                <li>
                    <h3><CalendarClock/> 모임 날짜</h3>
                    <p>{mettingDate["date"]}</p>
                    <p className="text-main-color text-[1.2rem]" >{mettingDate["time"]}</p>
                </li>
                <li>
                    <h3><UserStar/> 모임장</h3>
                    <p className="text-[#fff] text-[1.2rem]" >{createUser?.["name"]}</p>
                </li>
                <li>
                    <h3><UsersRound/> 참여 인원</h3>
                    <p className="text-[1.2rem]">
                        <span className="text-main-color">{members.length}명</span> / {totalMember}명
                    </p>
                </li>
            </ul>
        </article>
    )
}