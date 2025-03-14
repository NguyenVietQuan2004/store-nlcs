"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import { CategoryType, ListCategoryResType } from "@/Type/CategoryTypes";
import { CloseIconMobile, HeartIcon, MenuIcon } from "../../../../../public/icons";
import UserAvatar from "@/components/user-avatar";

interface MenuMobileProps {
  pathName: string;
  listCategory: ListCategoryResType["data"] | null;
}
function MenuMobile({ listCategory, pathName }: MenuMobileProps) {
  const [isShowModalMenu, setIsShowModalMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsShowModalMenu(false);
    }
  };

  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    html.style.overflow = isShowModalMenu ? "hidden" : "";

    return (): void => {
      html.style.overflow = "";
    };
  }, [isShowModalMenu]);
  return (
    <>
      <Button
        className={buttonVariants({
          className:
            " flex lg:hidden  items-center w-9 h-9   !p-0 justify-center !rounded-full cursor-pointer bg-transparent hover:!bg-[#e5e5e5]",
        })}
        onClick={() => setIsShowModalMenu(true)}
      >
        <MenuIcon />
      </Button>
      {isShowModalMenu && (
        <div onClick={handleClick} className="fixed top-0 right-0 left-0 h-[calc(100vh-50px)] sm:h-[100vh] bg-black/35">
          <div ref={ref} className=" absolute p-6 pt-0 top-0 bottom-0 right-0 sm:max-w-[50%] w-[300px] bg-white">
            <div className="flex justify-between items-center">
              <UserAvatar />
              <div className="text-xl font-semibold">Category</div>
              <button onClick={() => setIsShowModalMenu(false)} className="p-5 pr-0">
                <CloseIconMobile />
              </button>
            </div>
            <div className="flex flex-col mt-4 max-h-[70vh] overflow-auto">
              {listCategory?.map((category: CategoryType) => {
                const active = pathName.startsWith(`/${category._id}`);
                return (
                  <Link
                    onClick={() => setIsShowModalMenu(false)}
                    className={`${
                      active ? "text-black" : " text-neutral-500"
                    } p-3 text-xl  hover:text-black font-medium`}
                    href={`/${category._id}`}
                    key={category._id}
                  >
                    {category.name}
                  </Link>
                );
              })}{" "}
            </div>
            <Separator />
            <div className="mt-4">
              <Link
                onClick={() => setIsShowModalMenu(false)}
                href="/favourite"
                className={buttonVariants({
                  className: "flex gap-2 !p-3 border-none text-[18px] pl-0 ",
                  variant: "outline",
                })}
              >
                <HeartIcon width={24} height={24} />
                Favourite
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MenuMobile;
