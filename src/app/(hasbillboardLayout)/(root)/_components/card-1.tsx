"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { ListProductResType } from "@/Type/ProductType";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface Card1Props {
  listProduct: ListProductResType["data"]["listProduct"] | undefined;
}
function Card1({ listProduct }: Card1Props) {
  return (
    <div className="">
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold">Top ranking</h3>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent className="mt-6">
          {listProduct?.map((product) => (
            <CarouselItem key={product._id}>
              <div className="p-5 bg-white  rounded-2xl">
                <h4 className="text-xl font-medium mb-1">Most popular</h4>
                <div className="text-[#666]">Shoes</div>
                <div>
                  <div className="relative">
                    <Image
                      alt=""
                      src={product?.images[0]}
                      width={1000}
                      height={1000}
                      className="w-full aspect-square rounded-2xl mt-7 object-cover"
                    />
                    <div className="text-sm absolute rounded-lg bg-white px-2 py-1 top-4 left-4">
                      Popularity score: {Math.floor(((product.sales / 5) % 5) * 10) / 10}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    {product.images.slice(1, 4).map((val) => (
                      <div key={val} className={` rounded-sm p-1`}>
                        <Image
                          alt=""
                          src={val}
                          width={500}
                          height={500}
                          className="rounded-xl aspect-square object-cover select-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Card1;
