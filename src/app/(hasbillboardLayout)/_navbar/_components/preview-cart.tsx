"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";

import { useCart } from "@/hooks/useCart";
import { formattedPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { productOrderType } from "@/Type/OrderTypes";
import { Separator } from "@/components/ui/separator";
import { CloseIconMobile } from "../../../../../public/icons";

function PreviewCard() {
  const { items, removeItem } = useCart();
  const handleDeleteCart = (item: productOrderType) => {
    removeItem(item);
  };

  let totalPrice: number = 0;
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [isShowCartView, setIsShowCartView] = useState(false);

  const handleOnclickOverlay = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsShowCartView(false);
    }
  };

  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];

    html.style.overflow = isShowCartView ? "hidden" : "";

    return (): void => {
      html.style.overflow = "";
    };
  }, [isShowCartView]);
  return (
    <>
      <Button
        onClick={() => setIsShowCartView(true)}
        size={"sm"}
        className=" flex  group  !p-0 !px-2 lg:w-[54px] h-[34px] items-center bg-transparent text-black lg:bg-black rounded-full cursor-pointer lg:text-white"
      >
        <ShoppingBag className="w-5 h-5 group-hover:text-white lg:mr-1 text-black  lg:text-white" />{" "}
        <span className="hidden lg:block">{items.length > 9 ? "+9" : items.length}</span>
      </Button>

      {isShowCartView && (
        <div
          onClick={(e) => handleOnclickOverlay(e)}
          className="fixed h-[calc(100vh-50px)] sm:h-[100vh]  overflow-hidden top-0 right-0 left-0       z-50 bg-white/75"
        >
          <div
            ref={ref}
            className=" max-w-full lg:animate-cart-view shadow-[-0px_0_6px_0_grey] z-50  w-[460px] absolute flex flex-col p-2 lg:p-5 lg:pt-1  lg:pr-0  top-0 right-0 bottom-0  bg-white"
          >
            <div className="flex justify-between items-center ">
              <div className="font-bold text-[18px] flex gap-x-4 items-center">
                <div className="">Shopping cart</div>
                <div className="bg-[#707072] w-[2px] h-[20px]"></div>
                <div className="mb-[2px] font-medium text-[#707072] text-sm">
                  {items.length} item{items.length > 1 && "s"}
                </div>
              </div>
              <button onClick={() => setIsShowCartView(false)} className="p-5 pr-2">
                <CloseIconMobile />
              </button>
            </div>
            <div className="flex flex-col flex-1  lg:h-[490px]   overflow-auto pt-4 pb-6 ">
              {items.map((item, index) => {
                const objectPrice = item.product.product_variants.find(
                  (objectPrice) => objectPrice._id === item.product_variant_id
                );
                totalPrice +=
                  (objectPrice?.price || 0) *
                  item.quantity *
                  (item.product.sales ? (100 - item.product.sales) / 100 : 1);

                return (
                  <Fragment key={item.product._id + item.product_variant_id}>
                    {index !== 0 && <Separator />}
                    <div className="py-3 flex">
                      <Image
                        alt=""
                        src={item.product.images[0]}
                        width={600}
                        height={600}
                        className="object-cover w-[80px]  aspect-square rounded-sm"
                      />
                      <div className=" px-3 flex-1 ">
                        <div className="flex justify-between">
                          <div className="  max-w-[250px] break-words line-clamp-2 leading-[20px] overflow-hidden    font-medium text-[#111111] ">
                            {item.product.name}
                          </div>
                          <div className="font-medium">
                            {formattedPrice(
                              (objectPrice?.price || 0) *
                                item.quantity *
                                (item.product.sales ? (100 - item.product.sales) / 100 : 1)
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between mt-auto">
                          <div className="text-[#707072] text-sm font-medium">QTY: {item.quantity}</div>
                          <button onClick={() => handleDeleteCart(item)} className="text-sm font-medium">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
            <div>
              <Separator />
              <div className="p-2 lg:p-5 pb-5">
                <div className="font-semibold flex justify-between">
                  <span>Subtotal:</span> <span> {formattedPrice(totalPrice)}</span>
                </div>
                <div className="text-sm font-medium ">Shipping and taxes are calculated at checkout</div>
                <Button
                  onClick={() => {
                    router.push("/cart");
                    setIsShowCartView(false);
                  }}
                  size={"sm"}
                  className="w-full mt-4"
                  variant={"outline"}
                >
                  View cart page
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PreviewCard;
