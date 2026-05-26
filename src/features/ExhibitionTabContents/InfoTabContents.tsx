"use client"

import Link from "next/link";

import { useExhibitionDetailHook } from "@/entities/exhibition/detail/hook/useExhibitionDetailHook"
import { useExhibitionDetailTabMenuStore } from "@/entities/exhibition/detail/store/useExhibitionDetailTabMenuStore";
import { ExhibitionDateFormat } from "@/shared/util/dateFormat";

export const InfoTabContents = () => {

    const data = useExhibitionDetailHook();

    const currentTab = useExhibitionDetailTabMenuStore(state => state.currentTab);

    // if(currentTab !== "info") return <></>

    return (
        <article>
            <h3 className="mb-[15px] text-[#fff] text-[1.4rem] font-bold">전시 정보</h3>
            <ul className="[&>li]:p-[10px] [&>li]:border-t [&>li]:border-t-border-color [&>li]:border-t-[#f0f] [&>li>dl]:flex [&>li>dl]:text-basic-color [&>li>dl]:text-[1.1rem] [&>li>dl]:font-bold [&>li>dl>dt]:w-[100px] [&>li>dl>dt]:mr [&>li>dl>dt]:text-[#5D6268] [&>li>dl>dd]:w-[calc(100%-100px)] [&>li>dl>dd]:break-all">
                <li>
                    <dl>
                        <dt>장소</dt>
                        <dd>{data?.["place"]}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>관람 기간</dt>
                        {
                            (data?.["startDate"] && data?.["endDate"])
                            && 
                            <dd>{ExhibitionDateFormat(data?.["startDate"])} ~ {ExhibitionDateFormat(data?.["endDate"])}</dd>
                        }
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>관람 요금</dt>
                        <dd>{data?.["price"] ? data?.["price"] : "무료"}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>문의</dt>
                        <dd>{data?.["phone"]}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>웹사이트</dt>
                        <dd>
                            {
                                data?.["url"] && 
                                <Link className="underline" target="_blank" href={data?.["url"]}>{data?.["url"]}</Link>
                            }
                        </dd>
                    </dl>
                </li>
            </ul>
        </article>
    )
}