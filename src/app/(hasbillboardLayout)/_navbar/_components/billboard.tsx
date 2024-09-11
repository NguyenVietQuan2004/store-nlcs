import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { BillboardType } from "@/Type/BillboardTypes";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

function Billboard({ billboard }: { billboard: BillboardType | undefined | BillboardType[] }) {
  // billboard có thể là 1 mảng hoặc 1 ảnhh
  if (Array.isArray(billboard)) {
    return (
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
        <CarouselContent className="-ml-10">
          {billboard.map((billboard) => (
            <CarouselItem key={billboard._id} className="pl-10">
              <div className="relative z-30 mb-10   ">
                {billboard && (
                  <Image
                    alt=""
                    priority
                    src={billboard.image}
                    width={1300}
                    height={1500}
                    className="w-full z-20   object-cover  select-none rounded-tl-[100px] rounded-br-[100px]"
                  />
                )}
                <div className="absolute inset-0 h-full top-[5%] rounded-br-[100px] z-0 -right-[3%] border border-l-transparent border-t-transparent"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }

  return (
    <div className="relative mb-10   ">
      {billboard && (
        <Image
          alt=""
          src={billboard.image}
          width={1300}
          height={500}
          className="w-full  z-10 object-cover  select-none rounded-tl-[100px] rounded-br-[100px]"
        />
      )}
      <div className="absolute inset-0 h-full top-[5%] rounded-br-[100px] z-0 -right-[3%] border border-l-transparent border-t-transparent"></div>
    </div>
  );
}

export default Billboard;
