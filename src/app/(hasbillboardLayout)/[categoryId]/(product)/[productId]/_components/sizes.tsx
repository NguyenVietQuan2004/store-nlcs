import { Button, buttonVariants } from "@/components/ui/button";
import { currentSizeProps } from "./productInfor";

type objectPriceType = Omit<currentSizeProps, "colorUserSelect" | "imagesUserSelect">;

interface SizeProps {
  currentSize: currentSizeProps;
  arrayPrice: objectPriceType[];
  setCurrentSize: React.Dispatch<React.SetStateAction<currentSizeProps>>;
}

function Sizes({ arrayPrice, currentSize, setCurrentSize }: SizeProps) {
  const handleChangeSize = (objectPrice: objectPriceType) => {
    setCurrentSize({
      ...currentSize,
      size: objectPrice.size,
      price: objectPrice.price,
      colors: objectPrice.colors,
      colorUserSelect: objectPrice.colors[0],
    });
  };
  return (
    <div className="font-semibold flex gap-3">
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
