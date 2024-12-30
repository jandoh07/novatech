import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = () => {
  const whishlist = false;
  return (
    <div className="w-full shadow-custom py-2 rounded-md relative">
      <div>
        <Link to={"/product/12345"}>
          <img
            src="/iphone14.jpg"
            alt="iphone 14"
            className="h-[150px] md:h-[200px] mx-auto"
          />
        </Link>
      </div>
      {whishlist ? (
        <div className="absolute top-2 right-2 rounded-full p-[0.3rem] hover:bg-secondary hover:bg-opacity-35 cursor-pointer">
          <FaHeart className="text-lg text-secondary" />
        </div>
      ) : (
        <div className="absolute top-2 right-2 bg-secondary opacity-50 rounded-full p-[0.3rem] hover:opacity-80 cursor-pointer">
          <FaRegHeart className="text-lg text-white" />
        </div>
      )}
      <div className="px-2 mt-2">
        <Link to={"/product/12345"}>
          <p className="text-sm md:text-base">
            Apple iPhone 14, 128GB, Midnight - Unlocked (Renewed Premium)
          </p>
        </Link>
        <Link to={"/product/12345"}>
          <p className="text-xl text-secondary font-medium">$ 411.12</p>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
