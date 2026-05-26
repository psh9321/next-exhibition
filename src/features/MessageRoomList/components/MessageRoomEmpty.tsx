"use client"

import { MessageSquareDashed } from 'lucide-react';

export const MessageRoomEmpty = () => {
    return (
        <li className='mt-[100px] text-center'>
            <MessageSquareDashed size={35} className='inline-block mb-[10px]'/>
            <h3 className='font-bold'>대화중인 방이 없습니다.</h3>
        </li>
    )
}