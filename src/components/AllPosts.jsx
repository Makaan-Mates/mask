import { FaArrowRightArrowLeft } from "react-icons/fa6";
import PostCard from "./PostCard";
import {useState, useEffect } from "react";


const AllPosts = () => {


  const [card,setCard] = useState([])
  const [page,setPage] = useState(1)

  const fetchAllPosts = async () => {
    const token = localStorage.getItem("token");
    const data = await fetch(
      `http://localhost:4000/api/posts?_limit=14&_page=${page}`,
      {
        method: "GET",
        headers: {
          "CONTENT-TYPE": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await data.json();
    console.log(json)
    if (page === 1) {
      setCard([...json.posts]);
    } else {
      setCard((prev) => [...prev, ...json.posts]);
    }
  };


  useEffect(() => {
    fetchAllPosts();
  }, [page]);

  const handelInfiniteScroll = async () => {

    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
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
  }, []);


  return (

    <div className=" w-4/5 px-5 py-8 ">
      <div className="w-full flex items-center justify-between pb-11 border-b-[1px] border-zinc-900">
        <h1 className="text-2xl font-semibold ">Sex Education</h1>
        <button className="flex items-center border-2 border-red-600 rounded-md px-2 py-1 text-zinc-200 hover:border-red-500">
          <FaArrowRightArrowLeft className="mr-2 rotate-90" />
          Hot Posts
        </button>
      </div>
      <div className="postcards flex flex-wrap py-5 ">
        {card.map((post) => (
          <PostCard
            key={post._id}
            title={post.title}
            description={post.description}
            topic={post.topic}
          />
        ))}
      </div>

    </div>
  );
};

export default AllPosts;
