"use client"

import Image from "next/image";

import { UtilBox } from "./UtilBox";
import { useSessionHook } from "@/shared/hook/useSessionHook";
import { GoogleLogo, KakaoLogo, NaverLogo } from "../../svg/SSOLogo";

export const AfterLogin = () => {

    const { user } = useSessionHook();

    return (
        <div className="relative flex justify-between items-start h-[90px]  p-[15px] border border-t-[2px] border-t-[#31333A]">
            <Image width={36} height={36} src={"/user.profile.null.png"} alt="dd" />
            <dl className="w-[calc(100%-70px)] text-basic-color">
                <dt className="w-full text-[1.05rem] font-bold">{user?.name}</dt>
                <dd className="mt-[5px]">
                    {
                        user?.type === "kakao" && <KakaoLogo size={25} />
                    }
                    {
                        
                        user?.type === "naver" && <NaverLogo size={25} />
                    }
                    {
                        user?.type === "google" && <GoogleLogo />
                    }
                </dd>
            </dl>
            <UtilBox/>
        </div>
    )    
}