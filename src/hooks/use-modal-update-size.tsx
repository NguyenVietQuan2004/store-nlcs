import { create } from "zustand";
import { productOrderType } from "@/Type/OrderTypes";

interface useModalUpdateSizeProps {
  isOpen: boolean;
  data: productOrderType | null;
  onClose: () => void;
  onOpen: (productOrder: productOrderType) => void;
}

export const useModalUpdateSize = create<useModalUpdateSizeProps>()((set, get) => ({
  isOpen: false,
  data: null,
  onClose: () => set({ isOpen: false }),
  onOpen: (productOrder: productOrderType) => set({ data: productOrder, isOpen: true }),
}));
