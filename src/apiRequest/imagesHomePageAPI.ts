import httpRequest from "@/lib/http";
import { ImagesHomePageResType } from "@/Type/ImagesHomePage";

export const ImagesHomePageAPI = {
  getImagesHomePage() {
    return httpRequest.get<ImagesHomePageResType>(`${process.env.NEXT_PUBLIC_API_ADMIN}/imageshomepage`, {
      cache: "no-cache",
    });
  },
};
