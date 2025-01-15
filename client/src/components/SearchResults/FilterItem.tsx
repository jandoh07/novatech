import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FilterContext } from "../../context/FilterContext";

interface FilterItemProps {
  items: string[];
  title: "Brand" | "Category" | "Rating" | "Price";
  width: string;
}

const FilterItem: React.FC<FilterItemProps> = ({ items, title, width }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const filterContext = useContext(FilterContext);
  const { selectedItems, setSelectedItems } = filterContext!;
  const key: "brand" | "category" | "rating" | "price" =
    title.toLowerCase() as keyof typeof selectedItems;
  const [tempSelectedItems, setTempSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    setTempSelectedItems(selectedItems[key]);
  }, [selectedItems, key]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (tempSelectedItems.includes(value)) {
      setTempSelectedItems((prev) => prev.filter((item) => item !== value));
    } else {
      setTempSelectedItems((prev) => [...prev, value]);
    }
  };

  const handleFilter = () => {
    setSelectedItems((prev) => ({
      ...prev,
      [key]: tempSelectedItems,
    }));
    setToggle(false);
  };

  return (
    <div
      className={`bg-secondary text-white ${
        toggle ? "rounded-t" : "rounded"
      } ${width}`}
    >
      <div
        className="flex items-center justify-center gap-1 cursor-pointer px-2 py-[0.15rem]"
        onClick={() => setToggle(!toggle)}
      >
        {title}
        {toggle ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      <div className="relative">
        {toggle && (
          <div className="absolute top-0 left-0 bg-secondary text-white p-2 z-50 space-y-2 rounded-b w-full">
            {items.map((item, index) =>
              title === "Price" ? (
                <input
                  key={item}
                  className="px-1 w-full bg-secondary border border-white rounded text-white placeholder:text-white"
                  type="number"
                  placeholder={item}
                  min={1}
                  value={tempSelectedItems[index]}
                  onChange={(e) => {
                    const value = e.target.value;
                    setTempSelectedItems((prev) =>
                      index === 0 ? [value, prev[1]] : [prev[0], value]
                    );
                  }}
                />
              ) : (
                <div key={item} className="flex items-center gap-2 pl-2">
                  <input
                    type="checkbox"
                    className="text-secondary form-checkbox"
                    id={item}
                    value={title === "Rating" ? item.slice(0, 1) : item}
                    onChange={handleCheckboxChange}
                    checked={tempSelectedItems.includes(
                      title === "Rating" ? item.slice(0, 1) : item
                    )}
                  />
                  <label htmlFor={item}>{item}</label>
                </div>
              )
            )}
            <button
              className=" w-full text-white rounded mt-2"
              onClick={() => handleFilter()}
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterItem;
