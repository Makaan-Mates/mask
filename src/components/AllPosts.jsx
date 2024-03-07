import { FaArrowRightArrowLeft } from "react-icons/fa6";
import PostCard from "./PostCard";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaFire } from "react-icons/fa";
import { MdTimer } from "react-icons/md";
import { BiSolidUpvote } from "react-icons/bi";
import ShimmerPostCard from "./ShimmerPostCard";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { displayAddPostCard } from "../features/addPostCardSlice";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

const AllPosts = ({ reloadPosts, page, setPage }) => {
  const dispatch = useDispatch();
  const topicFromStore = useSelector((state) => state.posts.data.topic);
  const [card, setCard] = useState([]);
  const [displayFilterCategory, setDisplayFilterCategory] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [showIcon, setShowIcon] = useState(true);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("Sort By");

  const fetchAllPosts = async (topicFromStore) => {
    const token = localStorage.getItem("token");
    const data = await fetch(
      `https://mask-backend.up.railway.app/api/posts?_limit=14&_page=${page}&topic=${topicFromStore}&trending=${isTrending}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await data.json();

    if (json.posts && Array.isArray(json.posts)) {
      if (page === 1) {
        setCard([...json.posts]);
      } else {
        setCard((prev) => [...prev, ...json.posts]);
      }
    }
  };

  useEffect(() => {
    setCard([]);
    setPage(1);
  }, [topicFromStore]);

  useEffect(() => {
    fetchAllPosts(topicFromStore);
  }, [page, topicFromStore, isTrending, reloadPosts]);

  const handelInfiniteScroll = async () => {
    try {
      const threshold = 200;
      if (
        window.innerHeight + document.documentElement.scrollTop + threshold >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowFilterCategory = () => {
    setDisplayFilterCategory(!displayFilterCategory);
  };

  const handleTrendingSort = () => {
    setIsTrending(true);
    setDisplayFilterCategory(false);
    setSelectedFilter("Trending");
  };

  //handler for the Latest filter
  const handleLatestSort = () => {
    setIsTrending(false);
    setDisplayFilterCategory(false);
    setSelectedFilter("Latest");
  };

  //handler for the Top Voted filter
  const handleTopVotedSort = () => {
    setDisplayFilterCategory(false);
    setSelectedFilter("Top Voted");
  };

  const handleToggleEvent = () => {
    if (localStorage.getItem("isGuest") === "true") {
      toast("Login to add a post", {
        position: "top-center",
        className: "bg-[#161616]",
      });
      return;
    }
    dispatch(displayAddPostCard());
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, [page, topicFromStore]);

  const handleScroll = () => {
    const currentScrollPosition =
      window.scrollY || document.documentElement.scrollTop;
    if (currentScrollPosition < lastScrollPosition) {
      // Scrolling UP
      setShowIcon(true);
    } else {
      // Scrolling DOWN
      setShowIcon(false);
    }
    setLastScrollPosition(currentScrollPosition);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPosition]);

  return (
    <div className="relative shrink w-full md:w-4/5 lg:w-4/6 xl:w-4/5 px-5 py-4 sm:py-8   bg-[#161616]">
      <div className="w-full flex items-center justify-between pb-5  sm:pb-11 border-b-[1px] border-[#282828]">
        <h1 className="text-lg sm:text-2xl font-semibold text-[#F6F6F6]">
          {topicFromStore === "home" ? `All Posts` : topicFromStore}
        </h1>
        <div className="relative">
          <button
            onClick={handleShowFilterCategory}
            className="flex text-sm items-center rounded-md px-4 py-2  text-[#F6F6F6] shadow-lg shadow-orange-500/15 hover:shadow-orange-500/20 bg-[#1C1C1C]"
          >
            <FaArrowRightArrowLeft className="mr-2 rotate-90 text-[#F6F6F6]" />
            {selectedFilter}
          </button>
          {displayFilterCategory && (
            <div className="absolute top-10 -left-14  w-40 h-30 flex flex-col items-center  rounded-lg bg-[#1C1C1C] overflow-hidden ">
              <span
                onClick={handleTrendingSort}
                className="w-full h-10 flex justify-center items-center px-2 py-2 text-center font-semibold border-[1px] border-[#1B1B1B] bg-[#292929] text-[#d5d5d5] hover:bg-[#2e2e2e] cursor-pointer"
              >
                <FaFire className="mr-1 text-orange-500" /> Trending
              </span>
              <button
                onClick={handleLatestSort}
                className="w-full h-10 flex justify-center items-center px-2 py-2 text-center font-semibold border-[1px] border-[#1B1B1B] bg-[#292929] text-[#d5d5d5] hover:bg-[#2e2e2e] cursor-pointer"
              >
                <MdTimer className="mr-1" />
                Latest
              </button>
              <button
                onClick={handleTopVotedSort}
                className="hidden  w-full h-10  justify-center items-center px-2 py-2 text-center font-semibold border-[1px] border-[#1B1B1B] bg-[#292929] text-[#d5d5d5] hover:bg-[#2e2e2e] cursor-pointer"
              >
                <BiSolidUpvote className="mr-1" />
                Top Voted
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="postcards w-full flex flex-wrap py-5 ">
        {Array.isArray(card) && card?.length === 0
          ? Array(10)
              .fill()
              .map((_, i) => <ShimmerPostCard key={i} />)
          : Array.isArray(card) &&
            card?.map((post) => (
              <PostCard
                key={post._id}
                postid={post._id}
                title={post.title}
                description={post.description}
                topic={post.topic}
                username={post?.user_id?.username}
                timeSinceCreated={post?.timeSinceCreated}
                totalUpvotes={post?.upvotes?.length}
                collegeName={post?.user_id?.college}
              />
            ))}
      </div>
      {showIcon && (
        <div
          onClick={handleToggleEvent}
          className="md:hidden w-16 h-16 flex justify-center items-center fixed bottom-10 right-4 z-50   px-2 py-2 text-center font-semibold border-[1px] border-[#1B1B1B] bg-[#292929] text-[#d5d5d5] rounded-full hover:bg-[#2e2e2e] cursor-pointer text-3xl shadow-lg shadow-grey-500/40 "
        >
          <FiPlus className="" />
        </div>
      )}
    </div>
  );
};

AllPosts.propTypes = {
  reloadPosts: PropTypes.bool,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default AllPosts;
