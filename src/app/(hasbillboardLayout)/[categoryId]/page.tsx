import { sizeAPI } from "@/apiRequest/sizesAPI";
import { colorAPI } from "@/apiRequest/colorAPI";
import { ListSizeResType } from "@/Type/SizeTypes";
import { ListColorResType } from "@/Type/ColorType";
import { productAPI } from "@/apiRequest/productAPI";
import { handlError } from "@/components/handle-error";
import { ListProductResType } from "@/Type/ProductType";
import CategoryClient from "@/app/(hasbillboardLayout)/[categoryId]/category-client";

async function CategoryId({
  params,
  searchParams,
}: {
  params: { categoryId: string };
  searchParams: { sizeId: string; colorId: string };
}) {
  let listProduct: ListProductResType | null = null;
  let sizes: ListSizeResType | null = null;
  let colors: ListColorResType | null = null;

  try {
    listProduct = await productAPI.getListProduct({
      categoryId: params.categoryId,
      sizeId: searchParams.sizeId,
      colorId: searchParams.colorId,
    });
    sizes = await sizeAPI.getListSize();
    colors = await colorAPI.getListColor();
  } catch (error) {
    handlError({ consoleError: "GET_LIST_PRODUCT_SIZES_COLORS_API_ERROR", error });
  }

  return (
    <>
      <CategoryClient listProduct={listProduct} sizes={sizes} colors={colors} />
    </>
  );
}

export default CategoryId;
