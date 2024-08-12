"use client";

import { ListSizeResType } from "@/Type/SizeTypes";
import { ListColorResType } from "@/Type/ColorType";
import { ListProductResType } from "@/Type/ProductType";
import ListProductCard from "@/components/list-product-card";
import Filter from "@/app/(hasbillboardLayout)/[categoryId]/filter";
interface CategoryClientProps {
  sizes: ListSizeResType | null;
  colors: ListColorResType | null;
  listProduct: ListProductResType | null;
}

function CategoryClient({ listProduct, sizes, colors }: CategoryClientProps) {
  const listSize = sizes?.data;
  const listColor = colors?.data;

  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-1 grid grid-cols-1 gap-10">
        <Filter data={listSize} valueKey="sizeId" name="Sizes" />
        <Filter data={listColor} valueKey="colorId" name="Colors" />
      </div>
      {!listProduct || !listProduct?.data?.length ? (
        <div className="text-center col-span-3"> No results found</div>
      ) : (
        <ListProductCard gridCols={3} listProduct={listProduct.data} />
      )}
    </div>
  );
}

export default CategoryClient;
