import { useQuery, useQueryClient } from "react-query";
import { customAxios } from "../axios/axios";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import { useUserStore } from "../zustand/store";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { Product } from "../types/Product";
import { MdClose } from "react-icons/md";
import useWishlist from "../hooks/useWishlist";

const Wishlist = () => {
  const { user } = useUserStore();
  const { removeFromWishlist } = useWishlist();
  const queryClient = useQueryClient();

  const query = useQuery("wishlist", async () => {
    if (user && user.wishlist.length > 0) {
      const res = await customAxios.get(`/products/${user.wishlist.join(",")}`);

      if (res.data?.length) {
        return res.data;
      } else {
        return [res.data];
      }
    }
    return [];
  });

  const handleProductRemoval = (productId: string) => {
    if (user) {
      removeFromWishlist(productId);

      queryClient.setQueryData("wishlist", (data: Product[] | undefined) => {
        if (!data) return [];
        return data.filter((product) => product._id !== productId);
      });
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-[100svh]">
      <div>
        <Header />
        <div className="custom-container">
          {!user ? (
            <p className="text-lg mt-5 text-center">Login to access wishlist</p>
          ) : user.wishlist.length === 0 ? (
            <p className="text-lg mt-5 text-center">No product in wishlist</p>
          ) : null}

          {query.isLoading && user && user.wishlist.length > 0 && (
            <div className="flex justify-center items-center w-full h-[15rem]">
              <ScaleLoader color={"#FF5F5F"} />
            </div>
          )}

          {query.isSuccess && user && user.wishlist.length > 0 && (
            <>
              <p className="text-lg font-medium mt-5 mb-2">
                Products in wish list
              </p>
              {query.data.map((product: Product) => (
                <div
                  className="h-full flex justify-between gap-2 items-start border border-tertiary rounded overflow-hidden p-1 shadow-lg mb-2"
                  key={product._id}
                >
                  <div className="flex gap-2 items-center">
                    <Link
                      to={`/product/${product._id}`}
                      className="w-[7rem] shrink-0"
                    >
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
                        <p className="font-medium">GHC {product.price}</p>
                        <p
                          className={`text-sm ${
                            product.stock <= 5 && "text-red-500 "
                          }`}
                        >
                          {product.stock} left in stock
                        </p>
                      </div>
                    </div>
                  </div>
                  <MdClose
                    className="text-lg cursor-pointer shrink-0"
                    onClick={() => handleProductRemoval(product._id!)}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {query.isError && <p>Error fetching wishlist</p>}
      <Footer />
    </div>
  );
};

export default Wishlist;
