import { MinusIcon, PlusIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { currentSizeProps } from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/productInfor";

interface AmountProps {
  currentSize: currentSizeProps;
  setCurrentSize: React.Dispatch<React.SetStateAction<currentSizeProps>>;
}

function Amount({ setCurrentSize, currentSize }: AmountProps) {
  const handleMinusAmount = () => {
    setCurrentSize((pre: currentSizeProps) => {
      return pre.currentAmount! <= 1 ? { ...pre, currentAmount: 1 } : { ...pre, currentAmount: pre.currentAmount! - 1 };
    });
  };
  const handlePlusAmount = () => {
    setCurrentSize((pre: currentSizeProps) => {
      return pre.currentAmount! >= pre.maxAmount!
        ? { ...pre, currentAmount: pre.maxAmount }
        : { ...pre, currentAmount: pre.currentAmount! + 1 };
    });
  };
  return (
    <div className="flex items-center my-6 select-none gap-2">
      <div className="flex items-center">
        <span className="mr-8">Quantity</span>
        <div className="flex border border-collapse rounded-tl-xl rounded-br-xl ">
          <Button
            onClick={handleMinusAmount}
            disabled={currentSize.currentAmount === 1 || currentSize.maxAmount === 0}
            className={buttonVariants({
              variant: "outline",
              className: "text-black disabled:text-zinc-500 rounded-none  rounded-br-xl rounded-tl-xl ",
              size: "sm",
            })}
          >
            <MinusIcon />
          </Button>
          <div className="min-w-12 text-center select-none leading-[36px] ">{currentSize.currentAmount}</div>
          <Button
            onClick={handlePlusAmount}
            disabled={currentSize.currentAmount === currentSize.maxAmount || currentSize.maxAmount === 0}
            className={buttonVariants({
              variant: "outline",
              className: "text-black disabled:text-zinc-500 rounded-none  rounded-tl-xl rounded-br-xl   ",
              size: "sm",
            })}
          >
            <PlusIcon />
          </Button>
        </div>
      </div>
      <div className="ml-auto text-[#28a745] text-sm">(Còn {currentSize.maxAmount} sản phẩm)</div>
    </div>
  );
}

export default Amount;
