import { Portal } from "../Portal"

export const Alert = ({
    title, 
    contents, 
    cancelBtnTxt, 
    cancelCallback, 
} : {
    title : string,
    contents : string,
    cancelBtnTxt? : string,
    cancelCallback : () => void
}) => {
    return (
        <Portal>
            <div className="fixed top-[0] left-[0] flex justify-center items-center w-dvw h-dvh z-[9999999] bg-[rgba(0,0,0,0.6)]">
                <div className="block p-[30px_60px] text-center font-bold bg-[#15151A] border-[2px] border-border-color rounded-[10px] shadow-[4px_4px_4px_#31333A]">
                    <dl>
                        <dt className="mb-[20px] text-[#fff] text-[1.3rem] [@media(max-width:499px)]:text-[1.2rem]">{title}</dt>
                        <dd className="text-basic-color text-[0.9rem] [@media(max-width:499px)]:text-[0.7rem]" dangerouslySetInnerHTML={{__html : contents}}></dd>
                    </dl>
                    <button className="w-full mt-[30px] p-[5px_15px] text-[#fff] bg-main-color border-main-color rounded-[5px]" onClick={cancelCallback}>{cancelBtnTxt??"확인"}</button>
                </div>
            </div>
        </Portal>
    )
}