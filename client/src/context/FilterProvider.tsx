import { useState } from "react";
import { FilterContext, SelectedItems } from "./FilterContext";

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    brand: [],
    category: [],
    rating: [],
    price: [],
  });

  return (
    <FilterContext.Provider
      value={{
        selectedItems,
        setSelectedItems,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
