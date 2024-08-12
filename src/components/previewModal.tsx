import { useModalPreview } from "@/hooks/use-modal-preview";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProductInfor from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/productInfor";

function PreviewModal() {
  const { isOpen, onClose, data } = useModalPreview();
  if (!data) {
    return null;
  }
  return (
    <Dialog open={isOpen}>
      <DialogContent showIcon={true} setIsShowModal={onClose} className="p-4">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <ProductInfor product={data} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PreviewModal;
