import CartClient from "@/app/(hasbillboardLayout)/cart/cart-client";

function Cart() {
  return (
    <div className="mt-16 pb-28">
      <div className=" ">
        <h2 className="text-[26px]  font-medium mt-[100px] mb-6 px-2  lg:px-[100px] xl:px-[200px]">Bag</h2>
        <CartClient />
      </div>
    </div>
  );
}

export default Cart;
