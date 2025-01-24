import { Link, useSearchParams } from "react-router-dom";
import { Product } from "../../../types/Product";
import { MdDelete } from "react-icons/md";

interface ProductCardDashboardProps {
  product: Product;
}

const ProductCardDashboard: React.FC<ProductCardDashboardProps> = ({
  product,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isDiscountValid =
    product.discount &&
    new Date(product.discount.expiry).getTime() > Date.now();

  const handleProductDelete = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("Delete product with id: ", productId);
    }
  };

  const handleProductEdit = (productId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("edit", productId);
    setSearchParams(params);
  };

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
      {isDiscountValid && (
        <div className="absolute top-2 left-2 bg-secondary rounded p-1 text-white">
          <p>{product.discount?.percentage}% off</p>
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
            {isDiscountValid && product.discount ? (
              <p className="text-lg text-secondary font-medium">
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
          {product.stock <= 5 ? (
            <p className="text-red-500 text-sm">{product.stock} left</p>
          ) : null}
        </div>
        <div className="flex items-center gap-1">
          <div
            className="bg-secondary px-2 rounded text-white w-full text-center cursor-pointer hover:bg-accent"
            onClick={() => handleProductEdit(product._id!)}
          >
            <p>Edit</p>
          </div>
          <div
            className="text-red-500 text-center text-lg border border-red-500 rounded px-1 h-full cursor-pointer hover:bg-red-500 hover:text-white flex items-center justify-center"
            onClick={() => handleProductDelete(product._id!)}
          >
            <MdDelete />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardDashboard;
