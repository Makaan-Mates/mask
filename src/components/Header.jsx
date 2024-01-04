import {
  FaRegUserCircle,
  FaBell,
  FaRegEdit,
  FaEllipsisV,
} from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdKeyboardCommandKey } from "react-icons/md";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { displayAddPostCard } from "../features/addPostCardSlice";
import { TbActivityHeartbeat, TbLogout2 } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa6";
import { filterByTopic } from "../features/postSlice";
import { displaySearchBar } from "../features/addPostCardSlice";

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleToggleEvent = () => {
    dispatch(displayAddPostCard());
  };
  const handleNavigateHome = () => {
    navigate("/home");
    dispatch(filterByTopic("home"));
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleToggleSearch = useCallback(() => {
    dispatch(displaySearchBar(true));
  }, [dispatch]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        handleToggleSearch();
      } else if (event.key === "Escape") {
        dispatch(displaySearchBar(false));
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleToggleSearch]);

  return (
    <div className="bg-[#1C1C1C] w-full z-20 sticky top-0 h-[10vh] sm:h-[12vh] py-4 px-6  flex items-center justify-between  border-b-[1px] border-[#282828] text-[#9B9B9B] ">
      <div className="logohome w-10/12 flex items-center  space-x-2 sm:space-x-4 gap-5">
        <div
          onClick={handleNavigateHome}
          className="w-2/12 sm:w-auto text-2xl sm:text-4xl  cursor-pointer  font-bold transition-transform transform hover:scale-105 text-[#FFFFFF] flex-none"
        >
          mask
        </div>
        <div
          onClick={handleNavigateHome}
          className="hidden sm:block text-base px-1  sm:px-2 py-1 font-semibold hover:text-[#FFFFFF] rounded-md cursor-pointer flex-none"
        >
          Home{" "}
        </div>
        <div className=" hidden sm:block text-base px-2 py-1 font-semibold hover:text-[#FFFFFF] cursor-pointer rounded-md ">
          Explore
        </div>
        <div className="searchbox w-10/12 sm:w-72 px-3 sm:px-4 py-2 mx-4 rounded-full  flex items-center justify-between bg-[#1C1C1C] border-[1px]  border-[#282828] hover:border-[#363636] ">
        <div className="w-full" onClick={handleToggleSearch}>
          Search
        </div>
        <div className="hidden sm:flex  items-center border-[1px] border-[#363636] rounded-md text-sm px-1 ">
          <MdKeyboardCommandKey
            onClick={handleToggleSearch}
            className=" text-[#9B9B9B]  "
          />
          <span>K</span>
        </div>
      </div>
      </div>
      
      <div className="lists  hidden md:flex gap-3 items-center space-x-4 ">
        <FaRegEdit
          onClick={handleToggleEvent}
          className="text-2xl cursor-pointer transition-transform transform hover:text-[#FFFFFF] "
        />
        <div
          className="text-2xl cursor-pointer transition-transform transform hover:text-[#FFFFFF]"
          onClick={toggleDropdown}
        >
          <FaRegUserCircle />
          {showDropdown && (
            <div className="absolute top-10 -right-14 text-base w-40 h-auto flex flex-col items-center  rounded-lg bg-[#1C1C1C] overflow-hidden ">
              <span
                onClick={handleProfile}
                className="w-full h-9 flex justify-center items-center px-2 py-2 text-center font-semibold  bg-[#292929] text-[#9B9B9B] hover:bg-[#2e2e2e] cursor-pointer"
              >
                <FaRegUserCircle className="mr-1" />
                Profile
              </span>
              <span className="w-full h-9 flex justify-center items-center px-2 py-2 text-center font-semibold  bg-[#292929] text-[#9B9B9B] hover:bg-[#2e2e2e] cursor-pointer">
                <FaRegBookmark className="mr-1" />
                Bookmarks
              </span>
              <span className="w-full h-9 flex justify-center items-center px-2 py-2 text-center font-semibold  bg-[#292929] text-[#9B9B9B] hover:bg-[#2e2e2e] cursor-pointer">
                <TbActivityHeartbeat className="mr-1" />
                Activity
              </span>
              <span
                onClick={handleLogOut}
                className="w-full h-10 flex justify-center items-center px-2 py-2 text-center font-semibold border-[1px] border-[#1B1B1B] bg-[#292929] text-[#9B9B9B] hover:bg-[#982c2c] hover:text-white cursor-pointer text-lg"
              >
                <TbLogout2 className="mr-1" />
                Logout
              </span>
            </div>
          )}
        </div>
        <FaBell className="text-2xl cursor-pointer transition-transform transform hover:text-[#FFFFFF]" />
        <FaEllipsisV className="text-2xl cursor-pointer transition-transform transform hover:text-[#FFFFFF]" />
      </div>
      <div className="hamburger  flex gap-3  space-x-4  md:hidden cursor-pointer ">
        <RxHamburgerMenu className="text-2xl" />
      </div>
    </div>
  );
};

export default Header;
