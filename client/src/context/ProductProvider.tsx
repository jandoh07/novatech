import useProduct from "../hooks/useProduct";
import { ProductContext } from "./ProductContext";

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const productState = useProduct();
  return (
    <ProductContext.Provider value={productState}>
      {children}
    </ProductContext.Provider>
  );
};
