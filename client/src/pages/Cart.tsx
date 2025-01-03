import CartCard from "../components/cart/CartCard";
import CartCheckout from "../components/cart/CartCheckout";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";

const Cart = () => {
  return (
    <div className="flex flex-col justify-between min-h-[100svh]">
      <div>
        <Header />
        <div className="custom-container md:flex gap-2 items-start my-2">
          <div className="w-full mb-3 md:mb-0 space-y-2">
            <CartCard />
            <CartCard />
            <CartCard />
            <CartCard />
          </div>
          <div className="">
            <CartCheckout />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
