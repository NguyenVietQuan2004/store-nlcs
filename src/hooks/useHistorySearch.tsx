import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SearchStoreProps {
  itemsSearch: string[];
  removeAllSearch: () => void;
  addItemSearch: (data: string) => void;
  removeItemSearch: (data: string) => void;
}

export const useSearch = create(
  persist<SearchStoreProps>(
    (set, get) => ({
      itemsSearch: [],
      addItemSearch: (data: string) => {
        const currentItems = get().itemsSearch;

        set({ itemsSearch: [data, ...currentItems] });
      },
      removeItemSearch: (data: string) => {
        const currentItems = get().itemsSearch;
        set({ itemsSearch: currentItems.filter((item) => item !== data) });
      },
      removeAllSearch: () => set({ itemsSearch: [] }),
    }),
    {
      name: "history-search",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
