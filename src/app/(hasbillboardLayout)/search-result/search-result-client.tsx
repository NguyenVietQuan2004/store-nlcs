"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { productAPI } from "@/apiRequest/productAPI";
import { handlError } from "@/components/handle-error";
import { ListProductResType } from "@/Type/ProductType";
import CategoryClient from "@/app/(hasbillboardLayout)/[categoryId]/category-client";

function SearchResultClient() {
  const searchParams = useSearchParams();
  const [listProduct, setListProduct] = useState<ListProductResType | null>(null);
  const limitServer = 48; // số lượng sản phẩm fetch về từ server
  const router = useRouter();
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const data = await productAPI.getListProduct({
          page: 1,
          limit: 100,
          value: searchParams.get("value") || "",
          variants: [],
        });
        setListProduct(data);
        router.refresh();
      } catch (error) {
        handlError({ consoleError: "ERROR_SEARCHPARAMS_PRODUCT", error });
      }
    };
    fetchAPI();
  }, [searchParams]);

  return (
    <div>
      {listProduct && (
        <CategoryClient
          limitServer={limitServer}
          listProductInit={listProduct}
          value={searchParams.get("value") || undefined}
        />
      )}
    </div>
  );
}

export default SearchResultClient;
