"use client";

import { SetStateAction, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ListSizeResType } from "@/Type/SizeTypes";
import { ListColorResType } from "@/Type/ColorType";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FilterProps {
  filter: any;
  name: string;
  valueKey: string;
  autoShow?: boolean;
  setFilter: React.Dispatch<SetStateAction<any>>;
  // data: ListSizeResType["data"] | ListColorResType["data"] | undefined;
  data: string[];
}

function Filter({ data, name, valueKey, setFilter, filter, autoShow = false }: FilterProps) {
  const [isOpen, setIsOpen] = useState(autoShow);

  const handleOnclick = (_id: string) => {
    setFilter((pre: any) => {
      return _id === pre[valueKey] ? { ...pre, [valueKey]: undefined } : { ...pre, [valueKey]: _id };
    });
  };
  return (
    <div>
      <Collapsible open={isOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex justify-between">
            <h3 className="font-semibold">{name}</h3>
            {isOpen ? (
              <ChevronUp className="hidden lg:block" onClick={() => setIsOpen(!isOpen)} />
            ) : (
              <ChevronDown className="hidden lg:block" onClick={() => setIsOpen(!isOpen)} />
            )}
          </div>
          <Separator className="my-6 lg:my-4" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-wrap gap-2 mb-2">
            {data?.map((item) => (
              <Button
                key={item}
                onClick={() => handleOnclick(item)}
                variant="outline"
                size={"sm"}
                className={`${filter[name] === item && "bg-black text-white "}`}
              >
                {item}
              </Button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export default Filter;
