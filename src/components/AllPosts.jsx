import { FaArrowRightArrowLeft } from "react-icons/fa6";
import PostCard from "./PostCard";

const AllPosts = () => {
  return (
    <div className=" w-4/5 px-5 py-8 ">
        <div className="w-full flex items-center justify-between pb-11 border-b-[1px] border-zinc-900">
            <h1 className="text-2xl font-semibold ">Sex Education</h1>
            <button className="flex items-center border-2 border-red-600 rounded-md px-2 py-1 text-zinc-200 hover:border-red-500"><FaArrowRightArrowLeft className="mr-2 rotate-90" />Hot Posts</button>
        </div>
        <div className="postcards flex flex-wrap py-5 " >
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
        </div>
    </div>
  )
}

export default AllPosts