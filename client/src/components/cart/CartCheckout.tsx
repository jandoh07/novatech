const CartCheckout = () => {
  return (
    <div className="border border-tertiary rounded min-h-[15rem] w-full md:w-[15rem] p-3 text-md flex flex-col justify-evenly">
      <div className="flex justify-between items-center">
        <p className="font-medium">Total Items</p>
        <p>4</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-medium">Delivery</p>
        <p>GHC 250</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-medium">Total Price</p>
        <p>GHC 9888</p>
      </div>
      <div>
        <p className="font-medium">Have discount coupon?</p>
        <input
          type="text"
          placeholder="Enter coupon code"
          className="w-full border border-tertiary rounded p-1"
        />
      </div>
      <button className="w-full bg-secondary text-white p-2 rounded mt-2">
        Checkout
      </button>
    </div>
  );
};

export default CartCheckout;
