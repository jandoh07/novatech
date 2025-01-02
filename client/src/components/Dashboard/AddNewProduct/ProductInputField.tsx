import { useContext } from "react";
import { ProductContext } from "../../../context/ProductContext";

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
  return (
    <div>
      <label htmlFor={productId}>
        {name}
        {required && <span className="text-red-500">*</span>}
      </label>
      {productId === "description" ? (
        <textarea
          id={productId}
          required={required}
          className="w-full border border-tertiary rounded p-1"
          value={product.description}
          onChange={handleInputChange}
        ></textarea>
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
