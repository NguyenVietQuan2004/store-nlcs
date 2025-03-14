"use client";
import Image from "next/image";
import { ListProductResType, ProductType } from "@/Type/ProductType";
import ProductCard from "@/components/product-card";
import ListProductCard from "@/components/list-product-card";
import { useEffect, useState } from "react";

interface Card3Props {
  productBestSeller: ListProductResType["data"]["listProduct"] | undefined;
  productHighestSales: ListProductResType["data"]["listProduct"] | undefined;
}
function Card3({ productBestSeller, productHighestSales }: Card3Props) {
  const [numbProductShow, setNumbProductShow] = useState(3);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setNumbProductShow(3);
      } else {
        setNumbProductShow(2);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center ">
        <h3 className="text-2xl font-semibold mb-10 text-center">Top deals</h3>
      </div>
      {/* <div className="p-5 bg-white rounded-2xl flex items-center gap-3 my-2 lg:my-6">
        <div className=" w-[132px] h-[132px] flex items-center">
          <Image
            alt=""
            src={productHighestSales?.images[0] || ""}
            width={1000}
            height={1000}
            className="rounded-xl w-full aspect-square  object-cover select-none"
          />
        </div>
        <div>
          <h4 className="text-lg text-[#707072]  font-medium">
            180-day
            <span className="text-[#222222] text-xl mx-1">Highest</span>
            Sales
          </h4>
        </div>
      </div> */}

      <div className=" flex flex-col lg:grid grid-cols-2 gap-y-6 lg:mt-12 lg:gap-x-2">
        <div className="p-5 bg-white rounded-2xl mt-auto">
          <h4 className="text-xl font-medium mb-4 text-center">Deals on best sellers</h4>
          {/* <div className="relative ">
          <Image
            alt=""
            src={productBestSeller?.images[0] || ""}
            width={500}
            height={500}
            className="rounded-xl w-full aspect-square object-cover select-none"
          />
          <div className="text-sm absolute rounded-lg bg-white px-2 py-1 top-4 left-4">
            {productBestSeller?.sales}% OFF
          </div>
        </div> */}
          {productBestSeller && (
            <ListProductCard gridCols={numbProductShow} listProduct={productBestSeller} scroll={false} />
          )}
        </div>

        <div className="p-5 bg-white rounded-2xl mt-auto">
          <h4 className="text-xl font-medium mb-4 text-center">Product Highest Sales</h4>
          {/* <div className="relative ">
          <Image
            alt=""
            src={productBestSeller?.images[0] || ""}
            width={500}
            height={500}
            className="rounded-xl w-full aspect-square object-cover select-none"
          />
          <div className="text-sm absolute rounded-lg bg-white px-2 py-1 top-4 left-4">
            {productBestSeller?.sales}% OFF
          </div>
        </div> */}
          {productHighestSales && (
            <ListProductCard
              title="sales"
              gridCols={numbProductShow}
              listProduct={productHighestSales}
              scroll={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Card3;
