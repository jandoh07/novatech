import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Product } from "../types/Product";

interface ProductProps {
  product: Product;
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : {};
  const isInWishlist =
    user.wishlist &&
    Array.isArray(user.wishlist) &&
    user.wishlist.includes(product._id);
  return (
    <div className="w-full h-[16rem] md:h-[20rem] overflow-hidden shadow-custom py-2 rounded-md relative flex flex-col justify-between">
      <div>
        <Link to={`/product/${product._id}`}>
          <img
            src={product.imageUrl[0]}
            alt={product.name}
            className="h-[150px] md:h-[200px] mx-auto px-1 object-contain"
          />
        </Link>
      </div>
      {isInWishlist ? (
        <div className="absolute top-2 right-2 rounded-full p-[0.3rem] hover:bg-secondary hover:bg-opacity-35 cursor-pointer">
          <FaHeart className="text-lg text-secondary" />
        </div>
      ) : (
        <div className="absolute top-2 right-2 bg-secondary opacity-50 rounded-full p-[0.3rem] hover:opacity-80 cursor-pointer">
          <FaRegHeart className="text-lg text-white" />
        </div>
      )}
      <div className="px-2 mt-2 h-full flex flex-col justify-between">
        <Link to={`/product/${product._id}`}>
          <p className="text-sm md:text-base text-wrap line-clamp-2">
            {product.name}
          </p>
        </Link>
        <div className="flex justify-between items-center">
          <Link to={`/product/${product._id}`}>
            {product.discount ? (
              <p className="text-xl text-secondary font-medium">
                GHC{" "}
                {product.price -
                  product.price * (product.discount.percentage / 100)}
              </p>
            ) : (
              <p className="text-xl text-secondary font-medium">
                GHC {product.price}
              </p>
            )}
          </Link>
          {product.stock <= 5 && product.discount ? (
            <>
              <p className="text-sm text-red-500">
                {product.discount.percentage}% off
              </p>
              <p className="text-red-500 text-sm">Only {product.stock} left</p>
            </>
          ) : product.discount ? (
            <p className="text-sm text-red-500">
              {product.discount.percentage}% off
            </p>
          ) : product.stock <= 5 ? (
            <p className="text-red-500 text-sm">Only {product.stock} left</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
