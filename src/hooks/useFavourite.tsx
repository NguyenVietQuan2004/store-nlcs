import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { ProductType } from "@/Type/ProductType";
import { toast } from "@/components/ui/use-toast";

interface FavouriteStoreProps {
  itemsFavourite: ProductType[];
  removeAllFavourite: () => void;
  addItemFavourite: (product: ProductType) => void;
  removeItemFavourite: (product: ProductType) => void;
}

export const useFavourite = create(
  persist<FavouriteStoreProps>(
    (set, get) => ({
      itemsFavourite: [],
      addItemFavourite: (product: ProductType) => {
        const currentItems = get().itemsFavourite;

        const existProduct = currentItems.find((item) => item._id === product._id);
        if (existProduct) {
          return toast({
            title: "Product is already exist",
          });
        }
        toast({
          title: "Add to favourite success",
          variant: "success",
        });
        set({ itemsFavourite: [...currentItems, product] });
      },
      removeItemFavourite: (product: ProductType) => {
        const currentItems = get().itemsFavourite;
        set({ itemsFavourite: currentItems.filter((item) => item._id !== product._id) });
      },
      removeAllFavourite: () => set({ itemsFavourite: [] }),
    }),
    {
      name: "product-favourite",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
