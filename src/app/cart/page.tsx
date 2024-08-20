import CartClient from "@/app/cart/cart-client";

function Cart() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Shopping cart</h2>
      <CartClient />
    </div>
  );
}

export default Cart;
