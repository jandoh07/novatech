import { useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Header = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  return (
    <>
      <NavBar
        toggleSidebar={toggleSidebar}
        setToggleSidebar={setToggleSidebar}
      />
      <SideBar
        toggleSidebar={toggleSidebar}
        setToggleSidebar={setToggleSidebar}
      />
    </>
  );
};

export default Header;
