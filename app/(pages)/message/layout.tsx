import { MessageRoomList } from "@/features/MessageRoomList"

interface ROOT_LAYOUT extends LAYOUT_CHILD {
    parallel : React.ReactNode,
}

const MessagePageRoot = ({ children } : ROOT_LAYOUT) => {
    return (
        <div className="flex max-w-[980px] mx-auto text-basic-color">
            <section className="w-[318px] h-dvh py-[20px] pr-[15px] border-border-color border-r-[2px] overflow-y-auto">
                <MessageRoomList/>
            </section>
            <section className="relative w-[calc(100%-320px)] p-[20px]">{children}</section>
        </div>
    )
}

export default MessagePageRoot