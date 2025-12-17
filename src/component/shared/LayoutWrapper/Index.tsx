import { Main } from "./_html";

import { LAYOUT_CHILD } from "@/types/component"

export const LayoutWrapper = ({ children } : LAYOUT_CHILD) => {
    return (
        <Main>
            {children}
        </Main>
    );
};