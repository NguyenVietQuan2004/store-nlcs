import { ProductResType, ProductType } from "@/Type/ProductType";
import { create } from "zustand";

interface useModalCreateProps {
  isOpen: boolean;
  data: ProductType | null;
  onOpen: (product: ProductType) => void;
  onClose: () => void;
}

export const useModalPreview = create<useModalCreateProps>()((set) => ({
  isOpen: false,
  data: null,
  onOpen: (product: ProductType) => set({ data: product, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

// const useModalCreateStore = create<ModalCreateProps>()((set) => ({
//   isShowModalCreate: false,
//   setIsShowModalCreate: (isShowModalCreate: boolean) => set({ isShowModalCreate }),
// }));
// export default useModalCreateStore;
