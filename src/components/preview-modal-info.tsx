"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { formattedPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/Type/ProductType";

interface PreviewModalInfoProps {
  product: ProductType;
  onClose: () => void;
}

function PreviewModalInfo({ product, onClose }: PreviewModalInfoProps) {
  const [currentImage, setCurrentImage] = useState(product?.images[0] || "");
  const router = useRouter();
  return (
    <>
      <div className="flex items-end gap-x-6">
        <h2 className="text-2xl font-bold">{product?.name}</h2>
        <div className=" text-[#28a745] font-light mt-4">
          Just in {formattedPrice(product.product_variants[0].price)}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-2">
        <div>
          <Image
            alt=""
            src={currentImage}
            width={1000}
            height={1000}
            className="w-full aspect-square object-cover rounded-lg select-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 overflow-auto max-h-[428px]">
          {product?.images.map((image) => (
            <div key={image} className={` rounded-sm p-1`} onMouseEnter={() => setCurrentImage(image)}>
              <Image
                alt=""
                src={image}
                width={200}
                height={200}
                className="w-full aspect-square object-cover rounded-sm select-none"
              />
            </div>
          ))}
        </div>
      </div>
      <Button
        onClick={() => {
          router.push(`/${product.category._id}/${product._id}`);
          onClose();
        }}
        className="text-blue-400 ml-auto outline-none border-none underline "
        variant={"outline"}
      >
        Continue to detail <ArrowRight size={18} className="ml-1" />{" "}
      </Button>
    </>
  );
}

export default PreviewModalInfo;
