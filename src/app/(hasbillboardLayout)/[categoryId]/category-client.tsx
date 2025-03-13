"use client";

import ReactPaginate from "react-paginate";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { SizeType } from "@/Type/SizeTypes";
import { ColorType } from "@/Type/ColorType";
import BreadCrum from "@/components/breadcrum";
import { Combobox } from "@/components/combobox";
import { productAPI } from "@/apiRequest/productAPI";
import { FilterIcon } from "../../../../public/icons";
import { handlError } from "@/components/handle-error";
import { ListProductResType } from "@/Type/ProductType";
import { buttonVariants } from "@/components/ui/button";
import ListProductCard from "@/components/list-product-card";
import Filter from "@/app/(hasbillboardLayout)/[categoryId]/filter";
import FilterMobile from "@/app/(hasbillboardLayout)/[categoryId]/(product)/filter-mobile";

interface CategoryClientProps {
  limitServer: number;
  listProductInit: ListProductResType | null;
  value?: string;
}
// phân trang servẻ và client tự code cực hay

function CategoryClient({ listProductInit, limitServer, value }: CategoryClientProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(true);
  const [listProduct, setListProduct] = useState(listProductInit);
  const typeFilter = Object.assign(
    {},
    ...(listProductInit?.data?.listProduct[0]?.category?.attributes.map((attr) => ({
      [attr.name]: undefined,
    })) ?? [])
  );
  const [filter, setFilter] = useState({
    ...typeFilter,
    sortBy: "",
  });

  const params = useParams();
  // cái này chỉ sử dụng cho search-réult
  useEffect(() => {
    setListProduct(listProductInit);
    setCurrentPage({ server: 1, client: 1 });
  }, [listProductInit]);
  //  manage page
  const limitClient = 12;
  const numberPageClientOfOnePageServer = Math.ceil(limitServer / limitClient);
  const [items, setItems] = useState<Array<any>>();
  const [currentPage, setCurrentPage] = useState({
    client: 1,
    server: 1,
  });
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

  const [numColsGrid, setNumColsGrid] = useState(3);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setNumColsGrid(3);
      } else {
        setNumColsGrid(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // xem đang ở phần thứ mấy của pageServer
    setCurrentPage((pre) => ({ ...pre, server: Math.ceil(currentPage.client / numberPageClientOfOnePageServer) }));

    const skip = updateSkip();
    if (currentPage.server === Math.ceil(currentPage.client / numberPageClientOfOnePageServer)) {
      const data = listProduct?.data?.listProduct?.slice(skip, skip + limitClient);
      setItems(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage.client, listProduct]);
  useEffect(() => {
    // tránh gọi api ở lần đầu mounted
    if (!isMounted) return;
    const fetchAPI = async () => {
      // gọi api lấy sản phẩm khi chuyển sang page server mới hoặc filter sản phẩm
      try {
        const { sortBy, ...filterVariants } = filter;
        const variants = Object.keys(filterVariants)
          .filter((key) => filterVariants[key]) // Loại bỏ key có giá trị falsy (null, undefined, "", 0)
          .map((key) => ({
            key: key,
            values: [filterVariants[key]],
          }));

        setIsLoading(true);
        const response = await productAPI.getListProduct({
          category_id: params.categoryId as string,
          page: currentPage.server,
          limit: limitServer,
          sortBy: filter.sortBy || undefined,
          value,
          variants: JSON.stringify(variants) as any,
        });
        setListProduct(response);
        setCurrentPage({ server: 1, client: 1 });
      } catch (error) {
        handlError({ consoleError: "HANDLE_CHANGE_PAGE_ERROR", error });
      } finally {
        setIsLoading(false);
      }
    };
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage.server, , filter]);
  const handlePageClick = (selectedItem: { selected: number }) => {
    const page = selectedItem.selected + 1;
    setCurrentPage((pre) => ({ ...pre, client: page }));
    // window.scrollTo({ top: 900, behavior: "smooth" });
  };
  return (
    <>
      <div className=" text-sm mt-36 tracking-widest mb-2">
        {value ? (
          <div className="text-sm font-medium text-[#111111]">Search result for</div>
        ) : (
          <BreadCrum
            listBread={[
              { name: "Home", href: "/" },
              { name: `${items?.[0]?.category?.name || ""}`, href: `/${items?.[0]?.category?._id}` },
            ]}
          />
        )}
      </div>
      <div className=" flex justify-between items-center my-6">
        <div className="text-2xl font-medium">
          {!value ? items?.[0]?.categoryId?.name : value} ({listProduct?.data?.totalProduct || "0"})
        </div>
        <div className="hidden lg:flex items-center gap-8">
          <div>
            <span className="text-[#a6a6a6]"> Showing </span>
            {items?.length} of {listProduct?.data?.totalProduct}{" "}
            <span className="text-[#a6a6a6]"> {items?.[0]?.categoryId?.name} </span>
          </div>
          <button className="flex items-center gap-1 font-medium" onClick={() => setIsShowFilter(!isShowFilter)}>
            Hide filters <FilterIcon />{" "}
          </button>
          <div>
            <span className="font-medium">Sort By:</span> <Combobox filter={filter} setFilter={setFilter} />
          </div>
        </div>
        <FilterMobile
          filter={filter}
          setFilter={setFilter}
          attributes={listProductInit?.data?.listProduct[0]?.category.attributes}
        />
      </div>
      <div className="flex mb-20">
        <div
          className={`hidden  lg:flex flex-col gap-y-2 ${
            !isShowFilter ? "w-0 opacity-0" : "w-[17%] mr-16"
          } transition-all  duration-300  `}
        >
          <button
            className="text-end my-1 mb-4 hover:opacity-70"
            onClick={() =>
              setFilter({
                ...typeFilter,
                sortBy: "",
              })
            }
          >
            Clear Filters ({Object.values(filter).filter((item) => item).length})
          </button>
          {listProductInit?.data?.listProduct[0]?.category.attributes.map((attribute, index) => {
            return (
              <Filter
                key={attribute.name}
                filter={filter}
                setFilter={setFilter}
                data={attribute.values}
                valueKey={attribute.name}
                name={attribute.name}
              />
            );
          })}
        </div>
        {!listProduct || !listProduct?.data?.listProduct?.length ? (
          <div className="text-center flex-1 flex justify-center  items-center"> No results found</div>
        ) : (
          <>
            <ListProductCard isLoading={isLoading} gridCols={numColsGrid} listProduct={items} />
          </>
        )}
      </div>
      {listProduct?.data?.listProduct?.length !== 1 && (
        <ReactPaginate
          className=" ml-atuo justify-end flex gap-4 flex-wrap items-center mt-10 mb-20"
          pageLinkClassName={buttonVariants({ variant: "outline" })}
          nextClassName={buttonVariants({ variant: "outline" })}
          previousClassName={buttonVariants({ variant: "outline" })}
          activeLinkClassName="bg-black text-white"
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={Math.ceil((listProduct?.data?.totalProduct || 0) / limitClient)}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          forcePage={currentPage.client - 1}
        />
      )}
    </>
  );
}

export default CategoryClient;
