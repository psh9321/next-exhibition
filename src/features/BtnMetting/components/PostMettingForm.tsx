"use client"

import Image from "next/image";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { decode } from "he";
import { MapPinHouse, Banknote, SquareX } from 'lucide-react';
import ReactQuill from "react-quill-new";

import { mettingFormModel } from "@/entities/metting/post/schema/metting.add.schema";
import { useMettingPostHook } from "@/entities/metting/post/hook/useMettingPostHook";
import { useToastHook } from "@/shared/hook/useToastHook";

import { LogoutCallback } from "@/entities/auth/util/logout";
import { ExhibitionStatus } from "@/entities/exhibition/detail/util/exhibitionStatus";

import { SrcHttpToHttps } from "@/shared/util/srcHttpToHttps";
import { ImageError } from "@/shared/util/imgError";
import { ExhibitionDateFormat } from "@/shared/util/dateFormat";
import { toastOpts } from "@/shared/util/toastOps";

import { PeanutLoader } from "@/shared/ui/PeanutLoader";
import { Portal } from "@/shared/ui/Portal"

interface POST_METTING_FORM {

    isPostStatus : "add" | "update"

    exhibitionInfo : {
        exhibitionSeq : string,
        exhibitionThumbnail : string,
        exhibitionTitle : string,
        exhibitionStartDate : string | number,
        exhibitionEndDate : string | number,
        exhibitionPlace : string;
        exhibitionPrice : string,
    },

    defaultFormValue? : {
        createUserId : string,
        mettingTitle : string,
        mettingContents : string,
        mettingDate : Date,
        mettingTotalMember : number,
        members : string[],
        mettingId : string
    },

    createUserId? : string,

    cancelCallback: () => void
}

export const PostMettingForm = ({ exhibitionInfo, defaultFormValue, isPostStatus, createUserId, cancelCallback } : POST_METTING_FORM) => {
    
    const { control, register, handleSubmit, formState : { isSubmitting, errors } } = useForm({
        resolver : zodResolver(mettingFormModel),
        defaultValues : {
            postStatus : isPostStatus,
            mettingTitle : defaultFormValue?.mettingTitle??"",
            members : defaultFormValue?.members??[createUserId],
            createUserId : defaultFormValue?.createUserId??createUserId,
            totalMember : defaultFormValue?.mettingTotalMember??2,
            exhibitionSeq : exhibitionInfo.exhibitionSeq,
            mettingDate : GetDateTimeLocalValue(defaultFormValue?.mettingDate as Date),
            mettingContents : defaultFormValue?.mettingContents??"",
            mettingId : defaultFormValue?.mettingId
        }
    });

    const { ToastAlert, InitAlert } = useToastHook();

    const { mutateAsync } = useMettingPostHook(isPostStatus, exhibitionInfo.exhibitionSeq);

    const currentExhibitionStatus = ExhibitionStatus(exhibitionInfo?.exhibitionStartDate??"", exhibitionInfo?.exhibitionEndDate??"");

    const statusClass = (() => {
        switch (currentExhibitionStatus) {
            case "전시 중" : return "bg-main-color"
            case "전시 예정" : return "bg-[#10B981]"
            case "전시 종료" : return "bg-[#52525B]"
        
            default: return ""
        }
    })();

    function GetDateTimeLocalValue(date : Date) {
        if(!date) return undefined

        const yyyy = date.getFullYear()
        const mm = String(date.getMonth() + 1).padStart(2, "0")
        const dd = String(date.getDate()).padStart(2, "0")
        const hh = String(date.getHours()).padStart(2, "0")
        const min = String(date.getMinutes()).padStart(2, "0")

        return `${yyyy}-${mm}-${dd}T${hh}:${min}`
    }

    async function SubmitCallback(param : METTING_POST_FORM_PARAM) {
        try {
            const { resultCode } = await mutateAsync(param) as API_METTING_POST;

            if(resultCode === -999) return InitAlert(toastOpts["unAuthorized"], async () => {
                await LogoutCallback()
            });

            cancelCallback();
        }
        catch(err) {
            console.log("PostMettingForm SubmitCallback 알수없는 에러", err);
            InitAlert(toastOpts["unknownError"]);
        }
    }

    return (
        <>
            <ToastAlert/>

            <Portal>
                <div className="fixed top-[0] left-[0] flex justify-center items-center w-dvw h-dvh z-[9999999] bg-[rgba(0,0,0,0.6)]">
                    <section className="relative w-[550px] max-h-dvh p-[30px] bg-[#0E131D] border border-border-color rounded-[10px] shadow-[4px_4px_4px_#31333A] overflow-y-scroll">

                        {
                            isSubmitting && 
                            <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.8)] z-[2]">
                                <PeanutLoader/>
                            </div>
                        }

                        <h3 className="mb-[25px] text-[#fff] text-[1.7rem] font-bold">
                            모임 {isPostStatus === "add" ? "만들기" : "수정히기"}
                            <span className="block text-basic-color text-[0.8rem]">함께 관람할 사람들을 모집해보세요.</span>
                        </h3>
                        <button onClick={cancelCallback} className="absolute top-[30px] right-[30px]">
                            <SquareX size={35} className="stroke-basic-color"/>
                        </button>
                        
                        <article className="flex justify-between">
                            <h2 className="sr-only">{decode(exhibitionInfo?.exhibitionTitle??"")} 전시 정보</h2>
                            <div className="relative w-[90px] h-[130px]">
                                <Image className="rounded-[10px]" fill unoptimized src={SrcHttpToHttps(exhibitionInfo?.exhibitionThumbnail??"")} alt={`${decode(exhibitionInfo?.exhibitionTitle??"")} 포스터 이미지`} onError={ImageError} />
                            </div>
                            <dl className="w-[calc(100%-100px)] font-bold text-basic-color [&>*]:flex [&>*]:items-start [&>*]:leading-[1.5] [&>dd]:mt-[10px] [&>dd]:text-[0.8rem] [&>dd>svg]:size-[20px] [&>dd>svg]:mr-[5px] [&>dd>p]:w-[calc(100%-24px)]">
                                <dt className="text-[#fff] text-[1.2rem]">{decode(exhibitionInfo?.exhibitionTitle??"")}</dt>
                                <dd className="mb-[20px]">
                                    <span className={`mr-[10px] px-[10px] text-[#fff] rounded-[6px] ${statusClass}`}>{currentExhibitionStatus}</span> {ExhibitionDateFormat(exhibitionInfo?.exhibitionStartDate??"")} ~ {ExhibitionDateFormat(exhibitionInfo?.exhibitionEndDate??"")}
                                </dd>
                                { exhibitionInfo.exhibitionPlace && <dd><MapPinHouse/> <p>{exhibitionInfo.exhibitionPlace}</p></dd> }
                                { exhibitionInfo.exhibitionPrice && <dd><Banknote/> <p>{exhibitionInfo.exhibitionPrice}</p></dd> }
                            </dl>
                        </article>
                        <form onSubmit={handleSubmit(SubmitCallback)} className="mt-[15px] text-basic-color">
                            <ul className="flex flex-wrap justify-between [&>li>label]:inline-block [&>li>label]:mb-[10px] [&>li>label]:text-basic-color [&>li>label]:text-[1.1rem] [&>li>label>span]:text-main-color [&>li>*]:font-bold [&>li>input]:block [&>li>input]:w-full [&>li>input]:h-[40px] [&>li>input]:px-[10px] [&>li>input]:text-[#fff] [&>li>input]:outline-none [&>li>input]:border [&>li>input]:border-border-color [&>li>input]:rounded-[5px] [&>li>input::placeholder]:text-[0.8rem] [&>li>p]:h-[24px] [&>li>p]:mt-[5px] [&>li>p]:text-[#ff5c8a] [&>li>p]:text-[0.8rem]">
                                <li className="w-full mb-[20px]">
                                    <label htmlFor="mettingTitle">모임 제목 <span>*</span></label>
                                    <input {...register("mettingTitle")} placeholder="모임 제목을 입력해주세요. (최대 30자)" type="text" id="mettingTitle" />
                                    <p >{errors.mettingTitle?.message}</p>
                                </li>
                                <li className="w-[275px]">
                                    <label htmlFor="mettingDate">
                                        모임날짜 <span>*</span>
                                    </label>
                                    <input {...register("mettingDate", { 
                                        setValueAs : value => value ? new Date(value) : undefined
                                     })} className="invalid:text-basic-color invalid:text-[0.8rem]" required onClick={e => e.currentTarget.showPicker()} type="datetime-local" id="mettingDate" />
                                    <p >{errors.mettingDate?.message}</p>
                                </li>
                                <li className="w-[calc(100%-290px)]">
                                    <label htmlFor="mettingMemberTotal">모임 총원 <span>*</span></label>
                                    <input {...register("totalMember", { valueAsNumber : true })} type="number" id="mettingMemberTotal" placeholder="ex) 총원이 세명 일 시 3 입력" />
                                    <p >{errors.totalMember?.message}</p>
                                </li>
                                <li className="w-full mt-[15px]">
                                    <label>모임 내용</label>
                                    <Controller
                                        control={control}
                                        name="mettingContents"
                                        render={({ field }) => (
                                            <ReactQuill
                                                className="post-form-quill "
                                                modules={{ toolbar : false }}
                                                readOnly={false}
                                                theme="snow"
                                                placeholder="모임을 소개하는 내용을 입력해보세요."
                                                value={field.value ?? ""}
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                            />
                                        )}
                                    />
                                </li>
                            </ul>
                            <p className="my-[30px_10px]"><span className="text-main-color">*</span> 표시된 항목은 필수 입력 항목입니다.</p>
                            <ul className="flex justify-between [&>li]:w-[calc(50%-10px)] [&>li>button]:text-center [&>li>button]:block [&>li>button]:w-full [&>li>button]:py-[10px] [&>li>button]:text-center [&>li>button]:text-[1.2rem] [&>li>button]:border [&>li>button]:rounded-[5px]">
                                <li><button type="button" onClick={cancelCallback} className="border-border-color">취소</button></li>
                                <li><button className="text-[#fff] bg-main-color border-main-color">{isPostStatus === "add" ? "등록" : "수정"}</button></li>
                            </ul>
                        </form>
                    </section>
                </div>
            </Portal>        
        </>

    )
}
