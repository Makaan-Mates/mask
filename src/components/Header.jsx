import { FaRegUserCircle, FaBell, FaRegEdit, FaEllipsisV,FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { displayAddPostCard } from '../features/addPostCardSlice'

const Header = () => {
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch()

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const handleLogOut = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleToggleEvent = ()=>{
    dispatch(displayAddPostCard())
  }
  const handleNavigateHome = ()=>{
    navigate('/home')
  }

  return (
    <div className="bg-[#1C1C1C] z-20 sticky top-0 h-[12vh] py-4 px-6  flex items-center justify-between  border-b-[1px] border-[#282828] text-[#9B9B9B]">
      <div className="flex items-center justify-center space-x-4 gap-5">
        <div onClick={handleNavigateHome} className="text-4xl cursor-pointer  font-bold transition-transform transform hover:scale-105 text-[#FFFFFF]">mask</div>
        <div onClick={handleNavigateHome} className="text-l cursor-pointer px-2 py-1 font-semibold hover:text-[#FFFFFF] rounded-md">Home </div>
        <div className="text-l px-2 py-1 font-semibold hover:text-[#FFFFFF] cursor-pointer rounded-md">Explore</div>
        <div className="bg-[#1C1C1C] px-4 py-2  rounded-full w-72 flex items-center border-[1px] border-[#282828] hover:border-[#363636] " >
          <input
            type="text"
            className="w-full items-center bg-[#1C1C1C] hover:placeholder:text-[#d2d2d2]  focus:outline-none "
            placeholder="Search..." />
          <FaSearch className="text-xl text-[#9B9B9B] hover:text-[#d2d2d2] mx-2" />
        </div>
      </div>
      <div className="flex gap-3 items-center space-x-4 ">
        <FaRegEdit onClick={handleToggleEvent} className="text-2xl cursor-pointer transition-transform transform hover:text-[#FFFFFF] "  />
        <div className="text-2xl cursor-pointer transition-transform transform hover:text-[#FFFFFF]" onClick={toggleDropdown}>
          <FaRegUserCircle  />
          {showDropdown && (
            <div className="absolute top-10 right-0 bg-zinc-900 text-zinc-100 p-2 rounded-md ">
              <ul>
                <li className="cursor-pointer py-1 text-sm hover:underline">Profile</li>
                <li className="cursor-pointer py-1 text-sm hover:underline">Bookmarks</li>
                <li className="cursor-pointer py-1 text-sm hover:underline">Activity</li>
                <hr />
                <li onClick={handleLogOut} className="cursor-pointer py-1 text-md">Logout</li>
              </ul>
            </div>
          )}
        </div>
        <FaBell className="text-2xl cursor-pointer transition-transform transform hover:text-[#FFFFFF]" />
        <FaEllipsisV className="text-2xl cursor-pointer transition-transform transform hover:text-[#FFFFFF]" />
      </div>
    </div>
  );
};

export default Header;
