import { FaRegUserCircle, FaRegEdit, FaSearch } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { MdFeedback, MdKeyboardCommandKey } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { displayAddPostCard } from "../../features/addPostCardSlice";
import { TbActivityHeartbeat, TbLogout2 } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa6";
import { filterByTopic } from "../../features/postSlice";
import { displaySearchBar } from "../../features/addPostCardSlice";
import { useSwipeable } from "react-swipeable";
import { useFetchUser } from "../../custom-hooks/useFetchUser";
import Asidebar from "../sidebar/Asidebar";
import PropTypes from "prop-types";
import NotificationBox from "../notification/NotificationBox";
import { GrHomeRounded } from "react-icons/gr";
import { toast } from "react-toastify";

const Header = ({ socket }) => {
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

  // console.log("socket header",socket);

  const hideProfileref = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        hideProfileref.current &&
        !hideProfileref.current.contains(event.target)
      ) {
        setShowDropdown((prevState) => !prevState);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isGuest");
    setTimeout(() => {
      window.location.href = "https://masklabs.vercel.app";
    }, 100);
  };

  const handleToggleEvent = () => {
    if (localStorage.getItem("isGuest") === "true") {
      toast("Please Login with college email to post on mask.", {
        className: "bg-[#161616]",
      });
      return;
    }
    dispatch(displayAddPostCard());
  };
  const handleNavigateHome = () => {
    navigate("/home");
    dispatch(filterByTopic("home"));
    setShowListsDiv(!showListsDiv);
  };

  const handleProfile = () => {
    if (localStorage.getItem("isGuest") === "true") {
      toast("Please Login with college email to view profile", {
        className: "bg-[#161616]",
      });
      return;
    }
    navigate("/profile/");
  };
  const handleBookMarks = () => {
    if (localStorage.getItem("isGuest") === "true") {
      toast("Please Login with college email to view bookmarks", {
        className: "bg-[#161616]",
      });
      return;
    }
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
  // console.log("socket", socket);

  return (
    <div className="bg-[#1C1C1C] w-full z-20 sticky top-0 h-[10vh] sm:h-[12vh] py-4 px-6  flex items-center justify-between  border-b-[1px] border-[#282828] text-[#9B9B9B] ">
      <div className="logohome w-10/12 flex items-center   sm:space-x-4 gap-2 md:gap-5">
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
        <div className="md:hidden w-full  sm:hidden  flex items-center   justify-end">
          <NotificationBox socket={socket} />
        </div>
      </div>
      <div className="hidden  md:flex md:gap-3 md:items-center md:space-x-4 ">
        <FaRegEdit
          onClick={handleToggleEvent}
          className="  text-2xl cursor-pointer transition-transform transform hover:text-[#FFFFFF] "
        />
        {localStorage.getItem("isGuest") === "true" ? (
          <div
            onClick={() => {
              navigate("/login");
              localStorage.removeItem("isGuest");
              localStorage.removeItem("token");
            }}
            className="text-lg flex gap-1 items-center cursor-pointer transition-transform transform hover:text-[#FFFFFF] rounded-2xl border-[1px] border-[#d1d1d1] px-2 py-[0.5px] hover:border-[#FFFFFF]"
          >
            <FaRegUserCircle />
            <span className=" whitespace-nowrap"> Sign in</span>
          </div>
        ) : (
          <div
            className="text-2xl cursor-pointer transition-transform transform hover:text-[#FFFFFF]"
            onClick={toggleDropdown}
          >
            <FaRegUserCircle />
            {showDropdown && (
              <div
                ref={hideProfileref}
                className="absolute top-10 -right-14 text-base w-40 h-auto flex flex-col items-center rounded-lg bg-[#1C1C1C] overflow-hidden "
              >
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
        )}
        <NotificationBox socket={socket} />

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
              <div
                onClick={handleNavigateHome}
                className="flex items-center gap-2"
              >
                <GrHomeRounded />
                <span className="font-semibold">Home</span>
              </div>
              <div onClick={handleProfile} className="flex items-center gap-2">
                <FaRegUserCircle />
                <span className="font-semibold">Profile</span>
              </div>
              <div
                onClick={handleToggleSearch}
                className="flex items-center gap-2"
              >
                <FaSearch className=" font-semibold" />
                <span className="font-semibold">Search</span>
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
      {/* {
        openNoti &&(
          <NotificationBox socket={socket} userId={userId}/>
        )
      } */}
    </div>
  );
};

Header.propTypes = {
  socket: PropTypes.object.isRequired,
  // senderName: PropTypes.string.isRequired,
};

export default Header;
