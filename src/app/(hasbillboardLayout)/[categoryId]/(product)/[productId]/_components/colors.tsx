import { currentSizeProps } from "./productInfor";

interface SizeProps {
  currentSize: currentSizeProps;
  setCurrentSize: React.Dispatch<React.SetStateAction<currentSizeProps>>;
}

function Colors({ currentSize, setCurrentSize }: SizeProps) {
  return (
    <div className="my-5 flex items-center justify-start">
      <span className="font-semibold">Color: </span>{" "}
      {currentSize.colors.map((color: string) => (
        <div
          onClick={() => setCurrentSize({ ...currentSize, colorUserSelect: color })}
          key={color}
          className={`p-[2px] ml-4 cursor-pointer  ${
            color === currentSize.colorUserSelect && "!border-black"
          } border-[2px]  border-transparent rounded-full w-6 h-6 transition-all duration-150 `}
        >
          <div style={{ backgroundColor: color }} className={` w-full h-full  rounded-full`}></div>
        </div>
      ))}
    </div>
  );
}

export default Colors;
