import Image from "next/image";

import { Button } from "@/components/ui/button";
import { youtubeIcon } from "../../../../../public/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const insurance = [
  {
    title: "Ensure production quality with",
    image: "https://res.cloudinary.com/dvyi5jxrm/image/upload/v1724582010/syr2uotduq8wpx32nzwx.webp",
    video: "https://play.video.alibaba.com/global/play/457174233483.mp4",
    textVideo: "Learn about Verified Supplier",
    text: `Connect with a variety of suppliers with third-party-verified credentials and capabilities. Look for the "Verified" logo to begin sourcing with experienced suppliers your business could rely on.`,
  },
  {
    title: "Protect your purchase with",
    video:
      "https://video01.alibaba.com/vod-icbu/4f4e1c368ac918af/4c719b7dd20d5679/20240412_b9a0da60047aa009_457174233482_mp4_264_hd_unlimit_taobao.mp4?w=1280&h=720&e=hd&t=2102f5bd17252873154532393e1897&b=icbu_video&p=icbu_video_icbu_vod_publish&tr=mp4-264-hd-unlimit",
    image: "https://res.cloudinary.com/dvyi5jxrm/image/upload/v1724582045/hvqeklzotfiy5t9oqlun.webp",
    textVideo: "Learn about Trade Assurance",
    text: `Source confidently with access to secure payment options, protection against product or shipping issues, and mediation support for any purchase-related concerns when you order and pay on Alibaba.com.`,
  },
];

interface InsuranceProps {
  backgroundInsurance: string | undefined;
}

function Insurance({ backgroundInsurance }: InsuranceProps) {
  return (
    <div className="relative overflow-hidden ">
      <Image
        alt=""
        src={backgroundInsurance || ""}
        width={1700}
        height={1000}
        className="w-full object-cover h-[130vh]"
      />
      <div className="absolute text-[34px]  leading-[48px] lg:leading-[52px] lg:text-[44px] font-bold text-white max-w-[800px] top-20 lg:top-28 left-10 ">
        Trade with confidence from production quality to purchase protection
      </div>
      <div className="absolute flex overflow-auto max-w-full  lg:grid grid-cols-2 gap-x-2 lg:gap-x-8 top-[40%] px-2 lg:px-10 text-white">
        {insurance.map((val) => (
          <div
            key={val.title}
            className="rounded-3xl min-w-full p-4 lg:p-12 backdrop-blur-[50px] bg-[hsla(0,0%,100%,.11)]   "
          >
            <div className="text-xl">{val.title}</div>
            <Image
              alt=""
              src={val.image}
              width={500}
              height={500}
              className="w-full  lg:w-[400px]  lg:h-[70px] my-5 object-cover"
            />
            <div>{val.text}</div>
            <div className="flex items-center gap-x-6 mt-12">
              <Button className="bg-[#00000032] hover:bg-black hover:bg-opacity-45 flex items-center gap-x-2 py-6 border px-5 rounded-full border-white max-w-[320px]">
                <Image alt="" src={youtubeIcon} width={200} height={200} className="w-6 h-6 object-cover" />

                <Dialog>
                  <DialogTrigger asChild>
                    <span className="font-medium text-base">Watch video</span>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                      <DialogDescription>
                        <span className="block text-xl font-semibold text-[#111111] my-1">{val.textVideo}</span>
                        <video controls src={val.video} autoPlay></video>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </Button>
              <div className="underline">Learn more</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Insurance;
