import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const CartCard = () => {
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <div className="h-[7rem] border border-tertiary rounded overflow-hidden p-1 flex justify-between items-center">
      <div className="h-full flex gap-2 items-center">
        <img src="/iphone14.jpg" alt="" className="object-contain h-full" />
        <p className="line-clamp-3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et beatae
          hic provident tempore excepturi aperiam.
        </p>
      </div>
      <div className="ml-3 h-full flex flex-col justify-between items-center shrink-0">
        <p>GHC 9888</p>
        <div className="flex gap-2 items-center">
          <FiMinus
            // onClick={() => console.log("clicked")}
            onClick={() =>
              setQuantity(quantity === 1 ? quantity : quantity - 1)
            }
            className="cursor-pointer"
          />
          <p>{quantity}</p>
          <FiPlus
            onClick={() => setQuantity(quantity + 1)}
            className="cursor-pointer"
          />
        </div>
        <IoMdClose className="text-lg" />
      </div>
    </div>
  );
};

export default CartCard;
