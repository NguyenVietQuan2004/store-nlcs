import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { BillboardType } from "@/Type/BillboardTypes";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

// function Billboard({ billboard }: { billboard: BillboardType | undefined | BillboardType[] }) {
function Billboard({ listBillboard }: { listBillboard: null | BillboardType[] }) {
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
                      <div className="relative z-30 mb-10 flex   ">
                        <div className="w-[60%]">
                          {billboard && (
                            <Image
                              alt=""
                              priority
                              src={billboard.image}
                              width={1000}
                              height={300}
                              className="w-full z-20 max-h-[400px]  object-cover  select-none rounded-tl-[100px] rounded-br-[100px]"
                            />
                          )}
                          <div className="absolute inset-0 h-full top-[5%] rounded-br-[100px] z-0 -right-[3%] border border-l-transparent border-t-transparent"></div>
                        </div>
                        <div className="w-[40%] flex justify-center flex-col items-center mt-20 mb-10 select-none">
                          <div className="font-bold  text-center text-[30px] leading-[40px]">{billboard.label} </div>
                          {true && <Button className="mt-6 rounded-full">Shop</Button>}
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
