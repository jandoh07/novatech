import ProductInputField from "./ProductInputField";
import ProductSpecifcation from "./ProductSpecification";
import ProductImageSection from "./ProductImageSection";
import { useContext, useEffect, useRef } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const AddNewProduct = () => {
  const context = useContext(ProductContext);
  const {
    handleCategoryChange,
    images,
    addProductMutation,
    progress,
    setProduct,
    setSpecs,
    setDiscount,
    setImages,
  } = context!;
  const categoryRef = useRef<HTMLSelectElement>(null);
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.delete("edit");
    setSearchParams(params);
    setProduct({
      name: "",
      price: 0,
      brand: "",
      imageUrl: [],
      category: "",
      stock: 0,
    });
    setSpecs([]);
    setDiscount({
      percentage: "",
      expiry: "",
    });
    setImages([]);
  }, [setSearchParams, setProduct, setSpecs, setDiscount, setImages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (images.length === 0 || !images) {
      toast.error("Please select an image");
      return;
    }

    addProductMutation.mutate(null);

    if (addProductMutation.isSuccess) {
      if (categoryRef.current) {
        categoryRef.current.options[0].selected = true;
      }
    }
  };

  return (
    <div className="p-4 text-tertiary md:w-[80%] mx-auto">
      <ProductImageSection />
      <form className="space-y-3" onSubmit={handleSubmit}>
        <ProductInputField />
        <div>
          <label htmlFor="category">
            Product Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            className="w-full border border-tertiary rounded p-1"
            onChange={(e) => handleCategoryChange(e)}
            required
            ref={categoryRef}
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
            {addProductMutation.isLoading ? progress : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewProduct;
