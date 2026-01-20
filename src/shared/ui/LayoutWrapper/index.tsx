import { Main } from "./_html";

export const LayoutWrapper = ({ children } : LAYOUT_CHILD) => {
    return (
        <Main>
            {children}
        </Main>
    );
};