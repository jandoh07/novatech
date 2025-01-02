import { useQuery } from "react-query";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import SearchSection from "../components/HomePage/SearchSection";
import TopCategories from "../components/HomePage/TopCategories";
import ProductCard from "../components/ProductCard";
import { customAxios } from "../axios/axios";
import { Product } from "../types/Product";

const Home = () => {
  const query = useQuery("products", async () => {
    const res = await customAxios.get("/products?limit=8");
    return res.data;
  });
  return (
    <div className="min-h-[100svh] flex flex-col justify-between">
      <div>
        <Header />
        <SearchSection />
        <TopCategories />
        <div className="w-[95%] md:w-[80%] mx-auto mt-10">
          <p className="text-2xl font-semibold my-4">Explore Our Products</p>
          <div className="grid grid-cols-2 md:grid-cols-4 justify-between items-center gap-2 md:gap-5">
            {query.data?.map((product: Product) => (
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
