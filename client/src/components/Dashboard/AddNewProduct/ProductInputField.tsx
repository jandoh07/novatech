import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../context/ProductContext";
import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";

interface ProductInputs {
  name: string;
  key:
    | "name"
    | "price"
    | "stock"
    | "brand"
    | "description"
    | "percentage"
    | "expiry";
  type: string;
  required: boolean;
}

const ProductInputField: React.FC<{ description?: string }> = ({
  description,
}) => {
  const context = useContext(ProductContext);
  const { setProduct, product, discount, setDiscount, addProductMutation } =
    context!;
  const { quill, quillRef } = useQuill();
  const [productInputs] = useState<ProductInputs[]>([
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
  ]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    productId: string
  ) => {
    const { id, value } = e.target;

    if (productId === "percentage" || productId === "expiry") {
      setDiscount((prevData) => ({
        ...prevData,
        [id]: value,
      }));
      return;
    }

    setProduct((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    if (quill) {
      if (description) quill.root.innerHTML = description;

      if (addProductMutation.isSuccess && description)
        quill.root.innerHTML = "";

      quill.on("text-change", () => {
        setProduct((prevData) => ({
          ...prevData,
          description: quill.root.innerHTML,
        }));
      });
    }
  }, [quill, setProduct, description, addProductMutation.isSuccess]);

  const getValueKey = (
    key:
      | "name"
      | "price"
      | "stock"
      | "brand"
      | "description"
      | "percentage"
      | "expiry"
  ) => {
    if (key === "percentage") return discount.percentage;
    if (key === "expiry") return discount.expiry;
    if (!product[key]) return "";
    if (product[key] === 0) return "";
    return product[key];
  };

  return productInputs.map((input: ProductInputs) => (
    <div key={input.key}>
      <label htmlFor={input.key}>
        {input.name}
        {input.required && <span className="text-red-500">*</span>}
      </label>
      {input.key === "description" ? (
        <div ref={quillRef} className="min-h-32"></div>
      ) : (
        <input
          type={input.type}
          id={input.key}
          required={input.required}
          min={0}
          className="w-full border border-tertiary rounded p-1"
          onChange={(e) => handleInputChange(e, input.key)}
          value={getValueKey(input.key)}
        />
      )}
    </div>
  ));
};

export default ProductInputField;
