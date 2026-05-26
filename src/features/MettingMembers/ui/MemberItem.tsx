"use client"

import Image from "next/image"

import { useState } from "react"

interface MEMBER_ITEM {
    item : {
        name: string;
        id: string;
        isProfileImg: boolean;
    }
}

export const MemberItem = ({ item } : MEMBER_ITEM) => {

    const [ isUserBox, SetIsUserBox ] = useState(false);

    return (
        <li className="relative block">
            <button className="relative size-[30px]">
                {
                    <Image fill unoptimized sizes="100vw" src={item["isProfileImg"] ? `${process.env.NEXT_PUBLIC_FILE_DIRECTORY}/${item["id"]}/profile.png` : "/user.profile.null.png"} alt={item["isProfileImg"] ? `${item["name"]} 프로필 이미지` : "프로필 아이콘"} />
                }
            </button>
            {/* <div className="absolute top-[50px] min-w-[100px]">
                <div className="flex flex-col justify-center items-center min-w-[100px] max-w-[150px] h-[90px] px-[20px] text-[#fff] text-center bg-[#222226] rounded-[10px]">
                    <h3 className="block w-full mb-[5px] font-bold">{item["name"]}</h3>
                    <Image width={30} height={30} unoptimized src={item["isProfileImg"] ? `${process.env.NEXT_PUBLIC_FILE_DIRECTORY}/${item["id"]}/profile.png` : "/user.profile.null.png"} alt={item["isProfileImg"] ? `${item["name"]} 프로필 이미지` : "프로필 아이콘"} />
                </div>
            </div> */}
            {
                isUserBox && 
                <div className="fixed top-0 left-0 w-full h-full bg-[#f0f] z-5"></div>
            }
        </li>   
    )
}