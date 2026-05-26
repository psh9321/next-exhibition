import MessageRoomPageView from "./_view";

interface MESSAGE_ROOM_PAGE_SERVER {
  params : Promise<{
      _id: string
  }>
}

const MessageRoomPageServer = async ({ params } : MESSAGE_ROOM_PAGE_SERVER) => {

    const { _id } = await params;

    return (
        <MessageRoomPageView/>
    )
}

export default MessageRoomPageServer