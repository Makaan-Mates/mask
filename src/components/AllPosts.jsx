import { FaArrowRightArrowLeft } from "react-icons/fa6";
import PostCard from "./PostCard";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const AllPosts = () => {
  const topicFromStore = useSelector((state) => state.posts.data.topic);
  const [card, setCard] = useState([]);
  const [page, setPage] = useState(1);


  const fetchAllPosts = async (topicFromStore) => {
    const token = localStorage.getItem("token");
    const data = await fetch(
      `http://localhost:4000/api/posts?_limit=14&_page=${page}&topic=${topicFromStore}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await data.json();
    console.log(json);

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
  }, [page, topicFromStore]);

const handelInfiniteScroll = async () => {
  try {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1  >=
      document.documentElement.scrollHeight 
    ) {
      setPage((prev) => prev + 1);
    }
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, [page,topicFromStore]);

  return (
    <div className=" w-4/5 px-5 py-8   bg-[#161616]">
      <div className="w-full flex items-center justify-between pb-11 border-b-[1px] border-[#282828]">
        <h1 className="text-2xl font-semibold text-[#F6F6F6]">{topicFromStore==="home" ? `All Posts` : topicFromStore}</h1>
        <button className="flex text-sm items-center rounded-md px-4 py-2  text-[#F6F6F6] shadow-lg shadow-green-500/15 hover:shadow-green-500/20 bg-[#1C1C1C]">
          <FaArrowRightArrowLeft className="mr-2 rotate-90 text-[#F6F6F6]" />
          Hot Posts
        </button>
      </div>
      <div className="postcards flex flex-wrap py-5 ">
        {card.map((post) => (
          <PostCard
            key={post._id}
            postid={post._id}
            title={post.title}
            description={post.description}
            topic={post.topic}
            username={post?.user_id?.username}
          />
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
