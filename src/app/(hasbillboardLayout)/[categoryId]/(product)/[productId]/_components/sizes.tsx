import { Button, buttonVariants } from "@/components/ui/button";
import { currentSizeProps } from "./productInfor";

interface objectPriceProps {
  size: string;
  price: number;
  colors: Array<string>;
  amount: number;
}

interface SizeProps {
  currentSize: currentSizeProps;
  arrayPrice: objectPriceProps[];
  setCurrentSize: React.Dispatch<React.SetStateAction<currentSizeProps>>;
}

function Sizes({ arrayPrice, currentSize, setCurrentSize }: SizeProps) {
  const handleChangeSize = (objectPrice: objectPriceProps) => {
    setCurrentSize({
      ...currentSize,
      size: objectPrice.size,
      price: objectPrice.price,
      colors: objectPrice.colors,
      currentAmount: 2,
      // currentAmount: objectPrice.amount,
      colorUserSelect: objectPrice.colors[0],
    });
  };
  return (
    <div className="font-semibold flex gap-3 flex-wrap items-center">
      Size:
      {arrayPrice.map((objectPrice) => {
        const disabled = objectPrice.size === currentSize.size;
        return (
          <Button
            onClick={() => handleChangeSize(objectPrice)}
            className={buttonVariants({
              variant: "outline",
              className: `text-black ${disabled && "bg-zinc-300"} `,
            })}
            disabled={disabled}
            key={objectPrice.size}
          >
            {objectPrice.size}{" "}
          </Button>
        );
      })}
    </div>
  );
}

export default Sizes;
