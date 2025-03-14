"use client";

import { useEffect, useState } from "react";
import { orderApi } from "@/apiRequest/orderAPI";
import { ListOrderResType, productOrderType } from "@/Type/OrderTypes";
import { formattedPrice } from "@/lib/utils";

const OrderList = () => {
  const [orders, setOrders] = useState<ListOrderResType["data"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      let user_id;
      try {
        if (typeof window !== "undefined") {
          const user = localStorage.getItem("user");
          if (user) {
            const userParse = JSON.parse(user).user;
            user_id = userParse._id;
            const response = await orderApi.order({ user_id });
            setOrders(response.data);
          }
        }
      } catch (err) {
        setError("Error loading orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6 mt-24">
      <h2 className="text-2xl font-semibold mb-4">Placed Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-medium">
              Order #{order._id.slice(-6)} - {order.is_paid ? "Paid" : "Unpaid"}
            </h3>
            <p className="text-sm text-gray-500">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">Phone: {order.phone}</p>
            <p className="text-sm text-gray-500">Address: {order.address}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {order.order_items.map((item: productOrderType) => (
                <div key={`${item.product._id}${item.product_variant_id}`} className="border p-4 rounded-lg shadow">
                  {item.product.images?.[0] && (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-40 object-cover rounded-lg mb-2"
                    />
                  )}
                  <h4 className="text-lg">{item.product.name}</h4>
                  <p className="text-gray-700">Price: {formattedPrice(item.snapshot_price)}</p>
                  <p className={`text-sm ${item.quantity === 0 ? "text-red-500" : "text-green-600"}`}>
                    {item.quantity > 0 ? `Quantity: ${item.quantity}` : "Out of stock"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;
