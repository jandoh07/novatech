import { useContext, useEffect } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

interface ProductInputFieldProps {
  name: string;
  type: string;
  required: boolean;
  productId:
    | "name"
    | "price"
    | "stock"
    | "brand"
    | "description"
    | "percentage"
    | "expiry";
}

const ProductInputField: React.FC<ProductInputFieldProps> = ({
  name,
  type,
  required,
  productId,
}) => {
  const context = useContext(ProductContext);
  const { setProduct, product, discount, setDiscount } = context!;
  const { quill, quillRef } = useQuill();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      quill.on("text-change", () => {
        setProduct((prevData) => ({
          ...prevData,
          description: quill.root.innerHTML,
        }));
      });
    }
  }, [quill, setProduct]);

  return (
    <div>
      <label htmlFor={productId}>
        {name}
        {required && <span className="text-red-500">*</span>}
      </label>
      {productId === "description" ? (
        <div ref={quillRef} className="min-h-32"></div>
      ) : (
        <input
          type={type}
          id={productId}
          required={required}
          min={0}
          className="w-full border border-tertiary rounded p-1"
          onChange={handleInputChange}
          value={
            productId === "percentage"
              ? discount.percentage
              : productId === "expiry"
              ? discount.expiry
              : product[productId] === 0
              ? ""
              : product[productId]
          }
        />
      )}
    </div>
  );
};

export default ProductInputField;
