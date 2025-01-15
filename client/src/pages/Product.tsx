import { Link, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { FaHeart, FaRegHeart, FaRegStar } from "react-icons/fa";
import { customAxios } from "../axios/axios";
import { useQuery } from "react-query";
import { useState } from "react";
import { Spec } from "../types/Product";
import { ScaleLoader } from "react-spinners";
import { useCartStore, useUserStore } from "../zustand/store";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

const Product = () => {
  const { id } = useParams();
  const { user } = useUserStore();
  const { cart } = useCartStore();
  const [currentImage, setCurrentImage] = useState<string>("");
  const { addToCart, removeFromCart } = useCart();
  const isInWishlist = user && id && user.wishlist.includes(id);
  const isInCart = user && id && (user.cart.includes(id) || cart.includes(id));
  const { addToWishlist, removeFromWishlist } = useWishlist();

  const query = useQuery("product", async () => {
    const res = await customAxios.get(`/products/${id}`);
    setCurrentImage(res.data.imageUrl[0]);
    return res.data;
  });

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <Header />
        {query.isLoading ? (
          <div className="mt-8 flex justify-center items-center w-full">
            <ScaleLoader color={"#FF5F5F"} />
          </div>
        ) : query.isSuccess ? (
          <div className="custom-container">
            <div className="md:grid grid-cols-2 gap-2 my-4">
              <div className="w-full flex flex-col-reverse md:flex-row items-start gap-2 md:gap-4">
                <div className="space-y-2">
                  {query.data?.imageUrl.map((url: string, index: number) => (
                    <div
                      className={`${
                        currentImage === url && "border border-tertiary"
                      } size-[3.2rem] md:size-[3.5rem] rounded shadow-custom p-1 cursor-pointer`}
                      key={index}
                      onClick={() => setCurrentImage(url)}
                    >
                      <img
                        src={url}
                        alt={query.data?.name}
                        className="object-contain h-full mx-auto"
                      />
                    </div>
                  ))}
                </div>
                <div className="mx-auto">
                  <img
                    src={currentImage || query.data?.imageUrl[0]}
                    alt={query.data?.name}
                    className="h-[400px] md:h-[500px] object-contain"
                  />
                </div>
              </div>
              <div className="w-full mt-4 md:mt-0 min-h-[350px] flex flex-col justify-start">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-2xl font-medium">{query.data?.name}</p>
                    {isInWishlist ? (
                      <FaHeart
                        className="shrink-0 text-2xl text-secondary cursor-pointer"
                        onClick={() => removeFromWishlist(query.data._id)}
                      />
                    ) : (
                      <FaRegHeart
                        className="shrink-0 text-2xl text-secondary cursor-pointer"
                        onClick={() => addToWishlist(query.data._id)}
                      />
                    )}
                  </div>
                  <div className="font-medium my-2">
                    <Link to={""} className="text-blue-500">
                      {query.data?.brand}
                    </Link>{" "}
                    |{" "}
                    <Link to={""} className="text-blue-500">
                      {query.data?.category}
                    </Link>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 md:gap-2 text-xl text-secondary my-2">
                      {query.data?.rating.count === 0 ? (
                        <>
                          <FaRegStar />
                          <FaRegStar />
                          <FaRegStar />
                          <FaRegStar />
                          <FaRegStar />
                          <span className="text-base">No ratings yet</span>
                        </>
                      ) : (
                        <p>ratings available ({query.data?.rating.count})</p>
                      )}
                      {/* <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStar />
                  (222) */}
                    </div>
                    <p className="text-2xl font-medium text-secondary">
                      GH₵ {query.data?.price}
                    </p>
                  </div>
                  <div className="mb-2">
                    <p className="font-medium my-1 text-lg">Product Specs</p>
                    {query.data?.specs?.map((spec: Spec) => (
                      <p key={spec.key}>
                        <span className="font-medium">{spec.key}</span>:{" "}
                        {spec.value}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  {isInCart ? (
                    <button
                      className="bg-secondary rounded p-1 text-white font-medium w-full"
                      onClick={() => removeFromCart(id)}
                    >
                      Remove From Cart
                    </button>
                  ) : (
                    <button
                      className="bg-secondary rounded p-1 text-white font-medium w-full"
                      onClick={() => id && addToCart(id)}
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
            {query.data?.description && (
              <div className="mt-[3rem]">
                <p className="font-medium text-lg mb-1">Product Description</p>
                <p>{query.data?.description}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center">Error loading product data</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Product;
