import { SearchAlert } from "lucide-react";
import { P } from "./_html";

export const EmptyItem = () => {
    return (
        <P>
            <SearchAlert />
            게시물이 없습니다.
        </P>
    );
};
