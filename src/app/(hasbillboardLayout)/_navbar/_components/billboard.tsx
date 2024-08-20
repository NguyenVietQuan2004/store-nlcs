import Image from "next/image";
import { BillboardType } from "@/Type/BillboardTypes";

function Billboard({ billboard }: { billboard: BillboardType | undefined }) {
  return (
    <div className="relative mb-10 mt-24">
      {billboard && (
        <Image
          alt=""
          width={1300}
          height={500}
          className="w-full aspect-[4/2] object-cover rounded-xl select-none"
          src={billboard.image}
          priority
        />
      )}
      <div className="  text-3xl text-center font-extrabold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {billboard?.label}
      </div>
    </div>
  );
}

export default Billboard;
