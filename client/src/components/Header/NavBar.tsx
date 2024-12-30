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
import { Link } from "react-router-dom";
import { customAxios } from "../../axios/axios";
import useValidateUser from "../../hooks/useValidateUser";

interface NavBarProps {
  toggleSidebar: boolean;
  setToggleSidebar: (value: boolean) => void;
}

const NavBar = ({ toggleSidebar, setToggleSidebar }: NavBarProps) => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const { user, setUser, isAdmin, setIsAdmin } = useValidateUser();

  const handleLogout = async () => {
    await customAxios.post("/auth/logout");

    localStorage.removeItem("user");
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <div className="border-b-2 border-tertiary py-2">
      <div className="w-[95%] md:w-[80%] mx-auto flex items-center justify-between">
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
          <div className="flex items-center border border-secondary rounded-lg overflow-hidden pr-1 w-full ml-2">
            <input
              type="text"
              placeholder="Search for products"
              className="w-full px-2 py-1 outline-none"
            />
            <IoMdClose
              className="text-lg cursor-pointer"
              onClick={() => setToggleSearch(false)}
            />
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
                <div className="text-xl cursor-pointer">
                  <IoMdHeartEmpty />
                </div>
                <div className="text-xl cursor-pointer">
                  <IoCartOutline />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
