import { create } from "zustand";

import { toast } from "@/components/ui/use-toast";
import { productOrderType } from "@/Type/OrderTypes";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartStoreProps {
  items: productOrderType[];
  addItem: (product: productOrderType) => void;
  removeItem: (product: productOrderType) => void;
  removeAll: () => void;
}

export const useCart = create(
  persist<CartStoreProps>(
    (set, get) => ({
      items: [],
      addItem: (product: productOrderType) => {
        const currentItems = get().items;
        const existProduct = currentItems.find((item) => JSON.stringify(item) === JSON.stringify(product));
        if (existProduct) {
          toast({
            title: "Product is already selected",
          });
          return;
        }
        toast({
          title: "Add to cart success",
          variant: "success",
        });
        set({ items: [...currentItems, product] });
      },
      removeItem: (product: productOrderType) => {
        const currentItems = get().items;
        return set({ items: currentItems.filter((item) => JSON.stringify(item) !== JSON.stringify(product)) });
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "product-cart", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
