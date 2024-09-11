"use client";

import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { SetStateAction, useRef } from "react";

import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/useHistorySearch";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

interface SearchFormProps {
  isShowSearch: boolean;
  setIsShowSearch: React.Dispatch<SetStateAction<boolean>>;
}
const formSchema = z.object({
  value: z.string(),
});
function SearchForm({ setIsShowSearch }: SearchFormProps) {
  const router = useRouter();
  const { addItemSearch, itemsSearch } = useSearch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (data.value.trim()) {
      addItemSearch(data.value);
      router.push(`/search-result?value=${data.value}`);
      setIsShowSearch(false);
    }
  };
  const handleClickSearchItem = (data: string) => {
    if (data.trim()) {
      router.push(`/search-result?value=${data}`);
      setIsShowSearch(false);
    }
  };
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsShowSearch(false);
    }
  };

  return (
    <div
      onClick={(e) => handleClick(e)}
      className="fixed top-0 right-0 left-0 bottom-0 h-[100vh]  bg-black bg-opacity-40"
    >
      <div
        className={`lg:animate-search-input animate-search-input-mobile h-full lg:h-[320px] overflow-hidden px-6 lg:px-10 absolute w-[100vw] right-0  pt-3   bg-white`}
        ref={ref}
      >
        <div className="flex justify-between items-center lg:gap-x-48 gap-x-2">
          <div className="hidden lg:block">
            <Image
              alt=""
              width={200}
              height={200}
              className="w-8"
              src={"https://res.cloudinary.com/dvyi5jxrm/image/upload/v1725116961/t2vvfvzknla0aw6oiagn.png"}
            />
          </div>
          <div className="flex  hover:bg-[#e6e6e6]  group  items-center bg-[#f5f5f5] p-2 pl-0 flex-1 h-[36px] rounded-full">
            <div className="mr-1 p-2 bg-transparent group-hover:hover:bg-[#d6d6d6] group-hover:bg-[#f3f3f3] rounded-full">
              <SearchIcon size={18} />
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormControl>
                          <input
                            {...field}
                            autoComplete="off"
                            className=" w-full pr-4 outline-none bg-transparent"
                            placeholder="Search"
                            autoFocus
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    );
                  }}
                />
              </form>
            </Form>
          </div>
          <Button className="font-medium text-[#111111]" variant={"outline"} onClick={() => setIsShowSearch(false)}>
            Cancel
          </Button>
        </div>
        <div className="flex justify-between lg:ml-10 items-center pt-9 lg:pb-12 lg:gap-x-48">
          <div className="hidden lg:block"></div>
          <div className="flex-1">
            <div className="text-[#707072] text-sm">
              History Search - Sau này sẽ dùng Machine Learning check xem cái nào được search nhiều nhất{" "}
            </div>
            <div className="mt-4 animate-opacity">
              {itemsSearch.slice(0, 4).map((item) => (
                <div
                  key={item}
                  className="text-xl hover:bg-[#f5f5f5]  p-2 px-0 lg:px-3"
                  onClick={() => handleClickSearchItem(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
