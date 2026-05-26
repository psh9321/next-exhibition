
import Link from 'next/link';

import { DoorOpen, Ticket, CalendarSearch } from 'lucide-react';

const NotFoundPage = () => {
    
    return (
        <section className='mt-[100px] text-center'>
            <p className='text-main-color text-[4rem] font-bold'>404</p>
            <DoorOpen className='inline-block stroke-main-color' size={140}/>
            <h1 className="mt-[10px] text-[#fff] text-[1.8rem]">페이지를 찾을 수 없습니다.</h1>
            <p className='my-[15px_40px] text-basic-color text-[1.1rem]'>요청하신 페이지가 존재하지 않거나 <br/> 이동되었을 수 있습니다.</p>

            <ul className='inline-block w-[280px] [&>li]:border [&>li]:rounded-[10px] [&>li>a]:flex [&>li>a]:justify-center [&>li>a]:items-center [&>li>a]:gap-[10px] [&>li>a]:py-[15px] [&>li>a]:text-[1.4rem] [&>li>a>svg]:inline-block [&>li>a>svg]:size-[30px]'>
                <li className='text-[#fff] bg-main-color border-main-color'>
                    <Link href={"/"}><Ticket/> 전시 찾기</Link>
                </li>
                <li className='mt-[15px] text-basic-color border-basic-color'>
                    <Link href={"/metting"}><CalendarSearch/> 모임 찾기</Link>
                </li>
            </ul>
        </section>
    )
}

export default NotFoundPage