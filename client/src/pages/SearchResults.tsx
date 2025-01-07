import { useSearchParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { useQuery } from "react-query";
import { customAxios } from "../axios/axios";
import { ScaleLoader } from "react-spinners";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/Product";
import { IoFilterSharp } from "react-icons/io5";
import { useState } from "react";
import Filter from "../components/SearchResults/Filter";
import { MdClose } from "react-icons/md";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("query");
  // const [filter, setFilter] = useState<string>("");
  const [toggleFilter, setToggleFilter] = useState<boolean>(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const query = useQuery(
    ["search", searchTerm],
    async () => {
      const res = await customAxios.get(`/search/${searchTerm}?limit=10`);
      const brand = new Set<string>();
      const category = new Set<string>();

      res.data.map((product: Product) => {
        brand.add(product.brand);
        category.add(product.category);
      });

      setBrands(Array.from(brand));
      setCategories(Array.from(category));

      return res.data;
    },
    {
      enabled: searchTerm !== "",
    }
  );

  return (
    <div className="flex flex-col min-h-[100svh] justify-between">
      <div>
        <Header />
        <div className="">
          <div className="custom-container">
            {query.isLoading && (
              <div className="flex justify-center items-center w-full h-[15rem]">
                <ScaleLoader color={"#FF5F5F"} />
              </div>
            )}
            {query.isSuccess && (
              <div className="">
                <div className="flex justify-between items-center mt-5">
                  <p>Showing results for "{searchTerm}"</p>
                  <div
                    className={`flex gap-2 items-center ${
                      toggleFilter
                        ? "bg-secondary text-white"
                        : "border border-tertiary"
                    } rounded-2xl px-2 cursor-pointer`}
                    onClick={() => setToggleFilter(!toggleFilter)}
                  >
                    <p>Filter</p>
                    {toggleFilter ? <MdClose /> : <IoFilterSharp />}
                  </div>
                </div>
                {toggleFilter && (
                  <div className="">
                    <Filter
                      setToggleFilter={setToggleFilter}
                      brands={brands}
                      categories={categories}
                    />
                  </div>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-5">
                  {query.data.length === 0 && (
                    <div className="text-center w-full">No products found</div>
                  )}
                  {query.data.map((product: Product) => (
                    <ProductCard product={product} key={product._id} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
