import httpRequest from "@/lib/http";
import { ImagesHomePageResType } from "@/Type/ImagesHomePage";

export const ImagesHomePageAPI = {
  getImagesHomePageAndDiscover() {
    return httpRequest.get<ImagesHomePageResType>(`${process.env.NEXT_PUBLIC_API_ADMIN}/informationhomepage`, {
      cache: "no-cache",
    });
  },
};
