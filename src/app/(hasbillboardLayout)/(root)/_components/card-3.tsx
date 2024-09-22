import Image from "next/image";
import { ListProductResType, ProductType } from "@/Type/ProductType";

interface Card3Props {
  productBestSeller: ProductType | undefined;
  productHighestSale: ProductType | undefined;
}
function Card3({ productBestSeller, productHighestSale }: Card3Props) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-end ">
        <h3 className="text-2xl font-semibold ">Top deals</h3>
      </div>
      <div className="p-5 bg-white rounded-2xl flex items-center gap-3 my-2 lg:my-6">
        <div className=" w-[132px] h-[132px] flex items-center">
          <Image
            alt=""
            src={productHighestSale?.images[0] || ""}
            width={1000}
            height={1000}
            className="rounded-xl w-full aspect-square  object-cover select-none"
          />
        </div>
        <div>
          <h4 className="text-lg text-[#707072]  font-medium">
            180-day
            <span className="text-[#222222] text-xl mx-1">Highest</span>
            Sale
          </h4>
        </div>
      </div>
      <div className="p-5 bg-white rounded-2xl mt-auto">
        <h4 className="text-xl font-medium mb-4">Deals on best sellers</h4>
        <div className="relative ">
          <Image
            alt=""
            src={productBestSeller?.images[0] || ""}
            width={500}
            height={500}
            className="rounded-xl w-full aspect-square object-cover select-none"
          />
          <div className="text-sm absolute rounded-lg bg-white px-2 py-1 top-4 left-4">
            {productBestSeller?.sale}% OFF
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card3;
