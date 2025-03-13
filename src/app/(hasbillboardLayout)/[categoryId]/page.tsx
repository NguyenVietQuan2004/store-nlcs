import { productAPI } from "@/apiRequest/productAPI";
import { handlError } from "@/components/handle-error";
import { ListProductResType } from "@/Type/ProductType";
import CategoryClient from "@/app/(hasbillboardLayout)/[categoryId]/category-client";

async function CategoryId({ params }: { params: { categoryId: string } }) {
  let listProduct: ListProductResType | null = null;
  const limitServer = 48; // số lượng sản phẩm fetch về từ server

  try {
    listProduct = await productAPI.getListProduct({
      category_id: params.categoryId,
      page: 1,
      limit: limitServer,
      variants: [],
    });
  } catch (error) {
    handlError({ consoleError: "GET_LIST_PRODUCT_SIZES_COLORS_API_ERROR", error });
  }
  return (
    <div className="px-2 lg:px-10 mx-auto">
      <CategoryClient limitServer={limitServer} listProductInit={listProduct} />
    </div>
  );
}

export default CategoryId;
