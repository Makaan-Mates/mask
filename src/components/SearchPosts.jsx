import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { TbFidgetSpinner } from "react-icons/tb";
import PostCard from "./PostCard";
import { useDispatch } from "react-redux";
import { displaySearchBar } from "../features/addPostCardSlice";

const SearchPosts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchPostsRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchPostsRef.current &&
        !searchPostsRef.current.contains(event.target)
      ) {
        dispatch(displaySearchBar(false));
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      if (searchQuery) {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/searchposts/${searchQuery}`
          );
          setSearchResults(response.data.message);
        } catch (error) {
          console.error(error);
        }
      } else {
        setSearchResults([]);
      }
      setIsLoading(false);
    };

    const fetchPostsAfterDelay = setTimeout(fetchPosts, 300);
    return () => clearTimeout(fetchPostsAfterDelay);
  }, [searchQuery]);

  console.log(searchResults);

  const handlePostCardClick = () => {
    dispatch(displaySearchBar(false));
  };

  return (
    <div
      ref={searchPostsRef}
      className="  w-[100vh]  z-50  items-center justify-center fixed top-[12vh] left-0  right-0 m-auto   rounded-lg bg-[#161616] text-white "
    >
      <div className=" flex px-2 py-2 items-center bg-[#1C1C1C] gap-1 rounded-lg  border-[1px] border-[#282828] hover:border-[#363636] ">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-10 items-center bg-[#1C1C1C] hover:placeholder:text-[#d2d2d2]  focus:outline-none rounded-lg px-2 "
          placeholder="Search Posts"
          autoFocus
        />
        <div className="flex items-center border-[1px] border-[#363636] rounded-md text-sm px-1 ">
            <span className="mb-1 text-[#9B9B9B]">esc</span>
          </div>
      </div>
      <div className=" scrollable-div scroll-smooth px-2 items-center flex flex-wrap">
        {isLoading ? (
          <div className="w-full h-24 rounded-full flex items-center justify-center">
            <TbFidgetSpinner className="animate-spin text-4xl " />
          </div>
        ) : (
          searchResults.map((post) => (
            <div key={post._id} onClick={handlePostCardClick} className="w-full flex flex-wrap">
              <PostCard
                key={post._id}
                title={post?.title}
                description={post?.description}
                topic={post?.topic}
                postid={post._id}
                username={post?.user_id?.username}
                customStyleProfile={true}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPosts;
