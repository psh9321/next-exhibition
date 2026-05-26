"use client"

import Image from "next/image"

import { useRef } from "react";

import { useForm, useFormState } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { ArrowBigLeft, CircleUserRound, ImageOff, RefreshCcw, ImagePlus } from "lucide-react"

import { useUpdateUserHook } from "@/entities/users/update/hook/useUpdateUserHook";
import { userUpdateModel } from "@/entities/users/update/schema/user.update.schema";

import { useSessionHook } from "@/shared/hook/useSessionHook";
import { OnValueLimit } from "@/shared/util/onValueLimit";
import { API_CLIENT_USER_PROFILE } from "@/entities/users/profile/api/api.client.profile";
import { LogoutCallback } from "@/entities/auth/util/logout";
import { useToastHook } from "@/shared/hook/useToastHook";
import { toastOpts } from "@/shared/util/toastOps";

interface UPDATE_USER_FORM {
    cancelCallback : () => void
}

export const UpdateUserForm = ({ cancelCallback } : UPDATE_USER_FORM) => {
    

    const { user, SessionUpdateCallback } = useSessionHook();

    const { mutateAsync } = useUpdateUserHook();

    const { InitAlert, ToastAlert } = useToastHook();

    const { register, control, setValue, watch, getValues, handleSubmit, reset } = useForm({
        resolver : zodResolver(userUpdateModel),
        defaultValues : {
            updateName : user?.name??"",
            updateIsProfileImg : user?.isProfileImg??false,
            profileImg : user?.isProfileImg ? `${process.env.NEXT_PUBLIC_FILE_DIRECTORY}/${user?.id}/profile.jpeg` : "",
        }
    });

    const { isDirty, errors } = useFormState({ control });

    const inputRef = useRef<HTMLInputElement>(null);

    function SetProfileImgCallback(e : React.ChangeEvent<HTMLInputElement>) {

        const items = e.target.files;

        if(!items) return 

        const item = items[0];

        const data = new FormData();

        data.append("item",item);

        if(!getValues("updateIsProfileImg")) setValue("updateIsProfileImg", true, {shouldDirty : true});
        setValue("profileImg",URL.createObjectURL(item), {shouldDirty : true});
    }

    function ResetProfileImgCallback() {
        if(!getValues("updateIsProfileImg")) return
        if(inputRef.current) inputRef.current.value = "";
        setValue("updateIsProfileImg", false, {shouldDirty : true});
        setValue("profileImg", "", {shouldDirty : true});
        setValue("formFile", null);
    }

    async function SubmitCallback(params : USER_UPDATE_ITEM) {
        if(!isDirty) return

        if(inputRef.current?.files) {
            const item = inputRef.current?.files[0];

            const data = new FormData();

            data.append("item",item);

            await API_CLIENT_USER_PROFILE(data);
        }

        const { resultCode, data } = await mutateAsync(params);

        if(resultCode === -999) return InitAlert(toastOpts["unAuthorized"], async () => {
            await LogoutCallback()
        });

        await SessionUpdateCallback({
            name : data?.updateInfo.name,
            isProfileImg : data?.updateInfo.isProfileImg,
        });

        // console.log(data?.updateInfo.isProfileImg ? `${process.env.NEXT_PUBLIC_FILE_DIRECTORY}/${user?.id}/profile.jpeg` : "", "####")
        // reset({ 
        //     updateIsProfileImg : data?.updateInfo.isProfileImg, 
        //     profileImg : data?.updateInfo.isProfileImg ? `${process.env.NEXT_PUBLIC_FILE_DIRECTORY}/${user?.id}/profile.jpeg` : ""
        //  });

        if(inputRef.current) inputRef.current.value = "";
    }

    return (
        <>
            <ToastAlert/>
            <article className="relative w-full p-[10px_20px]">
                <h2 className="sr-only">유저 정보 수정 폼</h2>
                <button onClick={cancelCallback}>
                    <ArrowBigLeft/>
                </button>
                <form onSubmit={handleSubmit(SubmitCallback)} className="flex flex-col justify-center items-end">
                    <ul className="inline-block w-[200px] mx-auto space-y-[20px]">
                        <li>
                            <label className="inline-block mb-[10px] text-[1.1rem]" htmlFor="userName">유저 이름 <span className="block text-main-color text-[0.7rem]">(공복제외 최대 7자 입력가능)</span></label>
                            <input maxLength={7} onInput={OnValueLimit} {...register("updateName")} defaultValue={user?.name} placeholder="변경할 유저 이름을 입력해주세요." type="text" id="userName" className="block w-full p-[5px_10px] border rounded-[5px] outline-none [&::placeholder]:text-[0.75rem]" />
                            <p className="h-[19px] mt-[6px] text-[#ff5c8a] text-[0.8rem]">{errors.updateName && `* ${errors.updateName.message}`}</p>
                        </li>
                        <li className="flex flex-wrap items-center gap-x-[15px]">
                            <h3 className="inline-block  text-[1.1rem]">프로필 이미지</h3>
                            <div className="flex gap-[5px] [&>*>svg]:size-[20px]">
                                <label className="cursor-pointer" htmlFor="userProfileImg">
                                    { watch("profileImg") ? <RefreshCcw/> : <ImagePlus/> }
                                </label>
                                { watch("profileImg") && <button onClick={ResetProfileImgCallback} type="button"><ImageOff/></button> }
                            </div>
                            <div className="relative w-[200px] h-[240px] mt-[10px] text-center">
                                {
                                    getValues("updateIsProfileImg") ? 
                                    <Image className="border border-basic-color rounded-[10px]" loading="eager" src={`${process.env.NEXT_PUBLIC_FILE_DIRECTORY}/${user?.id}/profile.jpeg`} alt="유저 이미지" sizes="100%" fill unoptimized />
                                    // <Image className="border border-basic-color rounded-[10px]" loading="eager" src={watch("profileImg") as string} alt="유저 이미지" sizes="100%" fill unoptimized />
                                    :
                                    <CircleUserRound className="inline-block mt-[20px]" size={150}/>
                                }
                                
                            </div>
                            <input ref={inputRef} onChange={SetProfileImgCallback} type="file" id="userProfileImg" accept="image/*" hidden/>
                        </li>
                    </ul>
                    <button type="submit" className={`inline-block mt-[15px] p-[5px_20px] text-[#fff] border rounded-[5px] ${isDirty ? "bg-main-color border-main-color" : "bg-basic-color border-basic-color"}`}>수정</button>
                </form>
                <p className="mt-[20px] text-right text-[0.8rem]">가입일 : {user?.createDate}</p>
            </article>
        </>

    )
}
