"use client"

import Link from 'next/link';

import { Ticket } from 'lucide-react';

import { useMettingDetailHook } from "@/entities/metting/detail/hook/useMettingDetailHook"
import { mettingBtnStyle } from '@/entities/metting/toggle/styles/btn';

import { BtnMettingToggle } from '../BtnMetting/BtnMettingToggle';
import { BtnUpdateMettingForm } from './ui/BtnUpdateMettingForm';
import { BtnMettingDelete } from '../BtnMetting/BtnMettingDelete';

export const BtnMettingList = () => {

    const { exhibitionSeq, isCreateUser } = useMettingDetailHook();

    return (
        <ul className='flex gap-[10px]'>
            {
                !isCreateUser &&
                <li>
                    <BtnMettingToggle className={mettingBtnStyle}/>
                </li>
            }
            <li>
                <Link className={mettingBtnStyle} href={`/exhibition/${exhibitionSeq}`}>
                    <Ticket/> 전시 상세정보 보기
                </Link>
            </li>
            {
                isCreateUser && 
                <>
                    <li>
                        <BtnUpdateMettingForm/>
                    </li>
                    <li>
                        <BtnMettingDelete/>
                    </li>                
                </>
            }
        </ul>
    )
}