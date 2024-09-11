import Link from "next/link";
import { EarthIcon } from "../../public/icons";
import { Separator } from "@/components/ui/separator";

const list = [
  {
    id: "Help",
    data: ["Get Help", "Order Status", "Delivery", "Returns", "Payment Options", "Contact Us"],
  },
  {
    id: "Resources",
    data: ["Find A Store", "Become A Member", "Send Us Feedback"],
  },

  {
    id: "About Hange",
    data: ["News", "Careers", "Investors", "Sustainability"],
  },
];

const Footer = () => {
  return (
    <footer className="bg-white flex-grow-0 z-10">
      <div className="p-4">
        <div className="border-t border-gray-200">
          <div className="grid grid-cols-6 text-sm   p-10">
            {list.map((item) => {
              return (
                <div key={item.id}>
                  <h3 className="text-[#111111] font-semibold mb-4">{item.id}</h3>
                  {item.data.map((item) => (
                    <div key={item} className="text-[#707072] my-2 font-light cursor-pointer hover:opacity-75">
                      {item}
                    </div>
                  ))}
                </div>
              );
            })}
            <div className="col-span-2"></div>
            <div className="flex justify-end h-5 items-center">
              <EarthIcon />
              <span className="ml-1 text-[#707072] font-medium">Vietnam</span>
            </div>
          </div>
          {/* <div className="pb-8 pt-16  border-t border-gray-200">
            <div className="flex justify-center">
              <Image
                alt=""
                width={200}
                height={200}
                className="w-10"
                src={"https://res.cloudinary.com/dvyi5jxrm/image/upload/v1725116961/t2vvfvzknla0aw6oiagn.png"}
              />
            </div>
          </div> */}
          {/* <div>
            <div className="relative flex items-center px-6 py-6 sm:py-8 lg:mt-0">
              <div className="absolute inset-0 overflow-hidden rounded-lg">
                <div aria-hidden="true" className="absolute bg-zinc-50 inset-0 bg-gradient-to-br bg-opacity-90" />
              </div>

              <div className="text-center relative mx-auto max-w-sm">
                <h3 className="font-semibold text-gray-900">Ecommerce CMS</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Premium online shopping, products at your doorstep in a blink!
                  <Link href="#" className="ml-2 whitespace-nowrap font-medium text-black hover:text-zinc-900">
                    Get started &rarr;
                  </Link>
                </p>
              </div>
            </div>
          </div> */}
        </div>
        <Separator />
        <div className="py-10 md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} All Rights Reserved</p>
          </div>

          <div className="mt-4 flex items-center justify-center md:mt-0">
            <div className="flex space-x-8">
              <div className="text-sm text-muted-foreground hover:text-gray-600">Hotline: 0763948610</div>
              <Link href="#" className="text-sm text-muted-foreground hover:text-gray-600">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-gray-600">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-gray-600">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
