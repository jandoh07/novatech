import { useQuery } from "react-query";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import SearchSection from "../components/HomePage/SearchSection";
import TopCategories from "../components/HomePage/TopCategories";
import ProductCard from "../components/ProductCard";
import { customAxios } from "../axios/axios";
import { Product } from "../types/Product";
import { ScaleLoader } from "react-spinners";

const Home = () => {
  const query = useQuery("products", async () => {
    const res = await customAxios.get("/products?limit=10");
    return res.data;
  });
  return (
    <div className="min-h-[100svh] flex flex-col justify-between">
      <div>
        <Header />
        <SearchSection />
        <TopCategories />
        <div className="custom-container mt-10">
          <p className="text-2xl font-semibold my-4">Explore Our Products</p>
          {query.isLoading && (
            <div className="flex justify-center items-center w-full h-[15rem]">
              <ScaleLoader color={"#FF5F5F"} />
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 justify-between items-center gap-2 md:gap-5">
            {query.data?.products.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
