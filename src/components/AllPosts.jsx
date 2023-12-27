import { FaArrowRightArrowLeft } from "react-icons/fa6";
import PostCard from "./PostCard";
import { useEffect } from "react"
import {useDispatch} from "react-redux"
import { addAllPosts } from "../features/postSlice"
import {useSelector} from 'react-redux'

const AllPosts = () => {

  const dispatch = useDispatch()
  const allPosts = useSelector((state)=>state.posts.data)
 
  useEffect(()=>{
    const fetchAllPosts = async ()=>{
      const token = localStorage.getItem("token");
      const data = await fetch("http://localhost:4000/api/posts?_limit=12&_page=1",{
        method: "GET",
        headers: {
          "CONTENT-TYPE": "application/json",
          authorization: `Bearer ${token}`,
        }
      })

      const json = await data.json()
      dispatch(addAllPosts(json))
    }

    fetchAllPosts()
  },[])

  return (
    <div className=" w-4/5 px-5 py-8 z-10 ">
        <div className="w-full flex items-center justify-between pb-11 border-b-[1px] border-zinc-900">
            <h1 className="text-2xl font-semibold ">All Posts </h1>
            <button className="flex items-center border-2 border-red-600 rounded-md px-2 py-1 text-zinc-200 hover:border-red-500"><FaArrowRightArrowLeft className="mr-2 rotate-90" />Hot Posts</button>
        </div>
        <div className="postcards flex flex-wrap py-5 " >
           {allPosts?.posts?.toReversed().map((post)=>(
            <PostCard key={post._id} title={post.title} description={post.description} topic={post.topic}/>
           ))}
        </div>
    </div>
  )
}

export default AllPosts