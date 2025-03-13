"use client";
import { SetStateAction, useEffect, useState } from "react";
import { CloseIconMobile, FilterIcon } from "../../../../../public/icons";
import { Combobox } from "@/components/combobox";
import Filter from "../filter";
import { ListSizeResType } from "@/Type/SizeTypes";
import { ListColorResType } from "@/Type/ColorType";
import { Button } from "@/components/ui/button";
import { ProductResType } from "@/Type/ProductType";

interface FilterMobileProps {
  filter: any;
  setFilter: React.Dispatch<SetStateAction<any>>;
  attributes: ProductResType["data"]["product"]["category"]["attributes"] | undefined;
}

function FilterMobile({ filter, setFilter, attributes }: FilterMobileProps) {
  const [isShowModalFilter, setIsShowModalFilter] = useState(false);
  const typeFilter = Object.assign(
    {},
    ...(attributes?.map((attr) => ({
      [attr.name]: undefined,
    })) ?? [])
  );
  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    html.style.overflow = isShowModalFilter ? "hidden" : "";

    return (): void => {
      html.style.overflow = "";
    };
  }, [isShowModalFilter]);
  return (
    <>
      <button
        onClick={() => setIsShowModalFilter(true)}
        className="flex lg:hidden items-center h-[34px] gap-1 font-medium py-[6px] px-5 border rounded-full"
      >
        Filter <FilterIcon />
      </button>
      {isShowModalFilter && (
        <div className="fixed flex flex-col gap-5 inset-0 h-[100%] *: z-30 pt-0 px-5 bg-white">
          <div className="flex justify-between items-center">
            <span className="font-medium">Filter</span>
            <div className="p-5 pr-0" onClick={() => setIsShowModalFilter(false)}>
              <CloseIconMobile />
            </div>
          </div>
          <Combobox filter={filter} setFilter={setFilter} />
          <div className="flex flex-col mt-5 gap-y-10  max-h-[400px] overflow-auto pb-20">
            {attributes?.map((attribute, index) => {
              return (
                <Filter
                  key={attribute.name}
                  filter={filter}
                  setFilter={setFilter}
                  data={attribute.values}
                  valueKey={attribute.name}
                  name={attribute.name}
                  autoShow={true}
                />
              );
            })}
          </div>
          <div className="absolute border-t bg-white py-4 px-6 flex gap-4 bottom-0 right-0 left-0 justify-center">
            <Button
              className="w-full"
              variant={"outline"}
              onClick={() =>
                setFilter({
                  ...typeFilter,
                  sortBy: "",
                })
              }
            >
              Clear ({Object.values(filter).filter((item: any) => item).length})
            </Button>
            <Button className="w-full" onClick={() => setIsShowModalFilter(false)}>
              Apply
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default FilterMobile;
