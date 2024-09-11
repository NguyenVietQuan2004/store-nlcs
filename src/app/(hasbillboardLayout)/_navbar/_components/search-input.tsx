"use client";

import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import SearchForm from "@/app/(hasbillboardLayout)/_navbar/_components/search-form";

function SearchInput() {
  const [isShowSearch, setIsShowSearch] = useState(false);

  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];

    if (isShowSearch) {
      html.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
    }

    return (): void => {
      html.style.overflow = "";
    };
  }, [isShowSearch]);

  return (
    <div>
      <div
        onClick={() => setIsShowSearch(true)}
        className="hover:bg-[#e6e6e6]  group flex items-center lg:bg-[#f5f5f5] lg:p-2 lg:pl-0 backdrop-blur-lg lg:w-[180px] h-[36px] rounded-full"
      >
        <div className="group-hover:hover:bg-[#d6d6d6] lg:mr-1 group-hover:bg-[#f3f3f3] p-2 bg-transparent  rounded-full">
          <SearchIcon size={20} />
        </div>
        <input
          readOnly
          className="outline-none hidden lg:block placeholder:text-[#838383] placeholder:font-medium   w-full  bg-transparent"
          placeholder="Search"
        />
      </div>
      {isShowSearch && <SearchForm isShowSearch={isShowSearch} setIsShowSearch={setIsShowSearch} />}
    </div>
  );
}

export default SearchInput;
