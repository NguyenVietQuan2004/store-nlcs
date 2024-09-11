"use client";

import { useModalUpdateSize } from "@/hooks/use-modal-update-size";
import UpdateSizeModalInfo from "@/components/update-size-model-info";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

function UpdateSizeModal() {
  const { isOpen, onClose, data } = useModalUpdateSize();
  if (!data) {
    return null;
  }
  return (
    <Dialog open={isOpen}>
      <DialogContent onInteractOutside={onClose} showIcon={true} setIsShowModal={onClose} className="p-4 ">
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <UpdateSizeModalInfo productOrder={data} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}

export default UpdateSizeModal;
