import httpRequest from "@/lib/http";
import {
  ListProductBodyType,
  ListProductByIdBodyType,
  ListProductResType,
  ProductBodyType,
  ProductResType,
} from "@/Type/ProductType";

export const productAPI = {
  getListProduct(body?: ListProductBodyType) {
    return httpRequest.get<ListProductResType>(
      `${process.env.NEXT_PUBLIC_API_ADMIN}/products?category_id=${body?.category_id}&value=${body?.value}&variants=${body?.variants}&sortBy=${body?.sortBy}&limit=${body?.limit}&page=${body?.page}`,
      {
        cache: "no-cache",
      }
    );
  },
  getListByListId(body: ListProductByIdBodyType) {
    return httpRequest.post<ListProductResType>(`${process.env.NEXT_PUBLIC_API_ADMIN}/products`, {
      body,
    });
  },
  getProduct(body: ProductBodyType) {
    return httpRequest.get<ProductResType>(
      `${process.env.NEXT_PUBLIC_API_ADMIN}/products/${body.productId}?categoryId=${body.categoryId}`,
      {
        cache: "no-cache",
      }
    );
  },
};
