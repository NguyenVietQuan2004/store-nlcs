"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { HeartIcon } from "../../../../../public/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { CategoryType, ListCategoryResType } from "@/Type/CategoryTypes";
import Billboard from "@/app/(hasbillboardLayout)/_navbar/_components/billboard";
import MenuMobile from "@/app/(hasbillboardLayout)/_navbar/_components/menu-mobile";
import BannerSales from "@/app/(hasbillboardLayout)/_navbar/_components/banner-sales";
import SearchInput from "@/app/(hasbillboardLayout)/_navbar/_components/search-input";
import PreviewCard from "@/app/(hasbillboardLayout)/_navbar/_components/preview-cart";
import { ListBillboardResType } from "@/Type/BillboardTypes";
import UserAvatar from "@/components/user-avatar";

interface ListRouteProps {
  listCategory: ListCategoryResType["data"] | null;
  listBillboard: ListBillboardResType["data"] | null;
  store: any | null;
}
function ListRoute({ store, listCategory, listBillboard }: ListRouteProps) {
  const pathName = usePathname();
  const currentCategory = listCategory?.find((category) => `/${category._id}` === pathName);
  // const listBillboard = listCategory?.map((category) => category.billboardId);

  // Label Billboard truyền vào sẽ gồm 3 câu phân cách bởi dấu .
  // const labelSplit = currentCategory?.billboardId.label.split(".") || listCategory?.[0]?.billboardId.label.split(".");
  const labelSplit = "this is bill board will apear in";
  return (
    <>
      <div className=" px-5 lg:px-10 py-3  border-b   fixed inset-x-0 top-0 bg-white/75 backdrop-blur-lg z-20">
        <div className="mx-auto items-center justify-between flex">
          <Link href="/" className="font-bold text-2xl flex items-center gap-x-2">
            <Image
              alt=""
              width={200}
              height={200}
              className="w-8"
              src={"https://res.cloudinary.com/dvyi5jxrm/image/upload/v1725116961/t2vvfvzknla0aw6oiagn.png"}
            />
            {store?.name || "name store"}
          </Link>
          <div className="hidden lg:block">
            <Link
              href="/"
              className={`${
                pathName === "/" ? "text-black" : " text-neutral-500"
              }  hover:text-black ml-4 text-sm font-medium `}
            >
              Dashboard ✨
            </Link>
            {listCategory?.map((category: CategoryType) => {
              const active = pathName.startsWith(`/${category._id}`);
              return (
                <Link
                  className={`${
                    active ? "text-black" : " text-neutral-500"
                  }  hover:text-black ml-4 text-sm  font-medium`}
                  href={`/${category._id}`}
                  key={category._id}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
          <div className=" items-center gap-x-1 hidden lg:flex">
            <SearchInput />
            <Link
              href="/favourite"
              className={buttonVariants({
                className:
                  " flex  items-center w-9 lg:w-10 aspect-square    !p-0 justify-center !rounded-full cursor-pointer bg-transparent hover:!bg-[#e5e5e5]",
              })}
            >
              <HeartIcon className="w-10" width={24} height={24} />
            </Link>

            <PreviewCard />
            <div className="px-2 lg:ml-auto">
              <UserAvatar />
            </div>
          </div>
          {/* mobile */}

          <div className="flex  items-center gap-x-1 lg:hidden">
            <SearchInput />
            <Link
              href="/favourite"
              className={buttonVariants({
                className:
                  " hidden lg:flex   items-center w-9 h-9 lg:w-10 aspect-square    !p-0 justify-center !rounded-full cursor-pointer bg-transparent hover:!bg-[#e5e5e5]",
              })}
            >
              <HeartIcon className="w-10" width={24} height={24} />
            </Link>

            <PreviewCard />
            <MenuMobile pathName={pathName} listCategory={listCategory} />
          </div>
        </div>
      </div>
      {/* {( === `/${currentCategory?._id}` || pathName === "/") && ( */}
      {pathName === "/" && (
        <>
          <BannerSales pathName={pathName} />
          {/* <Billboard billboard={currentCategory?.billboardId || listBillboard} /> */}
          <Billboard listBillboard={listBillboard} category={listCategory?.[0]} />
          {/* <div className="flex justify-center flex-col items-center mt-20 mb-10 select-none">
            <div className="font-semibold text-lg">{labelSplit?.[0]}</div>
            <div className="font-bold text-[80px] leading-[90px]">{labelSplit?.[1]} </div>
            <div className="font-medium text-center max-w-[900px]">{labelSplit?.[2]}</div>
            {pathName === `/` && <Button className="mt-6 rounded-full">Shop</Button>}
          </div> */}
        </>
      )}

      {/* {pathName === "/" && (
        <>
          <Billboard billboard={currentCategory?.billboardId || listBillboard} />
          <div className="flex justify-center flex-col items-center mt-20 mb-10 select-none px-2 lg:px-[300px]">
            <div className="font-semibold text-lg">{labelSplit?.[0]}</div>
            <div className="font-bold text-[80px] text-center leading-[90px]">{labelSplit?.[1]} </div>
            <div className="font-medium text-center max-w-[900px]">{labelSplit?.[2]}</div>
            {pathName === `/` && <Button className="mt-6 rounded-full">Shop</Button>}
          </div>
        </>
      )} */}
    </>
  );
}

export default ListRoute;
