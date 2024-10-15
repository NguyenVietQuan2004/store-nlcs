import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

import Banner from "@/components/banner";
import { Button } from "@/components/ui/button";
import { productAPI } from "@/apiRequest/productAPI";
import { handlError } from "@/components/handle-error";
import { ListProductResType } from "@/Type/ProductType";
import { ImagesHomePageResType } from "@/Type/ImagesHomePage";
import { ImagesHomePageAPI } from "@/apiRequest/imagesHomePageAPI";
import Discover from "@/app/(hasbillboardLayout)/(root)/_components/discover";
import Insurance from "@/app/(hasbillboardLayout)/(root)/_components/insurance";
import ProductFeature from "@/app/(hasbillboardLayout)/(root)/_components/products-feature";
import Chat from "./_components/chat";

const text = [
  {
    text1: "Member Product",
    text3: "Shop",
    text2: "Your Exclusive Access",
  },
  {
    text1: "Nike By You",
    text3: "Explore",
    text2: "Your Customisation Service",
  },
  {
    text1: "Member Rewards",
    text3: "Customise",
    text2: "How We Say Thank You",
  },
];
export default async function Home() {
  let response: ListProductResType | null = null;
  let data: ImagesHomePageResType | null = null;

  try {
    response = await productAPI.getListProduct({
      page: 1,
      limit: 100,
      sortBy: "feature",
    });
    data = await ImagesHomePageAPI.getImagesHomePageAndDiscover();
  } catch (error) {
    handlError({ consoleError: "GET_LIST_PRODUCT_OF_STORE_API_ERROR", error });
  }
  return (
    <div>
      <div className="flex lg:grid grid-cols-3 gap-x-2 mt-2 overflow-auto">
        {data?.data.ImagesHomePage.billboardFeature.map((value, index) => (
          <Link
            href={response?.data.listProduct?.[0].categoryId._id || ""}
            className="overflow-hidden relative min-w-[310px] "
            key={value}
          >
            <Image
              alt=""
              priority
              src={value}
              width={1000}
              height={1000}
              className="hover:scale-125 h-full select-none object-cover transition-all duration-9000"
            />
            <div className="absolute bottom-9 px-5 left-3 lg:left-9  py-4  bg-opacity-45 w-full">
              <div className="mb-1 text-white font-medium break-words">{text[index].text1}</div>
              <div className="mb-6 text-white font-bold text-2xl break-words">{text[index].text2}</div>

              <Button variant={"outline"} className="text-[#606060] min-w-20 rounded-none font-light">
                {text[index].text3}
              </Button>
            </div>
          </Link>
        ))}
      </div>
      <h2 className="text-3xl font-medium mt-16 mb-10 text-[#606060] px-2 lg:px-20">Featured Product</h2>
      {!response || !response?.data?.listProduct?.length ? (
        <div className="text-center my-4 px-20">No results found</div>
      ) : (
        <Suspense fallback={<div>loading...</div>}>
          <ProductFeature listProduct={response?.data.listProduct} />
        </Suspense>
      )}
      <Insurance backgroundInsurance={data?.data.ImagesHomePage.backgroundInsurance} />
      <Discover data={data} />
      <Banner billboardBST={data?.data.ImagesHomePage.billboardBST} />
      <Chat />
    </div>
  );
}
