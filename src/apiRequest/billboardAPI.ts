import httpRequest from "@/lib/http";
import { BillboardBodyType, BillboardResType } from "@/Type/BillboardTypes";
import { ListCategoryResType } from "@/Type/CategoryTypes";

export const billboardAPI = {
  getBillboard(body: BillboardBodyType) {
    return httpRequest.get<BillboardResType>(`${process.env.NEXT_PUBLIC_API_ADMIN}/billboards/${body._id}`, {
      cache: "no-cache",
    });
  },
};
