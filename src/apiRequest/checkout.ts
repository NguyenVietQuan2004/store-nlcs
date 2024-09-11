import httpRequest from "@/lib/http";
import { productOrderType } from "@/Type/OrderTypes";

export const checkoutAPI = {
  checkout(body: productOrderType[]) {
    return httpRequest.post<{ url: string }>(`${process.env.NEXT_PUBLIC_API_ADMIN}/checkout`, {
      cache: "no-cache",
      body,
    });
  },
};
