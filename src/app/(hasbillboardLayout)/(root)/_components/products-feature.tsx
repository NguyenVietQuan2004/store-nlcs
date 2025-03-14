"use client";
import ListProductCard from "@/components/list-product-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { createUniqueArray } from "@/lib/utils";
import { ListProductResType } from "@/Type/ProductType";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductFeatureProps {
  listProduct: ListProductResType["data"]["listProduct"];
  title?: string;
  scroll?: boolean;
}

function ProductFeature({ listProduct, title, scroll }: ProductFeatureProps) {
  const [numbProductShow, setNumbProductShow] = useState(10);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setNumbProductShow(10);
      } else {
        setNumbProductShow(6);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="px-2 sm:px-5 xl:px-20 "
    >
      <CarouselContent>
        {createUniqueArray(Math.ceil(listProduct.length / numbProductShow)).map((val: any, index) => {
          const listSlice = listProduct.slice(index * numbProductShow, (index + 1) * numbProductShow);
          return (
            <CarouselItem key={val}>
              <ListProductCard
                scroll={scroll}
                title={title}
                gridCols={numbProductShow === 10 ? 5 : 2}
                listProduct={listSlice}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="left-4 lg:left-10  -translate-y-[100%]">
        <ChevronLeft className="text-[#9b9b9b] w-10 h-10 " />
      </CarouselPrevious>
      <CarouselNext className="right-4 lg:right-10  -translate-y-[100%]">
        <ChevronRight className="w-10 h-10 text-[#9b9b9b]" />
      </CarouselNext>
    </Carousel>
  );
}

export default ProductFeature;
