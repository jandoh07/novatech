import { IoSearch } from "react-icons/io5";

const SearchSection = () => {
  return (
    <div className="bg-secondary h-[300px]">
      <div className="w-[95%] md:w-[80%] mx-auto h-full flex flex-col items-center justify-center">
        <div className="flex items-center bg-accent rounded h-[50px] w-full md:w-[60%] overflow-hidden pr-1">
          <input
            type="text"
            className="h-full w-full outline-none bg-transparent px-2 text-white text-lg placeholder:text-white"
            placeholder="Search for products"
          />
          <IoSearch className="text-4xl text-white" />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
