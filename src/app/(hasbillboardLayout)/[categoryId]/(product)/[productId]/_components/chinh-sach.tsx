"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDownCircle, ChevronUpCircle } from "lucide-react";

function ChinhSach() {
  const [isReadFull, setIsReadFull] = useState(false);
  return (
    <div className=" mt-10">
      <div
        className="text-sm font-semibold  relative  mt-10 mb-10 pb-4 border-b-2 before:content-['']
        before:w-[120px] before:h-[2px] before:absolute before:bg-black before:top-full before:left-0 "
      >
        Return Policy
      </div>

      <div className={`text-sm font-light ${isReadFull ? "h-full" : "h-[73px]"} overflow-hidden `}>
        Shop hopes you will like the product you ordered. However, if you are not 100% satisfied, Shop offers a simple
        return process as follows:
        <br />
        <br /> 1- Please call the hotline at 0969.436.090 or send a message on our Shop Design Facebook page to request
        a return.
        <br /> 2- Shop will check, confirm, and assist you within 30 minutes.
        <br />
        <br />
        Requirements:
        <br /> 1. Returns must be made within 7 days from the date you received the item.
        <br /> 2. The returned item must be in its original packaging, with tags and barcode intact, and unused.
        <br /> 3. If the issue is due to a manufacturing defect, Shop will cover the shipping cost for the return.
        <br />{" "}
        <Link href="/chinh-sach/chinh-sach-doi-tra" className="underline text-blue-400">
          Learn more
        </Link>
      </div>
      <div className="w-full bg-zinc-300 h-[1px] mt-6 relative" onClick={() => setIsReadFull(!isReadFull)}>
        {isReadFull ? (
          <ChevronUpCircle className="z-10 stroke-zinc-400 bg-white stroke-[1px] cursor-pointer absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2" />
        ) : (
          <ChevronDownCircle className="z-10 stroke-zinc-400 bg-white stroke-[1px] cursor-pointer absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2" />
        )}
      </div>
    </div>
  );
}

export default ChinhSach;
