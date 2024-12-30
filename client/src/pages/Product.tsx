import { Link, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { FaHeart, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";

const Product = () => {
  const { id } = useParams();
  const whishlist = true;
  // const specs = {
  //   Operating Systems: "IOS 16",
  //   Display: "6.1 inches",
  //   Camera: "12MP",
  //   Battery: "4000mAh",
  //   RAM: "4GB",
  //   Storage: "128GB",
  //   Cellular: "5G",
  // };
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <Header />
        <div className="w-[95%] md:w-[80%] mx-auto md:grid grid-cols-2 gap-2 my-4">
          <div className="w-full flex items-start gap-4">
            <div className="space-y-2">
              <div className="size-[3.5rem] rounded shadow-custom p-1">
                <img
                  src="/iphone14.jpg"
                  alt=""
                  className="object-contain h-full mx-auto"
                />
              </div>
              <div className="size-[3.5rem] opacity-70 rounded">
                <img
                  src="/iphone14.jpg"
                  alt=""
                  className="object-contain h-full mx-auto"
                />
              </div>
              <div className="size-[3.5rem] opacity-70 rounded">
                <img
                  src="/iphone14.jpg"
                  alt=""
                  className="object-contain h-full mx-auto"
                />
              </div>
              <div className="size-[3.5rem] opacity-70 rounded">
                <img
                  src="/iphone14.jpg"
                  alt=""
                  className="object-contain h-full mx-auto"
                />
              </div>
            </div>
            <div>
              <img
                src="/iphone14.jpg"
                alt=""
                className="h-[400px] md:h-[650px] object-contain"
              />
            </div>
          </div>
          <div className="w-full mt-4 md:mt-0 min-h-[350px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-2xl font-medium">
                  Apple iPhone 14, 128GB, Midnight - Unlocked (Renewed Premium)
                </p>
                {whishlist ? (
                  <FaHeart className="shrink-0 text-2xl text-secondary" />
                ) : (
                  <FaRegHeart className="shrink-0 text-2xl text-secondary" />
                )}
              </div>
              <div className="font-medium my-2">
                <Link to={""} className="text-blue-500">
                  Apple
                </Link>{" "}
                |{" "}
                <Link to={""} className="text-blue-500">
                  Phones & Tablets
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xl text-secondary my-2">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStar />
                  (222)
                </div>
                <p className="text-2xl font-medium text-secondary">$411.12</p>
              </div>
              <div className="">
                <p>
                  <span className="font-medium">Operating System</span>: iOS 16
                </p>
                <p>
                  <span className="font-medium">Operating System</span>: iOS 16
                </p>
                <p>
                  <span className="font-medium">Operating System</span>: iOS 16
                </p>
              </div>
            </div>
            <div className="bg-secondary rounded p-1 text-white font-medium text-center cursor-pointer">
              <p>Add To Cart</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
