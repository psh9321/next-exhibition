"use client"

import { useState } from "react";

import { Settings } from "lucide-react"

import { BtnLogout } from '@/entities/auth/ui/BtnLogout';

import { UpdateUserForm } from "./UpdateUserForm";

import { BtnUserDelete } from "./BtnUserDelete";

export const UtilBox = () => {
    const [isMenu, SetIsMenu] = useState(false);

    const [ isUserForm, SetIsUserForm ] = useState(false);

    function ToggleMenuCallback() { 
        if(isUserForm) SetIsUserForm(false);
        SetIsMenu(!isMenu) 
    };

    return (
        <>

            <button onClick={ToggleMenuCallback} className="inline-block">
                <Settings size={22}  className="stroke-basic-color"/>
            </button>        
            
            {
                isMenu &&
                <>
                    <div className="absolute bottom-[100px] left-[200px] w-[300px] py-[10px] text-basic-color font-bold bg-[#0e131d] border border-[2px] border-border-color rounded-[10px] shadow-[4px_4px_4px_#31333A] z-[2] ">
                        {
                            isUserForm ? 
                            <UpdateUserForm cancelCallback={() => SetIsUserForm(false)}/>
                            :
                            <ul className="space-y-[10px] [&>li]:w-full [&>li>button]:block [&>li]:px-[15px] [&>li>button]:w-full [&>li>button]:p-[5px_10px] [&>li>button]:text-left [&>li>button]:text-[1.2rem] [&>li>button]:rounded-[5px] [&>li>button:hover]:text-[#fff] [&>li>button:hover]:bg-main-color">
                                <li>
                                    <button onClick={() => SetIsUserForm(true)}>유저 정보 수정</button>
                                </li>
                                <li>
                                    <BtnUserDelete/>
                                </li>
                                <li>
                                    <BtnLogout/>
                                </li>
                            </ul>
                        }
                    </div>
                    <div onClick={ToggleMenuCallback} className="fixed top-0 left-0 block w-full h-full z-[1]"></div>
                </>
            }
        </>
    )
}