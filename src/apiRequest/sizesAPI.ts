import httpRequest from "@/lib/http";
import { ListSizeResType } from "@/Type/SizeTypes";

export const sizeAPI = {
  getListSize() {
    return httpRequest.get<ListSizeResType>(`${process.env.NEXT_PUBLIC_API_ADMIN}/sizes`, {
      cache: "no-store",
    });
  },
};
