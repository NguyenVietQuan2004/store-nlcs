import { Suspense } from "react";
import SearchResultClient from "@/app/(hasbillboardLayout)/search-result/search-result-client";

async function SearchResult() {
  return (
    <Suspense fallback={<div>loading.....</div>}>
      <div className="mt-[120px] px-2 lg:px-10 mx-auto">
        <SearchResultClient />
      </div>
    </Suspense>
  );
}

export default SearchResult;
