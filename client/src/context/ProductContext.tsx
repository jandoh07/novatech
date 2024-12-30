import React from "react";
import { ExtendedFile } from "../hooks/useProduct";
import { Product, Specs } from "../types/Product";
import { UseMutationResult } from "react-query";

interface ProductContextType {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  specs: Specs[];
  setSpecs: React.Dispatch<React.SetStateAction<Specs[]>>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  images: ExtendedFile[];
  setImages: React.Dispatch<React.SetStateAction<ExtendedFile[]>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  getPreSignedUrl: () => Promise<void>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  addProductMutation: UseMutationResult<void, unknown, void, unknown>;
  progress: number;
  toggleAddSpec: boolean;
  setToggleAddSpec: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProductContext = React.createContext<
  ProductContextType | undefined
>(undefined);
