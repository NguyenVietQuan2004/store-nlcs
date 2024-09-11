"use client";

import { useModalPreview } from "@/hooks/use-modal-preview";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import ProductInfor from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/productInfor";

function PreviewModal() {
  const { isOpen, onClose, data } = useModalPreview();
  if (!data) {
    return null;
  }
  return (
    <Dialog open={isOpen}>
      <DialogContent onInteractOutside={onClose} showIcon={true} setIsShowModal={onClose} className="p-4 ">
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <ProductInfor product={data} isShowChinhSach={false} />
        {/* <PreviewModalInfo product={data} onClose={onClose} /> */}
      </DialogContent>
    </Dialog>
  );
}

export default PreviewModal;
