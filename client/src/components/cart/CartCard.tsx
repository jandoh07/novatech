import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Product } from "../../types/Product";
import useCart from "../../hooks/useCart";
import { Link } from "react-router-dom";
interface CartCardProps {
  product: Product;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

const CartCard: React.FC<CartCardProps> = ({ product, setTotalPrice }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { removeFromCart } = useCart();
  const range = Array.from({ length: product.stock }, (_, i) => i + 1);

  const handleProductQuantity = (value: string, price: number) => {
    setTotalPrice(
      (prev) => prev - product.price * quantity + price * parseInt(value)
    );
    setQuantity(parseInt(value));
  };

  return (
    <div className="h-[7rem] border border-tertiary rounded overflow-hidden p-1 flex justify-between items-center shadow-lg">
      <div className="h-full flex gap-2 items-center">
        <Link to={`/product/${product._id}`} className="w-[7rem] shrink-0">
          <img
            src={product.imageUrl[0]}
            alt={product.name}
            className="h-[6.5rem] object-contain mx-auto"
          />
        </Link>
        <div>
          <Link to={`/product/${product._id}`}>
            <p className="line-clamp-2">{product.name}</p>
          </Link>
          <div className="flex justify-between items-center">
            <p className="font-medium">GHC {product.price * quantity}</p>
            <select
              className="border border-tertiary rounded p-1 outline-none"
              value={quantity}
              onChange={(e) =>
                handleProductQuantity(e.target.value, product.price)
              }
            >
              {range.map((num) => (
                <option value={num} key={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="ml-3 shrink-0 justify-self-start h-full">
        <div
          className="cursor-pointer"
          onClick={() => removeFromCart(product._id!)}
        >
          <IoMdClose className="text-lg" />
        </div>
      </div>
    </div>
  );
};

export default CartCard;
