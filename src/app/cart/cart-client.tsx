"use client";

import Image from "next/image";
import { XIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { useCart } from "@/hooks/useCart";
import { formattedPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import IconButton from "@/components/icon-button";
import { Separator } from "@/components/ui/separator";
import { Suspense, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

function CartClientNotSuspen() {
  const { items, removeItem } = useCart();
  const searchParams = useSearchParams();
  const handleRemoveItem = (item: any) => {
    removeItem(item);
  };
  let totalPrice = 0;
  console.log(items);
  const handleCheckout = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ADMIN}/checkout`, {
      method: "POST",
      body: JSON.stringify(items),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    window.location = data.url;
  };
  useEffect(() => {
    if (searchParams.get("success")) {
      toast({
        title: "Check out success",
        variant: "success",
      });
    }
    if (searchParams.get("canceled")) {
      toast({
        title: "Something went wrong",
        variant: "destructiveCustom",
      });
    }
  }, [searchParams]);

  return (
    <div className="grid grid-cols-6 gap-10 mt-10">
      <div className="col-span-4 grid grid-cols-1 gap-4">
        {items.map((item) => {
          const objectPrice = item.product.arrayPrice.find((objectPrice: any) => objectPrice.size === item.size);
          totalPrice += objectPrice?.price || 0;
          return (
            <div key={JSON.stringify(item)} className="item grid grid-cols-5  gap-4">
              <div className="col-span-1">
                <Image
                  alt=""
                  width={600}
                  height={600}
                  className="object-cover w-[100px] aspect-square rounded-sm"
                  src={item.product.images[0]}
                />
              </div>
              <div className="font-semibold text-start col-span-2">
                <div>{item.product.name}</div>
                <div>{formattedPrice(objectPrice?.price || 0)}</div>
              </div>
              <div className="grid grid-cols-3 text-center  col-span-2">
                <div className="relative before:content-[''] before:absolute before:right-0 before:w-[1px] before:bg-gray-300 before:h-5 before:mt-1">
                  {item.color}
                </div>
                <div>{item.size}</div>
                <div>
                  <IconButton onClick={() => handleRemoveItem(item)}>
                    <XIcon size={14} />
                  </IconButton>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="col-span-2">
        <div className="bg-zinc-100 p-6 rounded-lg">
          <div>Order summary</div>
          <Separator className="my-4" />
          <div className="my-4 flex justify-between">
            <div>Order tool</div>
            <div className="font-semibold">{formattedPrice(totalPrice)}</div>
          </div>
          <Button onClick={handleCheckout} className="w-full rounded-full">
            Check out
          </Button>
        </div>
      </div>
    </div>
  );
}

function CartClient() {
  return (
    <Suspense fallback={<div>loading.....</div>}>
      <CartClientNotSuspen />
    </Suspense>
  );
}

export default CartClient;
