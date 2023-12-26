import { FaRegUserCircle, FaBell, FaRegEdit, FaEllipsisV,FaSearch } from 'react-icons/fa';
import { useState } from 'react';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };


  return (
    <div className="bg-zinc-800 sticky top-0 h-20 text-zinc-100 py-4 px-6  flex items-center justify-between  border-b-[1px] border-zinc-900">
      <div className="flex items-center justify-center space-x-4 gap-5">
        <div className="text-4xl font-bold transition-transform transform hover:scale-105">mask</div>
        <div className="text-l px-2 py-1 font-semibold hover:bg-zinc-700 rounded-md">Home </div>
        <div className="text-l px-2 py-1 font-semibold hover:bg-zinc-700 rounded-md">Explore</div>
        <div className="bg-zinc-100 px-4 py-2 text-zinc-800  rounded-full w-72 flex items-center">
          <input
            type="text"
            className="w-full items-center  focus:outline-none"
            placeholder="Search..." />
          <FaSearch className="text-xl text-zinc-800 mx-2" />
        </div>
      </div>
      <div className="flex gap-3 items-center space-x-4 ">
        <FaRegEdit className="text-2xl cursor-pointer transition-transform transform hover:text-zinc-400 " />
        <div className="text-2xl cursor-pointer transition-transform transform hover:text-zinc-400" onClick={toggleDropdown}>
          <FaRegUserCircle  />
          {showDropdown && (
            <div className="absolute top-10 right-0 bg-zinc-900 text-zinc-100 p-2 rounded-md ">
              <ul>
                <li className="cursor-pointer py-1 text-sm hover:underline">Profile</li>
                <li className="cursor-pointer py-1 text-sm hover:underline">Bookmarks</li>
                <li className="cursor-pointer py-1 text-sm hover:underline">Activity</li>
                <hr />
                <li className="cursor-pointer py-1 text-md">Logout</li>
              </ul>
            </div>
          )}
        </div>
        <FaBell className="text-2xl cursor-pointer transition-transform transform hover:text-zinc-400" />
        <FaEllipsisV className="text-2xl cursor-pointer transition-transform transform hover:text-zinc-400" />
      </div>
    </div>
  );
};

export default Header;
