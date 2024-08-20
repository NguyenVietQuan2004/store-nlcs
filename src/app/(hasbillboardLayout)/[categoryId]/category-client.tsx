"use client";

import { ListSizeResType } from "@/Type/SizeTypes";
import { ListColorResType } from "@/Type/ColorType";
import { ListProductResType } from "@/Type/ProductType";
import ListProductCard from "@/components/list-product-card";
import Filter from "@/app/(hasbillboardLayout)/[categoryId]/filter";
import { useParams, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { productAPI } from "@/apiRequest/productAPI";
import { buttonVariants } from "@/components/ui/button";
import { handlError } from "@/components/handle-error";
interface CategoryClientProps {
  sizes: ListSizeResType | null;
  colors: ListColorResType | null;
  listProductInit: ListProductResType | null;
  limitServer: number;
}

function CategoryClient({ listProductInit, sizes, colors, limitServer }: CategoryClientProps) {
  const [listProduct, setListProduct] = useState(listProductInit);
  const listSize = sizes?.data;
  const listColor = colors?.data;
  const searchParams = useSearchParams();
  const params = useParams();
  const limitClient = 12;
  const numberPageClientOfOnePageServer = Math.ceil(limitServer / limitClient);
  const [items, setItems] = useState<Array<any>>();
  const [currentPage, setCurrentPage] = useState({
    client: 1,
    server: 1,
  });
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updateSkip = () => {
    let skip = limitClient * (currentPage.client - 1);
    if (currentPage.client > numberPageClientOfOnePageServer) {
      if (currentPage.client % numberPageClientOfOnePageServer === 0) {
        skip = limitClient * (numberPageClientOfOnePageServer - 1);
      } else {
        skip = limitClient * ((currentPage.client % numberPageClientOfOnePageServer) - 1);
      }
    }
    return skip;
  };

  useEffect(() => {
    setListProduct(listProductInit);
  }, [listProductInit]);

  useEffect(() => {
    // xem đang ở phần thứ mấy của pageServer
    setCurrentPage((pre) => ({ ...pre, server: Math.ceil(currentPage.client / numberPageClientOfOnePageServer) }));

    const skip = updateSkip();
    if (currentPage.server === Math.ceil(currentPage.client / numberPageClientOfOnePageServer)) {
      const data = listProduct?.data.listProduct.slice(skip, skip + limitClient);
      setItems(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage.client, listProduct]);

  useEffect(() => {
    // tránh gọi api ở lần đầu mounted
    if (!isMounted) return;
    const fetchAPI = async () => {
      // gọi api lấy new nếu hết sản phẩm ở client
      try {
        const response = await productAPI.getListProduct({
          categoryId: params.categoryId as string,
          sizeId: searchParams.get("sizeId") || undefined,
          colorId: searchParams.get("colorId") || undefined,
          page: currentPage.server,
          limit: limitServer,
        });
        setListProduct(response);
      } catch (error) {
        handlError({ consoleError: "HANDLE_CHANGE_PAGE_ERROR", error });
      }
    };
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage.server]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    const page = selectedItem.selected + 1;
    setCurrentPage((pre) => ({ ...pre, client: page }));
    window.scrollTo({ top: 500, behavior: "smooth" });
  };
  return (
    <>
      <div className="grid grid-cols-4 gap-6 mb-20">
        <div className="col-span-1 flex flex-col gap-y-16">
          <Filter data={listSize} valueKey="sizeId" name="Sizes" />
          <Filter data={listColor} valueKey="colorId" name="Colors" />
        </div>
        {!listProduct || !listProduct?.data?.listProduct.length ? (
          <div className="text-center col-span-3 flex justify-center items-center"> No results found</div>
        ) : (
          <>
            <ListProductCard gridCols={4} listProduct={items} />
          </>
        )}
      </div>
      {listProduct?.data.listProduct.length !== 1 && (
        <ReactPaginate
          className=" ml-atuo justify-end flex gap-x-4 items-center mt-10 mb-20"
          pageLinkClassName={buttonVariants({ variant: "outline" })}
          nextClassName={buttonVariants({ variant: "outline" })}
          previousClassName={buttonVariants({ variant: "outline" })}
          activeLinkClassName="bg-black text-white"
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={Math.ceil((listProduct?.data.totalProduct || 0) / limitClient)}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      )}
    </>
  );
}

export default CategoryClient;
