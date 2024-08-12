"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { MouseEventHandler, useState } from "react";

import { useCart } from "@/hooks/useCart";
import { formattedPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/Type/ProductType";
import { Separator } from "@/components/ui/separator";
import Sizes from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/sizes";
import Colors from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/colors";

interface ProductInforProps {
  product: ProductType;
}
export interface currentSizeProps {
  size: string;
  price: number;
  colors: Array<string>;
  colorUserSelect: string;
  imagesUserSelect: string;
}
function ProductInfor({ product }: ProductInforProps) {
  const [currentSize, setCurrentSize] = useState<currentSizeProps>({
    size: product.arrayPrice[0].size,
    price: product.arrayPrice[0].price,
    colors: product.arrayPrice[0].colors,
    colorUserSelect: product.arrayPrice[0].colors[0],
    imagesUserSelect: product.images[0],
  });
  const { addItem, items } = useCart();
  const handleAddtoCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    addItem({
      product,
      size: currentSize.size,
      color: currentSize.colorUserSelect,
    });
  };
  return (
    <div className="grid grid-cols-7 gap-x-9">
      <div className="col-span-3">
        <Image
          alt=""
          width={1000}
          height={1000}
          className="w-full aspect-square object-cover rounded-lg select-none"
          src={currentSize.imagesUserSelect}
          priority
        />
        <div className="mt-4  grid grid-cols-4 gap-3">
          {product.images.map((image) => (
            <div
              onClick={() => setCurrentSize({ ...currentSize, imagesUserSelect: image })}
              key={image}
              className="border-[3px] border-transparent hover:border-black rounded-sm p-1"
            >
              <Image
                alt=""
                width={1000}
                height={1000}
                className="aspect-square object-cover rounded-sm select-none"
                src={image}
                priority
              />
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-3">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <div className="mt-3 font-semibold">{formattedPrice(currentSize.price)}</div>
        <Separator className="my-5" />
        <Sizes setCurrentSize={setCurrentSize} currentSize={currentSize} arrayPrice={product.arrayPrice} />
        <Colors currentSize={currentSize} setCurrentSize={setCurrentSize} />
        <Button className="mt-6 rounded-full" onClick={handleAddtoCart}>
          Add to cart <ShoppingCart className="ml-2" size={20} />
        </Button>
      </div>
    </div>
  );
}

export default ProductInfor;
