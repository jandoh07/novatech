import React from "react";
import { ExtendedFile } from "../hooks/useProduct";
import { Product, Spec } from "../types/Product";
import { UseMutationResult } from "react-query";

interface ProductContextType {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  specs: Spec[];
  setSpecs: React.Dispatch<React.SetStateAction<Spec[]>>;
  images: ExtendedFile[];
  setImages: React.Dispatch<React.SetStateAction<ExtendedFile[]>>;
  getPreSignedUrl: () => Promise<void>;
  addProductMutation: UseMutationResult<void, unknown, void, unknown>;
  progress: string;
  toggleAddSpec: boolean;
  setToggleAddSpec: React.Dispatch<React.SetStateAction<boolean>>;
  discount: {
    percentage: string | number;
    expiry: string | number;
  };
  setDiscount: React.Dispatch<
    React.SetStateAction<{
      percentage: string | number;
      expiry: string | number;
    }>
  >;
}

export const ProductContext = React.createContext<
  ProductContextType | undefined
>(undefined);
