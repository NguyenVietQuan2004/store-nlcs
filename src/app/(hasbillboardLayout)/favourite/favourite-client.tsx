"use client";

import { useFavourite } from "@/hooks/useFavourite";
import ListProductCard from "@/components/list-product-card";

function FavouriteClient() {
  const { itemsFavourite } = useFavourite();
  return (
    <div className="">
      <ListProductCard gridCols={3} scroll={true} listProduct={itemsFavourite} />
      {!itemsFavourite.length && (
        <div className="text-xl text-center underline">Items added to your Favourites will be saved here.</div>
      )}
    </div>
  );
}

export default FavouriteClient;
