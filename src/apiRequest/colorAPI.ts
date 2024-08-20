import httpRequest from "@/lib/http";
import { ListColorResType } from "@/Type/ColorType";

export const colorAPI = {
  getListColor() {
    return httpRequest.get<ListColorResType>(`${process.env.NEXT_PUBLIC_API_ADMIN}/colors`, {
      cache: "no-cache",
    });
  },
};
