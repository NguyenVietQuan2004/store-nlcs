"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { MouseEventHandler, useState } from "react";

import { useCart } from "@/hooks/useCart";
import { formattedPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/Type/ProductType";
import { useFavourite } from "@/hooks/useFavourite";
import { Separator } from "@/components/ui/separator";
import { HeartIcon, StarIcon } from "../../../../../../../public/icons";
import Sizes from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/sizes";
import Amount from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/amount";
import CodeStar from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/code-star";
import ChinhSach from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/chinh-sach";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface ProductInforProps {
  product: ProductType;
  isShowChinhSach?: boolean;
}
export interface currentSizeProps {
  price: number;
  imagesUserSelect?: string;
  currentAmount?: number;
  maxAmount?: number;
  skus: string[];
  skuUserSelect: string;
}
function ProductInfor({ product, isShowChinhSach = true }: ProductInforProps) {
  const objectPriceNotEmptyAmount = product?.product_variants?.find((item) => item.stock > 0);

  // currentSize là giữ sự thay đổi của user chọn cái nào
  // const typeFilter = Object.assign(
  //   {},
  //   ...(product.category.attributes.map((attr) => ({
  //     [attr.name]: undefined,
  //   })) ?? [])
  // );

  // const typeFilterSelect = Object.assign(
  //   {},
  //   ...(product.category.attributes.map((attr) => ({
  //     [`${attr.name}UserSelect`]: attr.values[0],
  //   })) ?? [])
  // );
  const skus = product?.product_variants.map((item) => item.sku);
  const [currentSize, setCurrentSize] = useState<currentSizeProps>({
    price: objectPriceNotEmptyAmount?.price || 0,
    skus: skus,
    skuUserSelect: skus?.[0] || "",
    imagesUserSelect: product?.images[0],
    currentAmount: 1,
    maxAmount: objectPriceNotEmptyAmount?.stock,
  });
  const { addItem } = useCart();
  const { addItemFavourite } = useFavourite();

  const handleAddtoCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    addItem({
      product,
      product_variant_id: product.product_variants.find((item) => item.sku === currentSize.skuUserSelect)!._id,
      quantity: currentSize.currentAmount || 0,
      snapshot_price: currentSize.price,
      //   size: currentSize.size,
      //   color: currentSize.colorUserSelect,
      //   amount: currentSize.currentAmount!,
      //   snapshot_price: product.arrayPrice.find((item) => item.size === currentSize.size)?.price || 0,
    });
  };
  const handleAddtoFavourite = () => {
    addItemFavourite(product);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-x-9 ">
      <div className="lg:col-span-3">
        <div className="relative">
          <Image
            alt=""
            src={currentSize.imagesUserSelect!}
            width={1000}
            height={1000}
            className="w-full aspect-square object-cover rounded-lg select-none"
          />
          <div className="absolute left-6 top-6 flex items-center bg-white px-4 py-2 text-[#111111] font-medium rounded-full">
            <StarIcon />
            <div className="ml-1">High Rated</div>
          </div>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="mt-4">
            {product?.images.map((image) => (
              <CarouselItem key={image} className=" basis-1/4 pl-2">
                <div
                  onMouseEnter={() => setCurrentSize({ ...currentSize, imagesUserSelect: image })}
                  key={image}
                  className={` rounded-sm p-1`}
                >
                  <Image
                    alt=""
                    src={image}
                    width={500}
                    height={500}
                    className="aspect-square object-cover rounded-sm select-none"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-white -translate-y-1/2 z-[999]" />
          <CarouselNext className="right-2 bg-white -translate-y-1/2" />
        </Carousel>
      </div>

      <div className="lg:col-span-4">
        <h2 className="text-2xl font-bold">{product?.name}</h2>
        <div className=" text-[#28a745] font-light mt-4">
          {objectPriceNotEmptyAmount?.stock || (0 > 0 && "(còn hàng)")}
        </div>
        <Separator className="mt-1 mb-5" />
        <CodeStar maxAmount={currentSize.maxAmount!} id={product?._id} />
        {/* <div className="mb-3 font-semibold">{formattedPrice(currentSize.price)}</div> */}
        <div className="mb-3 font-semibold">
          {product?.sales ? (
            <>
              <span className="text-[#b1b1b3] text-sm line-through mr-4"> {formattedPrice(currentSize.price)} </span>
              {formattedPrice((currentSize.price * (100 - product.sales)) / 100)}
            </>
          ) : (
            <span className=""> {formattedPrice(currentSize.price)} </span>
          )}
        </div>
        <Sizes
          setCurrentSize={setCurrentSize}
          currentSize={currentSize}
          variants={product?.variants}
          product_variants={product?.product_variants}
        />
        <Amount currentSize={currentSize} setCurrentSize={setCurrentSize} />

        {/* <Colors currentSize={currentSize} setCurrentSize={setCurrentSize} /> */}
        <div className="mt-6 flex flex-wrap gap-4">
          <Button
            className=" rounded-tl-3xl rounded-br-3xl transition-all duration-300 border hover:bg-white hover:text-black border-black "
            onClick={handleAddtoCart}
            disabled={currentSize.maxAmount === 0}
            size={"lg"}
          >
            Add to cart <ShoppingCart className="ml-2" size={20} />
          </Button>

          <Button
            className="group border-none hover:bg-transparent font-normal  rounded-tl-3xl rounded-br-3xl transition-all duration-300 border  border-black "
            onClick={handleAddtoFavourite}
            size={"lg"}
            variant={"outline"}
          >
            Add to Favourite <HeartIcon className="ml-2 *:group-hover:stroke-yellow-400" width={20} height={20} />
          </Button>
        </div>
        {/* read more */}
        <Separator className="mt-8 mb-4" />
        <div>
          <span className="opacity-50 font-light ">Category:</span>{" "}
          <span className="font-normal">{product?.category?.name}</span>
        </div>
        {isShowChinhSach && <ChinhSach />}
      </div>
    </div>
  );
}

export default ProductInfor;
