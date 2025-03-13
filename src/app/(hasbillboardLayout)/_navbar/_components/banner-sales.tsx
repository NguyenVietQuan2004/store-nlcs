import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const bannerSales = [
  {
    heading: "New Styles On Sales: Up To 40% Off",
    underline: "Shop All Our New Markdowns",
  },
  {
    heading: "Free Standard Delivery & 30-Day Free Returns",
    underline: "Join Now View Details",
  },
  {
    heading: "Move, Shop, Customise & Celebrate With Us",
    underline: "Join Us",
    subText: "No matter what you feel like doing today, It’s better as a Member.",
  },
];

function BannerSales({ pathName }: { pathName: string }) {
  return (
    <div className="bg-[#f7f7f7] mt-[66px] px-[2px] pb-1">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="max-w-[650px] mx-auto"
      >
        <CarouselContent>
          {bannerSales.map((item) => (
            <CarouselItem key={item.heading}>
              <div
                className={`flex items-center ${
                  pathName === "/" ? "flex-col" : "lg:flex-row"
                } flex-col   justify-center gap-x-6 min-h-[72px]`}
              >
                <div
                  className={` ${
                    pathName !== "/" ? "max-w-[270px]" : "max-w-[350px]"
                  } text-center text-[#222222] lg:font-medium `}
                >
                  {item.heading}
                </div>
                <div>
                  <div className="text-xs text-center font-medium">{item?.subText}</div>
                  <div className="text-center text-xs underline mt-[6px] lg:mt-0 font-semibold">{item.underline}</div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {pathName !== "/" && (
          <>
            <CarouselPrevious key="prev" className="hidden lg:block">
              <ChevronLeft className="text-[#9b9b9b]" />
            </CarouselPrevious>
            <CarouselNext key="next" className="hidden lg:block">
              <ChevronRight className="text-[#9b9b9b]" />
            </CarouselNext>
          </>
        )}
      </Carousel>
    </div>
  );
}

export default BannerSales;
