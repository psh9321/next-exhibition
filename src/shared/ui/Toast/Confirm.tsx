import { Portal } from "../Portal"

export const Confirm = ({ 
    title, 
    contents, 
    cancelBtnTxt, 
    submitBtnTxt, 
    cancelCallback, 
    submitCallback 
} : {
    title : string,
    contents : string,
    cancelBtnTxt? : string,
    submitBtnTxt? : string,
    cancelCallback : () => void
    submitCallback : () => void
}) => {
    return (
        <Portal>
            <div className="fixed top-[0] left-[0] flex justify-center items-center w-dvw h-dvh z-[9999999] bg-[rgba(0,0,0,0.6)]">
                <div className="block p-[30px_60px] text-center font-bold bg-[#15151A] rounded-[10px] shadow-[4px_4px_4px_#31333A]">
                    <dl>
                        <dt className="mb-[20px] text-[#fff] text-[1.3rem] [@media(max-width:499px)]:text-[1.2rem]">{title}</dt>
                        <dd className="text-basic-color text-[0.9rem] [@media(max-width:499px)]:text-[0.7rem]" dangerouslySetInnerHTML={{__html : contents}}></dd>
                    </dl>
                    <ul className="flex justify-center mt-[30px] text-[#fff] gap-[10px] [&>li>button]:p-[5px_15px] [&>li>button]:border [&>li>button]:rounded-[5px] [@media(max-width:499px)]:[&>li>button]:text-[0.8rem]">
                        <li><button onClick={cancelCallback} >{cancelBtnTxt}</button></li>
                        <li><button className="bg-main-color border-main-color" onClick={submitCallback}>{submitBtnTxt??"확인"}</button></li>
                    </ul>
                </div>
            </div>
        </Portal>

    )
}