import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";
import { useDispatch } from "react-redux";
import { displaySearchBar } from "../../features/addPostCardSlice";
import { RxCross2 } from "react-icons/rx";

const SearchPosts = () => {
  const searchPostsRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  //fetch SearchResults
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      if (searchQuery) {
        try {
          const response = await axios.get(
            `${apiUrl}/api/searchposts/${searchQuery}`
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

  //used for closing the search bar when clicked outside
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

  const handleSearchHide = () => {
    dispatch(displaySearchBar(false));
  };

  const handlePostCardClick = (postId) => {
    navigate(`/post/${postId}`);
    dispatch(displaySearchBar(false));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() !== "") {
      setTimeout(() => {
        setHasSearched(true);
      }, 500);
    } else {
      setHasSearched(false);
    }
  };
  // console.log(searchResults)

  return (
    <div
      ref={searchPostsRef}
      className="searchdiv w-[90%] sm:w-[100vh]  z-50  items-center justify-center fixed top-[12vh] left-0  right-0 m-auto   rounded-lg bg-[#161616] text-white "
    >
      <div className=" flex px-2 py-2 items-center bg-[#1C1C1C] gap-1 rounded-lg  border-[1px] border-[#282828] hover:border-[#363636] ">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full h-10 items-center bg-[#1C1C1C] hover:placeholder:text-[#d2d2d2]  focus:outline-none rounded-lg px-2 "
          placeholder="Search Posts"
          autoFocus
        />
        <div className="hidden  md:flex items-center border-[1px] border-[#363636] rounded-md text-sm px-1 ">
          <span className="mb-1  text-[#9B9B9B]">esc</span>
        </div>
        <div
          onClick={handleSearchHide}
          className="md:hidden flex items-center px-2 "
        >
          <RxCross2 className="text-xl text-[#747474]" />
        </div>
      </div>
      <div className="max-h-[450px] overflow-y-auto focus:outline-none scroll-smooth px-2 items-center flex flex-wrap">
        {isLoading ? (
          <div className="  w-full h-24 rounded-full flex items-center justify-center">
            <ImSpinner9 className="animate-spin text-4xl text-[#9B9B9B] " />
          </div>
        ) : searchResults.length > 0 ? (
          searchResults.map((post) => (
            <div
              key={post._id}
              onClick={() => handlePostCardClick(post._id)}
              className={`w-full flex flex-wrap my-0`}
            >
              <PostCard
                key={post._id}
                title={post?.title}
                description={post?.description}
                topic={post?.topic}
                postid={post._id}
                username={post?.userDetails?.username}
                totalUpvotes={post?.totalUpvotes}
                timeSinceCreated={post?.timeSinceCreated}
                customStyleSearch={true}
                collegeName={post?.userDetails?.college}
              />
            </div>
          ))
        ) : hasSearched ? (
          <div className="w-full h-24 rounded-full flex items-center justify-center">
            <span className="text-[#9B9B9B]">No results found</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchPosts;
