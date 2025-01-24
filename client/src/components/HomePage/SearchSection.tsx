import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useQuery } from "react-query";
import { customAxios } from "../../axios/axios";
import { ScaleLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";

const SearchSection = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const getSuggestions = useQuery(
    ["suggestions", search],
    async () => {
      const res = await customAxios.get(
        `/products/search/suggestions/${search}`
      );
      return res.data;
    },
    {
      enabled: search !== "",
    }
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?query=${search}`);
  };

  return (
    <div className="bg-secondary h-[300px]">
      <div className="custom-container h-full flex flex-col items-center justify-center">
        <form
          className="flex items-center bg-accent rounded h-[50px] w-full md:w-[60%] overflow-hidden pr-1"
          onSubmit={(e) => handleSearch(e)}
        >
          <input
            type="text"
            className="h-full w-full outline-none bg-transparent px-2 text-white text-lg placeholder:text-white"
            placeholder="Search for products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">
            <IoSearch className="text-4xl text-white" />
          </button>
        </form>
        {search !== "" && (
          <div className="bg-white w-full md:w-[60%] overflow-hidden min-h-max rounded-b">
            {getSuggestions.isLoading && (
              <div className="flex justify-center items-center w-full h-full">
                <ScaleLoader color={"#FF5F5F"} />
              </div>
            )}
            {getSuggestions.isError && <div>Error...</div>}
            {getSuggestions.isSuccess && (
              <div className="text-gray-700">
                {getSuggestions.data.map((suggestion: string) => (
                  <Link to={`/search?query=${suggestion}`} key={suggestion}>
                    <div className="cursor-pointer px-2 py-1 hover:bg-gray-100 border-b border-gray-300">
                      {suggestion}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSection;
