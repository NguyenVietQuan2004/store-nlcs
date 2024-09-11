"use client";

import Image from "next/image";
import { useState } from "react";

import { useCart } from "@/hooks/useCart";
import { formattedPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { productOrderType } from "@/Type/OrderTypes";
import Sizes from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/sizes";
import Colors from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/colors";
import { currentSizeProps } from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/productInfor";

interface UpdateSizeModalInfoProps {
  productOrder: productOrderType;
  onClose: () => void;
}

function UpdateSizeModalInfo({ productOrder, onClose }: UpdateSizeModalInfoProps) {
  const objectPrice = productOrder.product.arrayPrice.find((objectPrice) => objectPrice.size === productOrder.size)!;
  const [currentSize, setCurrentSize] = useState<currentSizeProps>({
    size: productOrder.size,
    price: objectPrice.price,
    colors: objectPrice.colors,
    colorUserSelect: productOrder.color,
  });
  const { onUpdateSize } = useCart();
  const handleUpdate = () => {
    onUpdateSize({
      old: {
        productId: productOrder.product._id,
        size: productOrder.size,
        color: productOrder.color,
      },
      new: {
        color: currentSize.colorUserSelect,
        size: currentSize.size,
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
          <div className="font-medium">{productOrder.product.categoryId.name}</div>
          <div className="text-2xl font-semibold line-clamp-2 leading-[36px] my-1">{productOrder.product.name}</div>
          <div className="font-medium">{formattedPrice(productOrder.product.arrayPrice[0].price)}</div>
        </div>
        <div>
          <Sizes
            currentSize={currentSize}
            setCurrentSize={setCurrentSize}
            arrayPrice={productOrder.product.arrayPrice}
          />
          <Colors currentSize={currentSize} setCurrentSize={setCurrentSize} />
          <Button className="w-full" onClick={handleUpdate}>
            Update Size
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UpdateSizeModalInfo;
