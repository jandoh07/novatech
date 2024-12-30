import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import SearchSection from "../components/HomePage/SearchSection";
import TopCategories from "../components/HomePage/TopCategories";
import ProductCard from "../components/ProductCard";

const range = (size: number) => [...Array(size).keys()];

const Home = () => {
  return (
    <div className="min-h-[100svh] flex flex-col justify-between">
      <div>
        <Header />
        <SearchSection />
        <TopCategories />
        <div className="w-[95%] md:w-[80%] mx-auto mt-10">
          <p className="text-2xl font-semibold my-4">Explore Our Products</p>
          <div className="grid grid-cols-2 md:grid-cols-4 justify-between items-center gap-2 md:gap-5">
            {range(12).map((i) => (
              <ProductCard key={i} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
