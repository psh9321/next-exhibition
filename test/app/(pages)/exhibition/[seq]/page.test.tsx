import { ReactElement } from "react";

import ExhibitionDetailPageServer from "@/app/(pages)/exhibition/[seq]/page";

import { ExhibitionDetailServer } from "@/widgets/ExhibitionDetailServer";
import { API_EXHIBITION_DETAIL_SERVER } from "@/entities/exhibition/detail/api/exhibition.detail.server";

jest.mock("@/widgets/ExhibitionDetailServer", () => ({
  ExhibitionDetailServer: jest.fn(async () => "MOCK"),
}));

describe("전시 상세페이지 테스트", () => {
  it("searchParams 를 ExhibitionDetailServer에 전달", async () => {
    const mockResult = <div>Mock Detail</div> as ReactElement;

    (ExhibitionDetailServer as jest.Mock).mockResolvedValue(mockResult);

    const searchParams = {
      params : Promise.resolve({ seq: "12345" })
    }
    
    await ExhibitionDetailPageServer(searchParams);
  });
});
