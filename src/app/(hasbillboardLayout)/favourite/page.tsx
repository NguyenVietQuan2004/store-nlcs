import FavouriteClient from "@/app/(hasbillboardLayout)/favourite/favourite-client";

function Cart() {
  return (
    <div className="p-2 pt-20 lg:p-20">
      <h2 className="text-2xl font-medium my-10">Manage Your Favourites</h2>
      <FavouriteClient />
    </div>
  );
}

export default Cart;
