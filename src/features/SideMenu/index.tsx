"use client"

import Link from 'next/link';
import dynamic from 'next/dynamic';

import { MessageSquareMore, CalendarSearch, Tickets } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSessionHook } from '@/shared/hook/useSessionHook';
import { BtnNaviFavorite } from '@/features/BtnNavi/BtnNaviFavorite';
import { BtnNaviMettingPromise } from '@/features/BtnNavi/BtnNaviMettingPromise';

const BeforeLogin = dynamic(() => import("./components/BeforeLogin").then(m => m.BeforeLogin));

const AfterLogin = dynamic(() => import("./components/AfterLogin").then(m => m.AfterLogin));

export const SideMenu = () => {   

    const pathname = usePathname();

    const { isLogin } = useSessionHook();

    return (
        <aside className="sticky top-0 flex flex-col w-[240px] h-dvh pt-[20px] border border-r-[2px] border-r-[#31333A]">
            <h3 className="leading-[1.3] px-[20px] text-main-color text-[1.5rem]">Discover <br/> Exhibitions</h3>
            <nav className='mt-[30px]' >
                <ul className=' px-[20px] space-y-[25px] [&>li>a]:relative [&>li>a]:inline-flex [&>li>a]:items-center [&>li>a]:gap-[10px] [&>li>a]:text-basic-color [&>li>a]:text-[1.2rem] [&>li>a>span]:block [&>li>a>span]:size-[28px] [&>li>a>span]:leading-[28px] [&>li>a>span]:text-center [&>li>a>span]:text-[#dedae6] [&>li>a>span]:text-[0.8rem] [&>li>a>span]:rounded-[100%] [&>li>a>span]:bg-main-color [&>li.active>a]:text-main-color'>
                    <li className={`${pathname === "/" && "active"}`}>
                        <Link href={"/"}>
                            <Tickets/> 전시 찾기
                        </Link>
                    </li>
                    <li>
                        <Link href={"/metting"}>
                            <CalendarSearch/> 모임 찾기
                        </Link>
                    </li>
                    <li>
                        <BtnNaviMettingPromise/>
                    </li>
                    <li>
                        <BtnNaviFavorite/>
                    </li>
                    <li>
                        <Link href={"/message"}>
                            <MessageSquareMore/> 메세지
                            <span>999</span>
                        </Link>
                    </li>
                </ul>

            </nav>
            
            <div className='mt-auto'>
                {
                    isLogin ? <AfterLogin/> : <BeforeLogin/>
                }
            </div>
        </aside>
    )
}