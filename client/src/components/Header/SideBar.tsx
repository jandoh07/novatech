import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

interface SideBarProps {
  toggleSidebar: boolean;
  setToggleSidebar: (value: boolean) => void;
}

const SideBar = ({ toggleSidebar, setToggleSidebar }: SideBarProps) => {
  return (
    <div
      className={`fixed top-0 left-0 h-screen z-50 overflow-hidden flex ${
        toggleSidebar ? "w-full" : "w-0"
      } transition-[width]`}
    >
      <div className="w-[250px] h-full p-2 bg-white shadow-lg shrink-0">
        <div
          className="flex justify-end p-2 cursor-pointer"
          onClick={() => setToggleSidebar(!toggleSidebar)}
        >
          <IoMdClose className="text-2xl" />
        </div>
        <p className="text-lg font-medium my-2">Categories</p>
        <div className="flex flex-col gap-3 pl-2">
          <Link to={`/search?query=${encodeURIComponent("Phones & Tablets")}`}>
            Phones & Tablets
          </Link>
          <Link
            to={`/search?query=${encodeURIComponent("Computers & Laptops")}`}
          >
            Computers & Laptops
          </Link>
          <Link to={`/search?query=${encodeURIComponent("Accessories")}`}>
            Accessories
          </Link>
          <Link to={`/search?query=${encodeURIComponent("Gaming")}`}>
            Gaming
          </Link>
        </div>
      </div>
      <div
        className="w-full h-full bg-transparent"
        onClick={() => setToggleSidebar(false)}
      ></div>
    </div>
  );
};

export default SideBar;
