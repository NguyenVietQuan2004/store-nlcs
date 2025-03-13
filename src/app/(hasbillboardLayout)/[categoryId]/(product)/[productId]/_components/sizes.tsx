import Link from "next/link";
import { Ruler } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { currentSizeProps } from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/productInfor";
import { ProductType } from "@/Type/ProductType";
import React from "react";

interface objectPriceProps {
  size: string;
  price: number;
  amount: number;
  colors: Array<string>;
}

interface SizeProps {
  currentSize: currentSizeProps;
  variants: ProductType["variants"];
  setCurrentSize: React.Dispatch<React.SetStateAction<currentSizeProps>>;
  product_variants: ProductType["product_variants"];
}
const replacePart = (str: string, index: number, replacement: string) =>
  str
    .split("-")
    .map((part, i) => (i === index ? replacement : part))
    .join("-");
function Sizes({ currentSize, setCurrentSize, variants, product_variants }: SizeProps) {
  const handleChangeSize = (objectItem: { variant: ProductType["variants"][number]; value: string; index: number }) => {
    const newSku = replacePart(
      currentSize.skuUserSelect,
      objectItem.index,
      objectItem.value.trim().replace(/\s+/g, "")
    ).toUpperCase();
    const product_variant = product_variants.find((item) => {
      return item.sku === newSku;
    })!;
    setCurrentSize({
      ...currentSize,
      skuUserSelect: newSku,
      price: product_variant.price,
      maxAmount: product_variant.stock,
      currentAmount:
        (currentSize?.currentAmount || 0) > product_variant.stock ? product_variant.stock : currentSize.currentAmount,
    });
  };
  return (
    <div className="flex flex-col gap-3">
      {variants?.map((variant, index) => {
        const disable = currentSize.maxAmount === 0;
        const splitSkuUserSelect = currentSize.skuUserSelect.split("-");
        return (
          <React.Fragment key={variant.name}>
            <div className=" flex gap-3 flex-wrap items-center">
              <div className="min-w-[50px]">{variant.name}</div>
              {variant.values.map((item) => {
                const active = splitSkuUserSelect.includes(item.toUpperCase().trim().replace(/\s+/g, ""));

                return (
                  <Button
                    onClick={() => handleChangeSize({ variant, value: item, index })}
                    className={buttonVariants({
                      variant: "outline",
                      className: ` disabled:text-zinc-500 text-black !font-semibold overflow-hidden ${
                        active && " border border-black !rounded-br-none"
                      } relative `,
                      size: "sm",
                    })}
                    key={item}
                    disabled={disable}
                  >
                    {item}
                    {active && (
                      <div className="absolute bottom-0 right-0 border-8 border-t-transparent border-l-transparent border-black"></div>
                    )}
                    {disable && (
                      <>
                        <div
                          className=" absolute 
              top-0 right-1/2 h-full rotate-45 border border-dashed border-zinc-400 "
                        ></div>
                        <div
                          className=" absolute 
            top-0 right-1/2 h-full -rotate-45 border border-dashed border-zinc-400 "
                        ></div>
                      </>
                    )}
                  </Button>
                );
              })}
            </div>
          </React.Fragment>
        );
      })}

      {/* {arrayPrice.map((objectPrice) => {
        const active = objectPrice.size === currentSize.size;
        const disable = objectPrice.amount === 0;
        return (
          <Button
            onClick={() => handleChangeSize(objectPrice)}
            className={buttonVariants({
              variant: "outline",
              className: ` disabled:text-zinc-500 text-black !font-semibold overflow-hidden ${
                active && " border border-black !rounded-br-none"
              } relative `,
              size: "sm",
            })}
            key={objectPrice.size}
            disabled={disable}
          >
            {objectPrice.size}
            {active && (
              <div className="absolute bottom-0 right-0 border-8 border-t-transparent border-l-transparent border-black"></div>
            )}
            {disable && (
              <>
                <div
                  className=" absolute 
              top-0 right-1/2 h-full rotate-45 border border-dashed border-zinc-400 "
                ></div>
                <div
                  className=" absolute 
            top-0 right-1/2 h-full -rotate-45 border border-dashed border-zinc-400 "
                ></div>
              </>
            )}
          </Button>
        );
      })} */}
      <Link href="/size" className=" text-[#2D68A8] flex items-center gap-1 text-sm font-light  self-end">
        <Ruler size={15} className="text-[#707072] rotate-90" /> See Size Guide
      </Link>
    </div>
  );
}

export default Sizes;
