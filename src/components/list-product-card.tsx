"use client";

import ProductCard from "@/components/product-card";
import PreviewModal from "@/components/previewModal";
import { ListProductResType } from "@/Type/ProductType";

function ListProductCard({
  listProduct,
  gridCols,
}: {
  listProduct: ListProductResType["data"]["listProduct"] | undefined;
  gridCols: number;
}) {
  return (
    <>
      <PreviewModal />{" "}
      <div className={`col-span-3 grid  gap-2`} style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}>
        {listProduct?.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
    </>
  );
}

export default ListProductCard;
