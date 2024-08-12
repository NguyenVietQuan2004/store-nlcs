"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

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
  image: "https://res.cloudinary.com/dvyi5jxrm/image/upload/v1722955311/znhcf1ay9hzu93wdhxws.png",
  label: "Fake billboard",
  storeId: "fake",
  updatedAt: "fake",
};
function ListRoute({ listCategory }: ListRouteProps) {
  const router = useRouter();
  const { items } = useCart();
  const pathName = usePathname();

  const currentCategory = listCategory?.find((category) => `/${category._id}` === pathName);
  return (
    <>
      <div className="p-4 flex border-b items-center justify-between">
        <div className="font-bold text-2xl">
          Next<span className="font-bold text-2xl text-purple-400">Commerce</span>{" "}
        </div>
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
        <div
          onClick={() => router.push("/cart")}
          className=" flex px-3 py-1 items-center bg-black rounded-full cursor-pointer text-white"
        >
          <ShoppingBag className="w-4 h-4 mr-1 text-white" /> {items.length > 9 ? "+9" : items.length}
        </div>
      </div>
      <Billboard billboard={currentCategory?.billboardId || fakeBillboard} />
      {pathName === "/" &&
        listCategory?.map((category: CategoryType) => {
          const active = pathName.startsWith(`/${category._id}`);
          return (
            <Link scroll={false} className="border p-3 font-medium " href={`/${category._id}`} key={category._id}>
              {category.name}
            </Link>
          );
        })}
    </>
  );
}

export default ListRoute;
