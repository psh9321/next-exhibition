
import { DETAIL_PAGE_SERVER } from "@/types/page";

import { ExhibitionDetailQueryServer } from "@/component/shared/ExhibitionDetailServer/Index";

const ExhibitionDetailPageServer = async ({ params } : DETAIL_PAGE_SERVER) => ExhibitionDetailQueryServer(params);

export default ExhibitionDetailPageServer;