"use client";

import { ProductResType } from "@/Type/ProductType";
import { Separator } from "@/components/ui/separator";
import ListProductCard from "@/components/list-product-card";
import { ShoesVideo, DressVideo, VestVideo } from "../../../../../../public/videos";
import ProductInfor from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/productInfor";
import { useEffect, useState } from "react";
import BreadCrum from "@/components/breadcrum";

interface ProductIdClientProps {
  data: ProductResType["data"];
}

function ProductIdClient({ data }: ProductIdClientProps) {
  const product = data?.product;
  const productRelative = data?.productsRelative;
  const video =
    product?.category?.name === "Shoes" ? (
      <ShoesVideo />
    ) : product?.category?.name === "Dress" ? (
      <DressVideo />
    ) : (
      <VestVideo />
    );

  const [gridCols, setGridCols] = useState(5);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setGridCols(4);
      } else {
        setGridCols(2);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="mt-24 px-2 lg:px-[100px]">
      <BreadCrum
        listBread={[
          {
            href: "/",
            name: "Home",
          },
          {
            href: "",
            name: "Product",
          },
          {
            href: "",
            name: product?.name,
          },
        ]}
      />
      <div>
        <ProductInfor product={product} />
        <Separator className="my-10" />
        <div>
          <h2 className="text-xl font-bold my-4">YOU MIGHT ALSO LIKE</h2>
          <ListProductCard gridCols={gridCols} listProduct={productRelative} />
        </div>
        <div>
          <h2
            className="relative text-xl font-bold mt-16 mb-10 pb-4 border-b-2 before:content-['']
        before:w-[190px] before:h-[2px] before:absolute before:bg-black before:top-full before:left-0 "
          >
            Product Details
          </h2>
          {video}
        </div>
      </div>
    </div>
  );
}

export default ProductIdClient;
