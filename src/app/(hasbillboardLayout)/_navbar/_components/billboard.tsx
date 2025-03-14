import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { BillboardType } from "@/Type/BillboardTypes";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { CategoryType } from "@/Type/CategoryTypes";
import { cn } from "@/lib/utils";

// function Billboard({ billboard }: { billboard: BillboardType | undefined | BillboardType[] }) {
function Billboard({
  listBillboard,
  category,
}: {
  listBillboard: null | BillboardType[];
  category: CategoryType | undefined;
}) {
  // billboard có thể là 1 mảng hoặc 1 ảnhh
  if (Array.isArray(listBillboard)) {
    return (
      <div className="relative  px-2 sm:px-5 xl:px-20 mt-4">
        <div className="">
          <div className="">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 6000,
                }),
              ]}
            >
              <CarouselContent className="-ml-10 ">
                {listBillboard.map((billboard) => {
                  return (
                    <CarouselItem key={billboard._id} className="pl-10  ">
                      <div className="relative z-30 mb-10 flex gap-3 flex-col lg:flex-row  ">
                        <div className="w-full lg:w-[60%]">
                          {billboard && (
                            <Image
                              alt=""
                              priority
                              src={billboard.image}
                              width={1000}
                              height={300}
                              className="w-full z-20 max-h-[300px]  object-cover  select-none rounded-tl-[100px] rounded-br-[100px]"
                            />
                          )}
                          <div className="absolute inset-0 h-full top-[5%] rounded-br-[100px] z-0 -right-[3%] border border-l-transparent border-t-transparent"></div>
                        </div>
                        <div className="w-full lg:w-[40%] flex justify-center flex-col items-center mt-4 lg:mt-20 mb-4 lg:mb-10 select-none">
                          <div className="font-bold  text-center text-[20px] line-clamp-3 lg:text-[24px] leading-[30px]">
                            {billboard.label}{" "}
                          </div>
                          {true && (
                            <Link
                              href={`/${category?._id}`}
                              className={cn(buttonVariants({ variant: "default", size: "lg" }), "mt-6 rounded-full")}
                            >
                              Shop
                            </Link>
                          )}
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    );
  }

  // return (
  //   <div className="relative mb-10   ">
  //     {billboard && (
  //       <Image
  //         alt=""
  //         src={billboard.image}
  //         width={1300}
  //         height={500}
  //         className="w-full  z-10 object-cover  select-none rounded-tl-[100px] rounded-br-[100px]"
  //       />
  //     )}
  //     <div className="absolute inset-0 h-full top-[5%] rounded-br-[100px] z-0 -right-[3%] border border-l-transparent border-t-transparent"></div>
  //   </div>
  // );
}

export default Billboard;
