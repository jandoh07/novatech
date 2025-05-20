import { useState } from "react";
import {
  IoMdArrowDropdown,
  IoMdClose,
  IoMdHeartEmpty,
  IoMdMenu,
} from "react-icons/io";
import {
  IoCartOutline,
  IoPersonOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { customAxios } from "../../axios/axios";
import useValidateUser from "../../hooks/useValidateUser";
import { useCartStore, useUserStore } from "../../zustand/store";
import { useQuery } from "react-query";
import { ScaleLoader } from "react-spinners";

interface NavBarProps {
  toggleSidebar: boolean;
  setToggleSidebar: (value: boolean) => void;
}

const NavBar = ({ toggleSidebar, setToggleSidebar }: NavBarProps) => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [search, setSearch] = useState("");
  const { user, isAdmin, setIsAdmin } = useValidateUser();
  const { logout } = useUserStore();
  const { set_cart } = useCartStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await customAxios.post("/auth/logout");

    logout();
    setIsAdmin(false);
    set_cart([]);
  };

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

  const handleSearch = () => {
    setToggleSearch(false);
    navigate(`/search?query=${search}`);
  };

  return (
    <div className="border-b-2 border-tertiary py-2">
      <div className="custom-container flex items-center justify-between">
        <div
          className={`flex items-center gap-2 ${
            toggleSearch ? "hidden md:flex" : null
          }`}
        >
          <div
            className="cursor-pointer"
            onClick={() => setToggleSidebar(!toggleSidebar)}
          >
            <IoMdMenu className="text-2xl" />
          </div>
          <Link to={"/"} className="text-3xl cursor-pointer">
            NovaTech
          </Link>
        </div>
        {toggleSearch ? (
          <div className="rounded-lg w-full ml-2">
            <div className="border border-secondary flex items-center rounded-lg overflow-hidden pr-1">
              <input
                type="text"
                placeholder="Search for products"
                className="w-full px-2 py-1 outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                autoFocus={true}
              />
              <IoMdClose
                className="text-lg cursor-pointer"
                onClick={() => setToggleSearch(false)}
              />
            </div>
            <div className="relative z-50">
              <div className="absolute top-0 left-0 w-full bg-white">
                {getSuggestions.isLoading && (
                  <div className="flex justify-center items-center w-full h-[5rem]">
                    <ScaleLoader color={"#FF5F5F"} />
                  </div>
                )}
                {getSuggestions.isSuccess && (
                  <div className="text-gray-700">
                    {getSuggestions.data.map((suggestion: string) => (
                      <Link
                        to={`/search?query=${suggestion}`}
                        key={suggestion}
                        onClick={() => setToggleSearch(false)}
                      >
                        <div className="cursor-pointer px-2 py-1 hover:bg-gray-100 border-b border-gray-300">
                          {suggestion}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            {user ? (
              <div className="relative group">
                <div className="flex items-end cursor-pointer">
                  <IoPersonOutline className="text-xl" />
                  <IoMdArrowDropdown />
                </div>
                <div className="absolute top-5 left-0 bg-white pb-1 pt-3 rounded hidden group-hover:block hover:block">
                  <p className="hover:bg-slate-200 px-2 cursor-pointer">
                    Account
                  </p>
                  <hr />
                  <p
                    className="hover:bg-slate-200 px-2 cursor-pointer"
                    onClick={() => handleLogout()}
                  >
                    Log Out
                  </p>
                </div>
              </div>
            ) : (
              <button className="bg-secondary py-1 px-3 rounded-2xl text-white font-medium hover:opacity-75">
                <Link to={"/login"}>Sign In</Link>
              </button>
            )}
            <div>
              <IoSearchOutline
                className="text-xl cursor-pointer"
                onClick={() => setToggleSearch(true)}
              />
            </div>
            {isAdmin ? (
              <p className="bg-secondary px-2 py-1 rounded text-white cursor-pointer">
                <Link to={"/dashboard"}>Dashboard</Link>
              </p>
            ) : (
              <>
                <Link to={"/wishlist"} className="text-xl cursor-pointer">
                  <IoMdHeartEmpty />
                </Link>
                <Link to={"/cart"} className="text-xl cursor-pointer">
                  <IoCartOutline />
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
