import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface FilterItemProps {
  items: string[];
  title: string;
  width: string;
}

const FilterItem: React.FC<FilterItemProps> = ({ items, title, width }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  return (
    <div
      className={`bg-secondary text-white ${
        toggle ? "rounded-t" : "rounded"
      } ${width}`}
    >
      <div
        className="flex items-center justify-center gap-1 cursor-pointer px-2"
        onClick={() => setToggle(!toggle)}
      >
        {title} <IoIosArrowDown className="" />
      </div>
      <div className="relative">
        {toggle && (
          <div className="absolute top-0 left-0 bg-secondary text-white p-2 z-50 space-y-2 rounded-b w-full">
            {items.map((item) => (
              <div key={item} className="flex items-center gap-2 pl-2">
                <input
                  type="checkbox"
                  className="text-secondary form-checkbox"
                  id={item}
                  value={item}
                  onChange={(e) =>
                    setSelectedItems([...selectedItems, e.target.value])
                  }
                  checked={selectedItems.includes(item)}
                />
                <label htmlFor={item}>{item}</label>
              </div>
            ))}
            <button className=" w-full text-white rounded mt-2">Apply</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterItem;
