import { productAPI } from "@/apiRequest/productAPI";
import { handlError } from "@/components/handle-error";
import { ListProductResType } from "@/Type/ProductType";
import ListProductCard from "@/components/list-product-card";

export default async function Home() {
  let listProduct: ListProductResType | null = null;

  try {
    listProduct = await productAPI.getListProduct();
  } catch (error) {
    handlError({ consoleError: "GET_LIST_PRODUCT_OF_STORE_API_ERROR", error });
  }

  return (
    <>
      <h2 className="text-2xl font-extrabold my-10">Featured Product</h2>
      {!listProduct || !listProduct?.data?.length ? (
        <div className="text-center my-4">No results found</div>
      ) : (
        <>
          <ListProductCard gridCols={4} listProduct={listProduct.data} />
        </>
      )}
    </>
  );
}
