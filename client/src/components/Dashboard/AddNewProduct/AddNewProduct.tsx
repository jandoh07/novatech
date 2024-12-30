import ProductInputField from "./ProductInputField";
import ProductSpecifcation from "./ProductSpecification";
import ProductImageSection from "./ProductImageSection";
import { useContext, useRef } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { toast } from "react-toastify";

const AddNewProduct = () => {
  const context = useContext(ProductContext);
  const { handleCategoryChange, images, addProductMutation, progress } =
    context!;
  const categoryRef = useRef<HTMLSelectElement>(null);

  const productInputs = [
    { name: "Name", key: "name", type: "text", required: true },
    { name: "Price (GHC)", key: "price", type: "number", required: true },
    { name: "Stock", key: "stock", type: "number", required: true },
    { name: "Brand", key: "brand", type: "text", required: true },
    { name: "Description", key: "description", type: "text", required: false },
    {
      name: "Discount (%)",
      key: "percentage",
      type: "number",
      required: false,
    },
    {
      name: "Discount Duration (days)",
      key: "expiry",
      type: "number",
      required: false,
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (images.length === 0 || !images) {
      toast.error("Please select an image");
      return;
    }

    addProductMutation.mutate();

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
        {productInputs.map((input, index) => (
          <ProductInputField
            key={index}
            name={input.name}
            type={input.type}
            productId={
              input.key as
                | "name"
                | "price"
                | "stock"
                | "brand"
                | "description"
                | "percentage"
                | "expiry"
            }
            required={input.required}
          />
        ))}
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
