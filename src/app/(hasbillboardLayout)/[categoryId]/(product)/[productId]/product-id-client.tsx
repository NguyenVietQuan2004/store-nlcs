"use client";

import { ProductResType } from "@/Type/ProductType";
import { Separator } from "@/components/ui/separator";
import ListProductCard from "@/components/list-product-card";
import ProductInfor from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/productInfor";

interface ProductIdClientProps {
  data: ProductResType["data"];
}

function ProductIdClient({ data }: ProductIdClientProps) {
  const product = data?.product;
  const productRelative = data?.productsRelative;
  console.log(product);
  return (
    <div className="mt-24">
      <ProductInfor product={product} />
      <Separator className="my-10" />
      <div>
        <h2 className="text-xl font-bold my-4">Relative</h2>
        <ListProductCard gridCols={5} listProduct={productRelative} />
      </div>
    </div>
  );
}

export default ProductIdClient;
