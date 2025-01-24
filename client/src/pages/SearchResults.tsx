import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { ScaleLoader } from "react-spinners";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/Product";
import { IoFilterSharp } from "react-icons/io5";
import { useState } from "react";
import Filter from "../components/SearchResults/Filter";
import { MdClose } from "react-icons/md";
import useSearchResults from "../hooks/useSearchResults";
import Pagination from "../components/Pagination";

const SearchResults = () => {
  const [toggleFilter, setToggleFilter] = useState<boolean>(false);
  const {
    searchTermQuery,
    filterQuery,
    searchTerm,
    products,
    brands,
    categories,
    paginationInfo,
    page,
    setPage,
  } = useSearchResults();

  return (
    <div className="flex flex-col min-h-[100svh] justify-between">
      <div>
        <Header />
        <div className="">
          <div className="custom-container">
            {(searchTermQuery.isLoading || filterQuery.isLoading) && (
              <div className="flex justify-center items-center w-full h-[15rem]">
                <ScaleLoader color={"#FF5F5F"} />
              </div>
            )}
            {(searchTermQuery.isSuccess || filterQuery.isSuccess) &&
              !searchTermQuery.isLoading &&
              !filterQuery.isLoading && (
                <div className="flex flex-col justify-between">
                  <div className="flex justify-between items-center mt-5">
                    <p>
                      Showing results for "{searchTerm}" (
                      {paginationInfo?.totalCount})
                    </p>
                    <div
                      className={`flex gap-2 items-center ${
                        toggleFilter
                          ? "bg-secondary text-white"
                          : "border border-tertiary"
                      } rounded-2xl px-2 py-[0.15rem] cursor-pointer`}
                      onClick={() => setToggleFilter(!toggleFilter)}
                    >
                      <p>Filter</p>
                      {toggleFilter ? <MdClose /> : <IoFilterSharp />}
                    </div>
                  </div>
                  {toggleFilter && (
                    <div className="my-2">
                      <Filter brands={brands} categories={categories} />
                    </div>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-5">
                    {products?.length === 0 && (
                      <div className="text-center w-full">
                        No products found
                      </div>
                    )}
                    {products?.map((product: Product) => (
                      <ProductCard product={product} key={product._id} />
                    ))}
                  </div>
                  <Pagination
                    paginationInfo={paginationInfo}
                    page={page}
                    setPage={setPage}
                  />
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
