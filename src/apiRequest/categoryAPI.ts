import httpRequest from "@/lib/http";
import { ListCategoryResType } from "@/Type/CategoryTypes";

export const categoryAPI = {
  getListCategory() {
    return httpRequest.get<ListCategoryResType>(`${process.env.NEXT_PUBLIC_API_ADMIN}/categories`, {
      cache: "no-cache",
    });
  },
};
