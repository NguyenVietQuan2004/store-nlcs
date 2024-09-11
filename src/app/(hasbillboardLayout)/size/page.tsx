import { DataTable } from "@/app/(hasbillboardLayout)/size/_table_size/data-table";
import { sizeColumns } from "@/app/(hasbillboardLayout)/size/_table_size/size-columns";

const dataSizeDress = [
  {
    id: 1,
    size: "Size S",
    height: "150 - 156 cm",
    weight: "42 - 48 kg",
    measurements: "Vòng 1: 82, Vòng 2: 66 , Vòng 3: 86",
  },
  {
    id: 2,
    size: "Size M",
    height: "156 - 160 cm",
    weight: "49 - 54 kg",
    measurements: "Vòng 1: 86, Vòng 2: 70 , Vòng 3: 90",
  },
  {
    id: 3,
    size: "Size L",
    height: "160 - 164 cm",
    weight: "55 - 59 kg",
    measurements: "Vòng 1: 90, Vòng 2: 74 , Vòng 3: 94",
  },
  {
    id: 4,
    size: "Size XL",
    height: "160 - 164 cm",
    weight: "60 - 65 kg",
    measurements: "Vòng 1: 94, Vòng 2: 78 , Vòng 3: 98",
  },
];

function Size() {
  return (
    <div className="mt-[80px] py-20  mx-auto  ">
      <h2 className="text-3xl font-semibold text-center">BẢNG TƯ VẤN SIZE</h2>
      <h3 className="text-xl my-10 font-semibold text-center">SIZE VÁY ÁO Nữ</h3>
      <div>
        <DataTable columns={sizeColumns} data={dataSizeDress} />
      </div>
    </div>
  );
}

export default Size;
