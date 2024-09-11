"use client";

import Link from "next/link";
import Image from "next/image";
import { MouseEventHandler } from "react";

import { formattedPrice } from "@/lib/utils";
import { ProductType } from "@/Type/ProductType";
import IconButton from "@/components/icon-button";
import { OverViewIcon } from "../../public/icons";
import { useModalPreview } from "@/hooks/use-modal-preview";

interface ProductCardProps {
  product: ProductType;
}

function ProductCard({ product }: ProductCardProps) {
  const price = product.arrayPrice[0].price;
  const { onOpen } = useModalPreview();
  const onPreview: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onOpen(product);
  };

  const totalColors = Array.from(new Set(product.arrayPrice.flatMap((objectPrice) => objectPrice.colors)));
  return (
    <Link
      key={product._id}
      href={`/${product.categoryId._id}/${product._id}`}
      className="group   rounded-lg cursor-pointer  flex flex-col select-none shadow-lg"
    >
      <div className="relative">
        <Image
          alt=""
          src={product.images[0]}
          width={400}
          height={400}
          className="w-full aspect-square rounded-sm object-cover select-none"
        />
        <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 gap-4 flex transition-all duration-300 w-full justify-center">
          <div className="hidden sm:block">
            <IconButton onClick={onPreview}>
              <OverViewIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="flex  flex-col justify-between h-full p-4">
        <div className="text-sm  font-light flex items-center justify-between ">
          <span>
            +{totalColors.length} Color{totalColors.length > 1 && "s"}{" "}
          </span>
          <span>
            +{product.arrayPrice.length} size{product.arrayPrice.length > 1 && "s"}
          </span>
        </div>
        <div className="text-[rgb(87, 88, 90)] mt-2 text-sm line-clamp-2 font-normal min-h-10"> {product.name} </div>
        <div>
          <div className="text-sm text-[#707072] font-semibold my-1"> {product.categoryId.name} </div>

          <div className="mt-3 font-medium">{formattedPrice(price)}</div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
