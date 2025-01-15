import React, { createContext } from "react";

export interface SelectedItems {
  brand: string[];
  category: string[];
  rating: string[];
  price: [string, string] | [];
}

interface FilterContextType {
  selectedItems: SelectedItems;
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedItems>>;
}

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
);
