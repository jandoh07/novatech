import React from "react";
import FilterItem from "./FilterItem";

interface FilterProps {
  brands: string[];
  categories: string[];
}

const Filter: React.FC<FilterProps> = ({ brands, categories }) => {
  const rating = [
    "1 star and above",
    "2 stars and above",
    "3 stars and above",
    "4 stars and above",
    "5 stars",
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <FilterItem items={brands} title="Brand" width="w-[6rem]" />
      <FilterItem items={categories} title="Category" width="w-[8rem]" />
      <FilterItem items={rating} title="Rating" width="w-[8rem]" />
      <FilterItem items={["min", "max"]} title="Price" width="w-[6rem]" />
    </div>
  );
};

export default Filter;
