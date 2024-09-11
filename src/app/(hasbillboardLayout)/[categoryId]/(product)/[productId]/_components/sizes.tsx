import Link from "next/link";
import { Ruler } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { currentSizeProps } from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/productInfor";

interface objectPriceProps {
  size: string;
  price: number;
  amount: number;
  colors: Array<string>;
}

interface SizeProps {
  currentSize: currentSizeProps;
  arrayPrice: objectPriceProps[];
  setCurrentSize: React.Dispatch<React.SetStateAction<currentSizeProps>>;
}

function Sizes({ arrayPrice, currentSize, setCurrentSize }: SizeProps) {
  const handleChangeSize = (objectPrice: objectPriceProps) => {
    setCurrentSize({
      ...currentSize,
      size: objectPrice.size,
      price: objectPrice.price,
      colors: objectPrice.colors,
      maxAmount: objectPrice.amount,
      colorUserSelect: objectPrice.colors[0],
    });
  };
  return (
    <div className=" flex gap-3 flex-wrap items-center">
      Size:
      {arrayPrice.map((objectPrice) => {
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
      })}
      <Link href="/size" className=" text-[#2D68A8] flex items-center gap-1 text-sm font-light  self-end">
        <Ruler size={15} className="text-[#707072] rotate-90" /> See Size Guide
      </Link>
    </div>
  );
}

export default Sizes;
