import Image from "next/image";
import { ListProductResType } from "@/Type/ProductType";

interface Card2Props {
  listProduct: ListProductResType["data"]["listProduct"] | undefined;
}
function Card2({ listProduct }: Card2Props) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center ">
        <h3 className="text-2xl font-semibold">New arrivals</h3>
      </div>
      <div className="p-5 bg-white rounded-2xl my-2 lg:my-6">
        <h4 className="text-xl font-medium mb-4">{listProduct?.length}+ products added today</h4>
        <div className="grid grid-cols-2 gap-4">
          {listProduct?.slice(14, 18).map((product) => (
            <div key={product._id}>
              <Image
                alt=""
                src={product.images[0]}
                width={1000}
                height={1000}
                className="rounded-xl aspect-square object-cover select-none"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="p-5 bg-white rounded-2xl flex items-center gap-3 mt-auto">
        <div className=" w-[132px] h-[132px] flex items-center">
          <Image
            alt=""
            src={listProduct?.[5].images[0] || ""}
            width={500}
            height={500}
            className="rounded-xl w-full aspect-square  object-cover select-none"
          />
        </div>
        <div>
          <h4 className="text-xl text-[#222222] font-medium">New this week</h4>
          <div className="text-sm text-[#767676]">Products from Verified Suppliers only</div>
        </div>
      </div>
    </div>
  );
}

export default Card2;
