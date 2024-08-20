"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";

import { useCart } from "@/hooks/useCart";
import { BillboardType } from "@/Type/BillboardTypes";
import { CategoryType, ListCategoryResType } from "@/Type/CategoryTypes";
import Billboard from "@/app/(hasbillboardLayout)/_navbar/_components/billboard";

interface ListRouteProps {
  listCategory: ListCategoryResType["data"] | null;
}
const fakeBillboard: BillboardType = {
  _id: "fake",
  createdAt: "fake",
  image: "https://res.cloudinary.com/dvyi5jxrm/image/upload/v1723868006/h9azpwsmqcnuxrhq9zuc.webp",
  label: "Fake billboard",
  storeId: "fake",
  updatedAt: "fake",
};
function ListRoute({ listCategory }: ListRouteProps) {
  const { items } = useCart();
  const pathName = usePathname();
  const currentCategory = listCategory?.find((category) => `/${category._id}` === pathName);
  return (
    <>
      <div className="max-w-[1024px] mx-auto p-4 flex border-b items-center justify-between fixed inset-x-0 top-0 bg-white/75 backdrop-blur-lg z-10">
        <Link href="/" className="font-bold text-2xl">
          Next<span className="font-bold text-2xl text-purple-400">Commerce</span>{" "}
        </Link>
        <div>
          <Link
            href="/"
            className={`${
              pathName === "/" ? "text-black" : " text-neutral-500"
            }  hover:text-black ml-4 text-sm font-medium `}
          >
            Home
          </Link>
          {listCategory?.map((category: CategoryType) => {
            const active = pathName.startsWith(`/${category._id}`);
            return (
              <Link
                scroll={false}
                className={`${active ? "text-black" : " text-neutral-500"}  hover:text-black ml-4 text-sm  font-medium`}
                href={`/${category._id}`}
                key={category._id}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
        <Link href="/cart" className=" flex px-3 py-1 items-center bg-black rounded-full cursor-pointer text-white">
          <ShoppingBag className="w-4 h-4 mr-1 text-white" /> {items.length > 9 ? "+9" : items.length}
        </Link>
      </div>
      {pathName === `/${currentCategory?._id}` && (
        <Billboard billboard={currentCategory?.billboardId || fakeBillboard} />
      )}
      {pathName === "/" && (
        <>
          <Billboard billboard={currentCategory?.billboardId || fakeBillboard} />
          {/* {listCategory?.map((category: CategoryType) => {
            return (
              <Link
                scroll={false}
                className="border px-3 py-2 font-medium "
                href={`/${category._id}`}
                key={category._id}
              >
                {category.name}
              </Link>
            );
          })} */}
        </>
      )}
    </>
  );
}

export default ListRoute;
