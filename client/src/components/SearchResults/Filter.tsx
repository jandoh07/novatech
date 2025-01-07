import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import FilterItem from "./FilterItem";

interface FilterProps {
  setToggleFilter: React.Dispatch<React.SetStateAction<boolean>>;
  brands: string[];
  categories: string[];
}

const Filter: React.FC<FilterProps> = ({
  setToggleFilter,
  brands,
  categories,
}) => {
  const rating = ["1 star", "2 stars", "3 stars", "4 stars", "5 stars"];
  const ram = ["4GB", "8GB", "12GB", "16GB", "32GB", "64GB"];
  const price = [
    "Less than GHC50",
    "GHC50 - 100",
    "GHC100 - 200",
    "GHC200 - 500",
    "More than GHC500",
  ];
  const screenSizePhone = ["6.1 inches"];
  const screenSizeLaptop = [
    "13.3 inches",
    "14 inches",
    "15.6 inches",
    "17 inches",
  ];

  return (
    <div className="flex items-center gap-2">
      <FilterItem items={brands} title="Brands" width="w-[6rem]" />
      <FilterItem items={categories} title="Category" width="w-[8rem]" />
      <FilterItem items={ram} title="Ram" width="w-[5rem]" />
      <FilterItem items={rating} title="Ratings" width="w-[6rem]" />
      <FilterItem
        items={[...screenSizePhone, ...screenSizeLaptop]}
        title="Screen Size"
        width="w-[8rem]"
      />
      {/* <FilterItem items={price} title="Price" width="w-[9rem]" /> */}
    </div>
  );
};

export default Filter;
