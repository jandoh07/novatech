import { useQuery } from "react-query";
import CartCard from "../components/cart/CartCard";
import CartCheckout from "../components/cart/CartCheckout";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import { useCartStore, useUserStore } from "../zustand/store";
import { customAxios } from "../axios/axios";
import { ScaleLoader } from "react-spinners";
import { Product } from "../types/Product";
import useCart from "../hooks/useCart";

const Cart = () => {
  const { cart } = useCartStore();
  const { user } = useUserStore();
  const { setCartTotalPrice, totalPrice, setTotalPrice } = useCart();

  const query = useQuery(
    "cart",
    async () => {
      if (user && user.cart.length > 0) {
        const res = await customAxios.post("/cart", { productIds: user.cart });
        return res.data;
      } else if (cart.length > 0) {
        const res = await customAxios.post("/cart", { productIds: cart });
        return res.data;
      }
      return [];
    },
    {
      onSuccess: (data: Product[]) => {
        setCartTotalPrice(data);
      },
    }
  );

  return (
    <div className="flex flex-col justify-between min-h-[100svh]">
      <div>
        <Header />
        {user && user.cart.length === 0 && cart.length === 0 ? (
          <div className="flex justify-center items-center h-[50vh]">
            <p className="text-2xl">Cart is empty</p>
          </div>
        ) : (
          <div className="custom-container md:flex gap-2 items-start my-2">
            <div className="w-full mb-3 md:mb-0 space-y-2">
              {query.isLoading ? (
                <div className="flex justify-center items-center w-full h-[15rem]">
                  <ScaleLoader color={"#FF5F5F"} />
                </div>
              ) : query.isSuccess ? (
                query.data.map((product: Product) => (
                  <CartCard
                    key={product._id}
                    product={product}
                    setTotalPrice={setTotalPrice}
                  />
                ))
              ) : query.isError ? (
                <p>Error fetching cart</p>
              ) : null}
            </div>
            {query.isSuccess && (
              <div className="">
                <CartCheckout cart={query.data} totalPrice={totalPrice} />
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
