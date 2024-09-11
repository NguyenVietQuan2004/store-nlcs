import Image from "next/image";
import { ListProductResType } from "@/Type/ProductType";

interface Card3Props {
  listProduct: ListProductResType["data"]["listProduct"] | undefined;
}
function Card3({ listProduct }: Card3Props) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-end ">
        <h3 className="text-2xl font-semibold ">Top deals</h3>
      </div>
      <div className="p-5 bg-white rounded-2xl flex items-center gap-3 my-2 lg:my-6">
        <div className=" w-[132px] h-[132px] flex items-center">
          <Image
            alt=""
            src={listProduct?.[7].images[0] || ""}
            width={1000}
            height={1000}
            className="rounded-xl w-full aspect-square  object-cover select-none"
          />
        </div>
        <div>
          <h4 className="text-xl text-[#222222] font-medium">180-day lowest price</h4>
        </div>
      </div>
      <div className="p-5 bg-white rounded-2xl mt-auto">
        <h4 className="text-xl font-medium mb-4">Deals on best sellers</h4>
        <div className="relative ">
          <Image
            alt=""
            src={listProduct?.[12].images[0] || ""}
            width={500}
            height={500}
            className="rounded-xl w-full aspect-square object-cover select-none"
          />
          <div className="text-sm absolute rounded-lg bg-white px-2 py-1 top-4 left-4">
            {listProduct?.[12].arrayPrice[0].price! % 100}% OFF
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card3;
