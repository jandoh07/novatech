import { useQuery } from "react-query";
import { customAxios } from "../../../axios/axios";
import { ScaleLoader } from "react-spinners";
import { Product } from "../../../types/Product";
import ProductCardDashboard from "./ProductCardDashboard";
import Pagination from "../../Pagination";
import { useSearchParams } from "react-router-dom";
import ProductImageSection from "../AddNewProduct/ProductImageSection";
import { useContext, useState } from "react";
import ProductInputField from "../AddNewProduct/ProductInputField";
import { ProductContext } from "../../../context/ProductContext";
import { IoReturnUpBack } from "react-icons/io5";
import ProductSpecifcation from "../AddNewProduct/ProductSpecification";

interface QueryStructure {
  products: Product[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

const EditProduct = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const context = useContext(ProductContext);
  const {
    setProduct,
    setDiscount,
    setSpecs,
    setImages,
    product,
    progress,
    addProductMutation,
  } = context!;
  const [page, setPage] = useState(1);
  const [description, setDescription] = useState<string | null>(null);

  const query = useQuery<QueryStructure>(
    ["products", page],
    async () => {
      const res = await customAxios.get(`/products?limit=15&page=${page}`);
      return res.data;
    },
    {
      enabled: !searchParams.get("edit"),
    }
  );

  const getEditProduct = useQuery<Product>(
    ["product", searchParams.get("edit")],
    async () => {
      const res = await customAxios.get(
        `/products/${searchParams.get("edit")}`
      );

      // setEditProduct(res.data);
      setProduct(res.data);
      setSpecs(res.data.specs || []);

      setImages(
        res.data.imageUrl.map((image: string) => ({
          url: image,
          status: "ok",
        }))
      );

      if (res.data.description) {
        setDescription(res.data.description);
      }

      if (
        res.data.discount &&
        new Date(res.data.discount.expiry).getTime() > Date.now()
      ) {
        const expiryDate = new Date(res.data.discount.expiry);
        const currentDate = new Date();
        const timeDifference = expiryDate.getTime() - currentDate.getTime();
        const daysDifference = Math.ceil(
          timeDifference / (1000 * 60 * 60 * 24)
        ); // Convert milliseconds to days

        setDiscount({
          percentage: res.data.discount.percentage,
          expiry: daysDifference,
        });
      }

      return res.data;
    },
    {
      enabled: !!searchParams.get("edit"),
      refetchOnWindowFocus: false,
    }
  );

  const handleBack = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("edit");
    setSearchParams(params);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct((prevData) => ({
      ...prevData!,
      category: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = searchParams.get("edit");
    addProductMutation.mutate(params);

    // if (addProductMutation.isSuccess) {
    //   setProduct(addProductMutation.data)
    // }
  };

  return (
    <div>
      {query.isLoading && !searchParams.get("edit") && (
        <div className="flex justify-center items-center w-full h-[15rem]">
          <ScaleLoader color={"#FF5F5F"} />
        </div>
      )}
      {query.isError && !searchParams.get("edit") && (
        <p>Something went wrong</p>
      )}
      {query.isSuccess && !searchParams.get("edit") && (
        <div className="p-2 md:p-5">
          <div className="mb-2">
            <p>Total Products: {query.data.totalCount}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 justify-between items-center gap-2 md:gap-5">
            {query.data?.products.map((product: Product) => (
              <ProductCardDashboard key={product._id} product={product} />
            ))}
          </div>
          <Pagination
            paginationInfo={{
              totalCount: query.data.totalCount,
              totalPages: query.data.totalPages,
              currentPage: query.data.currentPage,
            }}
            setPage={setPage}
            page={page}
          />
        </div>
      )}
      {searchParams.get("edit") && getEditProduct.isLoading && (
        <div className="flex justify-center items-center w-full h-[15rem]">
          <ScaleLoader color={"#FF5F5F"} />
        </div>
      )}
      {searchParams.get("edit") && getEditProduct.isError && (
        <p>Something went wrong</p>
      )}
      {searchParams.get("edit") && getEditProduct.isSuccess && (
        <div className="p-4 text-tertiary md:w-[80%] mx-auto">
          <div className="text-4xl cursor-pointer" onClick={() => handleBack()}>
            <IoReturnUpBack />
          </div>
          <ProductImageSection />
          <form className="space-y-3" onSubmit={handleSubmit}>
            <ProductInputField description={description || ""} />
            <div>
              <label htmlFor="category">
                Product Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                className="w-full border border-tertiary rounded p-1"
                onChange={(e) => handleCategoryChange(e)}
                required
                value={product?.category}
              >
                <option value="">Select Category</option>
                <option value="Phones & Tablets">Phones & Tablets</option>
                <option value="Accessories">Accessories</option>
                <option value="Computers & Laptops">Computers & Laptops</option>
                <option value="Gaming">Gaming</option>
              </select>
            </div>
            <ProductSpecifcation />
            <div className="flex justify-center items-center mt-4">
              <button
                className="bg-secondary text-white py-1 px-2 rounded min-w-[7rem]"
                type="submit"
              >
                {addProductMutation.isLoading ? progress : "Update Product"}
              </button>
            </div>
          </form>
        </div>
        // <p>Success</p>
      )}
    </div>
  );
};

export default EditProduct;
