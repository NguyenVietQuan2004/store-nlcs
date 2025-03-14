"use client";

import Link from "next/link";
import Image from "next/image";
import { MouseEventHandler } from "react";

import { formattedPrice } from "@/lib/utils";
import { ProductType } from "@/Type/ProductType";
import IconButton from "@/components/icon-button";
import { OverViewIcon } from "../../public/icons";
import { useModalPreview } from "@/hooks/use-modal-preview";
import { object } from "zod";

interface ProductCardProps {
  product: ProductType;
  title?: string;
}

function ProductCard({ product, title }: ProductCardProps) {
  const price = product.product_variants[0].price;
  const { onOpen } = useModalPreview();
  const onPreview: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onOpen(product);
  };
  return (
    <Link
      key={product._id}
      href={`/${product.category._id}/${product._id}`}
      className="group relative  rounded-lg cursor-pointer  flex flex-col select-none shadow-lg"
    >
      {title === "new" && (
        <div className="inline-block absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
          NEW
        </div>
      )}
      {title === "sales" && (
        <div className="text-[12px] text-[rgb(238, 77, 45)] right-0 rounded-bl-sm  text-[#ee4d2d] absolute z-10  bg-[#feeeea] px-1 py-1">
          -{product?.sales}%
        </div>
      )}

      <div className="relative">
        <Image
          priority
          alt=""
          src={product?.images[0]}
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
          {product?.variants.map((variant, index) => {
            if (index > 1) return null;
            return (
              <span key={variant.name} className="">
                +{variant.values.length} {variant.name}
              </span>
            );
          })}
        </div>
        <div className="text-[rgb(87, 88, 90)] mt-2 text-sm line-clamp-2 font-normal min-h-10"> {product.name} </div>
        <div>
          <div className="text-sm text-[#707072] font-semibold my-1"> {product.category.name} </div>

          <div className="mt-3 font-medium">{formattedPrice(price)}</div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
