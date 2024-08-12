"use client";

import queryString from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ListSizeResType } from "@/Type/SizeTypes";
import { ListColorResType } from "@/Type/ColorType";
import { Separator } from "@/components/ui/separator";

interface FilterProps {
  data: ListSizeResType["data"] | ListColorResType["data"] | undefined;
  valueKey: string;
  name: string;
}

function Filter({ data, name, valueKey }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  let selectedValue = searchParams.get(valueKey);
  const currentQuery = queryString.parse(searchParams.toString());
  const handleOnclick = (_id: string) => {
    selectedValue = selectedValue ? (selectedValue === _id ? null : _id) : _id;

    const query = {
      ...currentQuery,
      [valueKey]: selectedValue,
    };
    const url = queryString.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );
    router.push(url);
    router.refresh();
  };
  return (
    <div>
      <h3>{name}</h3>
      <Separator className="my-4" />
      <div className="grid grid-cols-3 gap-2">
        {data?.map((item) => (
          <Button
            key={item.name}
            onClick={() => handleOnclick(item._id)}
            variant="outline"
            className={`${selectedValue === item._id && "bg-black text-white"}`}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Filter;
