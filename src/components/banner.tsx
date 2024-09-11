"use client";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeftIcon } from "../../public/icons";

interface BannerProps {
  billboardBST: string | undefined;
}

function Banner({ billboardBST }: BannerProps) {
  const [isShowBanner, setIsShowBanner] = useState(false);
  return (
    <div
      onClick={() => setIsShowBanner(!isShowBanner)}
      className=" hidden lg:block z-10 fixed right-0 top-[12.5%] py-[1px]  select-none "
    >
      <div
        className={`flex bg-black ${
          !isShowBanner && "origin-bottom-right -rotate-90"
        }   cursor-pointer pl-4 text-white text-[22px] tracking-widest font-bold`}
      >
        <div className="">CHÀO MỪNG BST </div>
        <ArrowLeftIcon />
      </div>
      {isShowBanner && (
        <div>
          <Image
            alt=""
            src={billboardBST || ""}
            width={800}
            height={800}
            className="w-[614px]  h-[300px]  object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default Banner;
