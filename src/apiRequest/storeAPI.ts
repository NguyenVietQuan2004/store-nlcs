import httpRequest from "@/lib/http";
export const storeAPI = {
  getStore() {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ADMIN}/store`, {
      cache: "no-cache",
    });
  },
};
