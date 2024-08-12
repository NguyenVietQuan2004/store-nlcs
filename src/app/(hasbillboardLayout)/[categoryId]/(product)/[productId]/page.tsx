import { notFound } from "next/navigation";

import { ProductResType } from "@/Type/ProductType";
import { productAPI } from "@/apiRequest/productAPI";
import { handlError } from "@/components/handle-error";
import ProductIdClient from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/product-id-client";

interface ProductIdProps {
  params: { categoryId: string; productId: string };
}

async function getProduct(categoryId: string, productId: string) {
  let product: ProductResType | null = null;
  try {
    product = await productAPI.getProduct({ categoryId, productId });
  } catch (error) {
    handlError({ consoleError: "GET_PRODUCT_ID_ERROR", error });
  }
  if (!product) {
    notFound();
  }
  return product;
}

async function ProductId({ params }: ProductIdProps) {
  const product = await getProduct(params.categoryId, params.productId);
  return <ProductIdClient data={product.data} />;
}

export default ProductId;
