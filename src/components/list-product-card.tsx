"use client";

import { HeartFullIcon } from "../../public/icons";
import ProductCard from "@/components/product-card";
import { useFavourite } from "@/hooks/useFavourite";
import { ListProductResType, ProductType } from "@/Type/ProductType";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

function ListProductCard({
  listProduct,
  gridCols,
  scroll = false,
  isLoading = false,
}: {
  listProduct: ListProductResType["data"]["listProduct"] | undefined;
  gridCols: number;
  scroll?: boolean;
  isLoading?: boolean;
}) {
  const { removeItemFavourite } = useFavourite();
  const handleDeleteFavourite = (item: ProductType) => {
    removeItemFavourite(item);
  };
  return (
    <>
      {!scroll && (
        <div
          className={`flex-1 items-start relative  grid  gap-2 lg:gap-4 pb-10 `}
          style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
        >
          {listProduct?.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
          {isLoading && <div className=" absolute inset-0  bg-white/70"></div>}
        </div>
      )}
      {/* overflow scroll */}
      {scroll && (
        <div
          className={`flex-1 items-start flex overflow-auto gap-2 lg:gap-4 pb-10 !scrollbar-track-gray-950 customScrollbar `}
        >
          {listProduct?.map((product: ProductType) => {
            return (
              <div key={product._id} className="min-w-[50%] lg:min-w-[25%] w-1/4 relative">
                <ProductCard product={product} />

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      className="absolute right-4 top-4 rounded-full bg-white p-1"
                      onClick={() => handleDeleteFavourite(product)}
                    >
                      <HeartFullIcon className=" w-[18px] lg:w-[26px] h-[18px] lg:h-[26px]" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-black bg-opacity-70 text-white">
                      <p>Delete favourite</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default ListProductCard;
