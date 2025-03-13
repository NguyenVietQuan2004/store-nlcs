"use client";

import Image from "next/image";
import { useState } from "react";

import { useCart } from "@/hooks/useCart";
import { formattedPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { productOrderType } from "@/Type/OrderTypes";
import Sizes from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/sizes";
import { currentSizeProps } from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/productInfor";

interface UpdateSizeModalInfoProps {
  productOrder: productOrderType;
  onClose: () => void;
}

function UpdateSizeModalInfo({ productOrder, onClose }: UpdateSizeModalInfoProps) {
  const objectPrice = productOrder.product.product_variants.find(
    (objectPrice) => objectPrice._id === productOrder.product_variant_id
  )!;
  const skus = productOrder.product.product_variants.map((item) => item.sku);
  const sku = productOrder.product.product_variants.find((item) => item._id === productOrder.product_variant_id);
  const [currentSize, setCurrentSize] = useState<currentSizeProps>({
    price: objectPrice?.price || 0,
    skus: skus,
    skuUserSelect: sku?.sku || skus[0],
  });
  const { upUpdateProductVariant } = useCart();
  const handleUpdate = () => {
    upUpdateProductVariant({
      old: {
        productId: productOrder.product._id,
        product_variant_id: productOrder.product_variant_id,
      },
      new: {
        product_variant_id: productOrder.product.product_variants.find((item) => {
          // console.log(item.sku, currentSize.skuUserSelect);
          return item.sku === currentSize.skuUserSelect;
        })?._id!,
      },
    });
    onClose();
  };

  return (
    <div className="grid grid-cols-2 gap-4 text-[#111111]">
      <div>
        <Image
          alt=""
          src={productOrder.product.images[0]}
          width={1000}
          height={1000}
          className="w-full aspect-square object-cover rounded-lg select-none"
        />
      </div>
      <div className="flex justify-between flex-col">
        <div>
          <div className="font-medium">{productOrder.product.category.name}</div>
          <div className="text-2xl font-semibold line-clamp-2 leading-[36px] my-1">{productOrder.product.name}</div>
          <div className="font-medium">{formattedPrice(currentSize.price)}</div>
        </div>
        <div>
          {/* <Sizes
            currentSize={currentSize}
            setCurrentSize={setCurrentSize}
            arrayPrice={productOrder.product.arrayPrice}
          /> */}
          <Sizes
            setCurrentSize={setCurrentSize}
            currentSize={currentSize}
            variants={productOrder.product.variants}
            product_variants={productOrder.product.product_variants}
          />
          {/* <Colors currentSize={currentSize} setCurrentSize={setCurrentSize} /> */}
          <Button className="w-full" onClick={handleUpdate}>
            Update Size
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UpdateSizeModalInfo;
