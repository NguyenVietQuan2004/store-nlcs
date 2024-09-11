import { create } from "zustand";

import { ProductType } from "@/Type/ProductType";

interface useModalCreateProps {
  isOpen: boolean;
  data: ProductType | null;
  onClose: () => void;
  onOpen: (product: ProductType) => void;
}

export const useModalPreview = create<useModalCreateProps>()((set) => ({
  isOpen: false,
  data: null,
  onClose: () => set({ isOpen: false }),
  onOpen: (product: ProductType) => set({ data: product, isOpen: true }),
}));
