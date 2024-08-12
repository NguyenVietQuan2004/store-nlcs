import httpRequest from "@/lib/http";
import { ListProductBodyType, ListProductResType, ProductBodyType, ProductResType } from "@/Type/ProductType";

export const productAPI = {
  getListProduct(body?: ListProductBodyType) {
    return httpRequest.get<ListProductResType>(
      `${process.env.NEXT_PUBLIC_API_ADMIN}/products?categoryId=${body?.categoryId}&sizeId=${body?.sizeId}&colorId=${body?.colorId}`,
      {
        cache: "no-store",
      }
    );
  },

  getProduct(body: ProductBodyType) {
    return httpRequest.get<ProductResType>(
      `${process.env.NEXT_PUBLIC_API_ADMIN}/products/${body.productId}?categoryId=${body.categoryId}`,
      {
        cache: "no-store",
      }
    );
  },
};
