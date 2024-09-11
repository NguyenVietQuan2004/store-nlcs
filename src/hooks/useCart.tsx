import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { toast } from "@/components/ui/use-toast";
import { productOrderType } from "@/Type/OrderTypes";
import { ListProductResType } from "@/Type/ProductType";

interface dataUpdateSizeProps {
  old: { productId: string; size: string; color: string };
  new: { size: string; color: string };
}
interface dataUpdateAmountProps {
  old: { productId: string; size: string; color: string };
  new: { amount: number };
}
interface CartStoreProps {
  items: productOrderType[];
  removeAll: () => void;
  addItem: (product: productOrderType) => void;
  removeItem: (product: productOrderType) => void;
  onUpdateSize: (dataUpdate: dataUpdateSizeProps) => void;
  onUpdateAmount: (dataUpdate: dataUpdateAmountProps) => void;
  onUpdateWhenMounted: (dataUpdate: ListProductResType["data"]["listProduct"]) => void;
}

export const useCart = create(
  persist<CartStoreProps>(
    (set, get) => ({
      items: [],
      addItem: (product: productOrderType) => {
        const currentItems = get().items;
        const existProduct = currentItems.find((item) => {
          return item.product._id === product.product._id && item.size === product.size;
        });
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
        set({ items: [product, ...currentItems] });
      },
      removeItem: (product: productOrderType) => {
        const currentItems = get().items;
        return set({
          items: currentItems.filter((item) => {
            if (item.size === product.size && item.product._id === product.product._id) {
              return false;
            }
            return true;
          }),
        });
      },
      removeAll: () => set({ items: [] }),
      onUpdateWhenMounted: (dataUpdate: ListProductResType["data"]["listProduct"]) => {
        const currentItems = get().items;
        set({
          items: currentItems.map((item) => {
            const itemInDatabase = dataUpdate.find((itemDB) => itemDB._id === item.product._id)!;
            const objectPriceInDB = itemInDatabase.arrayPrice.find((objectPrice) => objectPrice.size === item.size);
            return {
              ...item,
              product: itemInDatabase,
              amount: item.amount > (objectPriceInDB?.amount || 0) ? objectPriceInDB?.amount || 0 : item.amount,
            };
          }),
        });
      },
      onUpdateAmount: (dataUpdate: dataUpdateAmountProps) => {
        const items = get().items;
        set({
          items: items.map((item: productOrderType) => {
            const isCurrent = item.product._id === dataUpdate.old.productId && item.size === dataUpdate.old.size;
            if (isCurrent) {
              return {
                ...item,
                amount: dataUpdate.new.amount,
              };
            }
            return item;
          }),
        });
      },
      onUpdateSize: (dataUpdate: dataUpdateSizeProps) => {
        const items = get().items;
        const existProduct = items.find(
          (item) =>
            item.size === dataUpdate.new.size &&
            item.product._id === dataUpdate.old.productId &&
            item.color === dataUpdate.new.color
        );
        if (existProduct) {
          toast({
            title: "Product is already selected",
          });
          return;
        }
        const currentProductOrder = items.find(
          (item) => item.size === dataUpdate.old.size && item.product._id === dataUpdate.old.productId
        );

        set({
          items: [
            ...items.map((item: productOrderType) => {
              const isCurrent = item.size === dataUpdate.old.size && item.product._id === dataUpdate.old.productId;
              if (isCurrent && currentProductOrder) {
                const objectNewPrice = currentProductOrder.product.arrayPrice.find(
                  (item) => item.size === dataUpdate.new.size
                );
                const amount =
                  currentProductOrder.amount > (objectNewPrice?.amount || 0)
                    ? objectNewPrice?.amount
                    : currentProductOrder.amount;
                return {
                  ...item,
                  color: dataUpdate.new.color,
                  size: dataUpdate.new.size,
                  amount: amount || 0,
                };
              }
              return item;
            }),
          ],
        });
        toast({
          title: "Updated cart",
          variant: "success",
        });
      },
    }),

    {
      name: "product-cart",
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
