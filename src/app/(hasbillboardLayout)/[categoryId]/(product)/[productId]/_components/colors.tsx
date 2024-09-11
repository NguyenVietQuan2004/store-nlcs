import { currentSizeProps } from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/productInfor";

interface SizeProps {
  currentSize: currentSizeProps;
  setCurrentSize: React.Dispatch<React.SetStateAction<currentSizeProps>>;
}

function Colors({ currentSize, setCurrentSize }: SizeProps) {
  return (
    <div className="my-5 flex items-center justify-start flex-wrap gap-y-1">
      <span className="">Color: </span>{" "}
      {currentSize.colors.map((color: string) => (
        <div
          onClick={() => setCurrentSize({ ...currentSize, colorUserSelect: color })}
          key={color}
          className={`p-[2px] ml-4 cursor-pointer  ${
            color === currentSize.colorUserSelect && "!border-black"
          } border  border-border rounded-full w-6 h-6 transition-all duration-150 `}
        >
          <div style={{ backgroundColor: color }} className={` w-full h-full  rounded-full`}></div>
        </div>
      ))}
    </div>
  );
}

export default Colors;
