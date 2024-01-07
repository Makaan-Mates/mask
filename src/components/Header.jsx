import { FaRegUserCircle, FaBell, FaRegEdit, FaSearch } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { MdFeedback, MdKeyboardCommandKey } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { displayAddPostCard } from "../features/addPostCardSlice";
import { TbActivityHeartbeat, TbLogout2 } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa6";
import { filterByTopic } from "../features/postSlice";
import { displaySearchBar } from "../features/addPostCardSlice";
import { useSwipeable } from "react-swipeable";
import { useFetchUser } from "../custom-hooks/useFetchUser";
import Asidebar from "./Asidebar";

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const [showListsDiv, setShowListsDiv] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { userInfo } = useFetchUser();
  const [showAsideBar, setShowAsideBar] = useState(false);
  const [navBarMobileStyle, setNavBarMobileStyle] = useState({
    transform: "translateX(-100%)",
  });

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
    navigate("/profile/");
  };
  const handleBookMarks = () => {
    navigate("/user/bookmarks");
  };
  const handleFeedback = () => {
    navigate("/user/feedback");
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

  //for small devices

  //to explore more
  const toggleListsDiv = () => {
    setShowListsDiv(!showListsDiv);
    setShowAsideBar(false);
    if (!showListsDiv) {
      setNavBarMobileStyle({ transform: "translateX(0)" });
    } else {
      setNavBarMobileStyle({ transform: "translateX(-100%)" });
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setShowListsDiv(false), setShowAsideBar(false);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleShowTopics = () => {
    setShowAsideBar(true);
    setShowListsDiv(false);
  };

  const hideAsideBar = () => {
    setShowAsideBar(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        <div
          onClick={() => alert("Exploration coming soon!")}
          className=" hidden md:block text-base px-2 py-1 font-semibold hover:text-[#FFFFFF] cursor-pointer rounded-md "
        >
          Explore
        </div>
        <div className="searchbox hidden sm:flex w-10/12 md:w-64 lg:w-72 px-3 sm:px-4 py-2 mx-4 rounded-full  items-center justify-between bg-[#1C1C1C] border-[1px]  border-[#282828] hover:border-[#363636] ">
          <div className="w-full" onClick={handleToggleSearch}>
            Search
          </div>
          <div className="hidden sm:flex  items-center border-[1px] border-[#363636] rounded-md text-sm px-1 ">
            <MdKeyboardCommandKey className=" text-[#9B9B9B]  " />
            <span>K</span>
          </div>
        </div>
        <div className="searchboxsmalldevice  w-full  sm:hidden  flex items-center  justify-end">
          <FaSearch
            onClick={handleToggleSearch}
            className=" text-[#9B9B9B] text-xl"
          />
        </div>
      </div>
      <div className="hidden  md:flex md:gap-3 md:items-center md:space-x-4 ">
        <FaRegEdit
          onClick={handleToggleEvent}
          className="  text-2xl cursor-pointer transition-transform transform hover:text-[#FFFFFF] "
        />
        <div
          className="text-2xl cursor-pointer transition-transform transform hover:text-[#FFFFFF]"
          onClick={toggleDropdown}
        >
          <FaRegUserCircle />
          {showDropdown && (
            <div className="absolute top-10 -right-14 text-base w-40 h-auto flex flex-col items-center rounded-lg bg-[#1C1C1C] overflow-hidden ">
              <span
                onClick={handleProfile}
                className="w-full h-9 flex justify-center items-center px-2 py-2 text-center font-semibold  bg-[#292929] text-[#9B9B9B] hover:bg-[#2e2e2e] cursor-pointer"
              >
                <FaRegUserCircle className="mr-1" />
                Profile
              </span>
              <span
                onClick={handleBookMarks}
                className="w-full h-9 flex justify-center items-center px-2 py-2 text-center font-semibold  bg-[#292929] text-[#9B9B9B] hover:bg-[#2e2e2e] cursor-pointer"
              >
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
        <FaBell onClick={()=>{alert("Coming soon, will notify you!")}} className="text-2xl cursor-pointer transition-transform transform hover:text-[#FFFFFF]" />
        <MdFeedback
          onClick={handleFeedback}
          className="text-2xl cursor-pointer transition-transform transform hover:text-[#FFFFFF]"
        />
      </div>
      <div className="hamburger  flex gap-3  space-x-4  md:hidden cursor-pointer ">
        <RxHamburgerMenu onClick={toggleListsDiv} className="text-2xl" />
      </div>
      {showAsideBar && windowWidth < 768 ? (
        <Asidebar
          customStyleAsidebarMobile={true}
          hideAsideBar={hideAsideBar}
        />
      ) : (
        showListsDiv &&
        windowWidth < 768 && (
          <div
            {...handlers}
            style={{ ...navBarMobileStyle, transition: "left 1s" }}
            className="Navbarmobile w-[65%] h-[100vh] absolute top-0 left-0 px-2 flex flex-col  space-y-4 py-5 bg-[#161616] z-50"
          >
            <div onClick={toggleListsDiv} className="flex justify-end ">
              <IoIosArrowBack className="text-2xl text-[#313131] animate-bounce-x" />
            </div>
            <div className="flex flex-col">
              <div className="mx-4  text-base font-semibold">
                {userInfo?.username}
              </div>
              <div className="mx-4  text-xs font-semibold">new</div>
            </div>
            <div className="flex flex-col mx-4 p-4 gap-4">
              <div onClick={handleProfile} className="flex items-center gap-2">
                <FaRegUserCircle />
                <span className="font-semibold">Profile</span>
              </div>
              <div
                onClick={handleBookMarks}
                className="flex items-center gap-2"
              >
                <FaRegBookmark />{" "}
                <span className="font-semibold">Bookmarks</span>
              </div>
              <div
                onClick={handleShowTopics}
                className="flex items-center gap-2"
              >
                <TbActivityHeartbeat />
                <span className="font-semibold">Topics</span>
              </div>
              <div onClick={handleFeedback} className="flex items-center gap-2">
                <MdFeedback />
                <span className="font-semibold">Feedback</span>
              </div>
              <hr className="border-b-[0.2px]  w-full  border-[#313131]"></hr>
              <div onClick={handleLogOut} className="flex  items-center gap-2">
                <TbLogout2 /> <span className="font-semibold">Logout</span>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Header;
