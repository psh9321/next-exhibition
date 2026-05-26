import QueryProvider from "@/provider/QueryProvider";
import { LoadingView } from "@/shared/ui/loadingView";
import { SessionProvider } from "@/provider/SessionProvider";
import { LayoutWrapper } from "@/widgets/LayoutWrapper";

const PageWrapperRoot = ({children} : LAYOUT_CHILD) => {
    return (
        <SessionProvider>
          <QueryProvider>
            <LayoutWrapper>
              {children}
              </LayoutWrapper>
            <LoadingView/>

            <div id="portal-root"></div>
          </QueryProvider>
        </SessionProvider>
    )
}

export default PageWrapperRoot