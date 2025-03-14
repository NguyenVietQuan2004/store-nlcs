import { ImagesHomePageResType } from "@/Type/ImagesHomePage";
import { ListProductResType } from "@/Type/ProductType";
import Card1 from "@/app/(hasbillboardLayout)/(root)/_components/card-1";
import Card2 from "@/app/(hasbillboardLayout)/(root)/_components/card-2";
import Card3 from "@/app/(hasbillboardLayout)/(root)/_components/card-3";

interface DiscoverProps {
  data: ImagesHomePageResType | null;
}

function Discover({ data }: DiscoverProps) {
  return (
    <div className="bg-[#f4f4f4] pt-10 lg:pt-[80px] px-2 lg:px-20 py-10 text-[#111111]">
      {/* <h2 className=" font-semibold text-[32px]">Discover your next business opportunity</h2> */}
      <div className="">
        {/* <Card1 listProduct={data?.data?.listProductMostPopular} /> */}
        {/* <Card2
          listProduct={
            (data?.data?.listProductNewDiscover.length || 0) > 0
              ? data?.data?.listProductNewDiscover
              : [data?.data?.productHighestSales!]
          }
        /> */}
        <Card3
          productBestSeller={data?.data?.productBestSeller}
          productHighestSales={data?.data?.productHighestSales}
        />
      </div>
    </div>
  );
}

export default Discover;
