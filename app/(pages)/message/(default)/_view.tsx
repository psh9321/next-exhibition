"use client"

import Link from 'next/link';

import { Calendars, CalendarSearch } from 'lucide-react';

const MessageRoomListPageView = () => {

    return (
        <div className="mt-[200px] text-center font-bold">
            <Calendars size={50} className='inline-block mb-[30px]' />
            <h1 className='mb-[15px] text-[1.1rem]'>{`" 모임에 참여한 사람들과 대화를 나눠보세요. "`}</h1>   
            <p className='text-[1.6rem]'>모임에 참여한 사람끼리 대화를 나눌수 있습니다.</p>
            <Link className='inline-flex items-center gap-[10px] mt-[20px] p-[15px_40px] text-[#fff] text-[1.2rem] bg-main-color border border-main-color rounded-[10px]' href={"/metting"}><CalendarSearch/> 모임 찾기 </Link>
        </div>
    )
}

export default MessageRoomListPageView