"use client"

interface MY_LATEST_POST_LAYOUT extends LAYOUT_CHILD {
    label : string
}

export const MyLatestPostLayout = ({ children, label } : MY_LATEST_POST_LAYOUT) => {
    return (
        <article className="relative block w-full min-h-[180px] p-[20px_10px] bg-[#222226] border border-border-color rounded-[10px] box-shadow-[3px 3px 3px rgba(0,0,0,0.8)]">
            <h3 className="mb-[20px] text-[#fff] text-[1.2rem] font-bold">
                {label}
            </h3>
            {children}
        </article>
    )
}