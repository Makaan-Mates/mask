import { FaRegEye, FaRegClock } from "react-icons/fa";
import { BiComment, BiUpvote } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa6";
import CommentSection from "./CommentSection";
import { useEffect,useState } from "react";
import {useParams} from "react-router-dom"

const PostBox = () => {
    const {postid} = useParams()

  const [postData,setPostData] = useState() 

  const fetchPostDetails = async()=>{
    const token = localStorage.getItem("token");
    const data = await fetch(`http://localhost:4000/api/post/${postid}`,{
      method:'GET',
      headers:{
       "CONTENT-TYPE": "application/json",
       Authorization: `Bearer ${token}`,  
      }

    })

    const json = await data.json()
    setPostData(json)
  }


  useEffect(()=>{
    fetchPostDetails()
  },[])

  if(!postData){
   return
  }

  const {postDetails} = postData;
   console.log(postDetails)
  return (
    <div className="w-4/5 px-5 py-8  bg-zinc-800 ">
      <div className="topic text-sm font-semibold my-2 mx-4 ">
        <span>{postDetails?.topic}</span>
      </div>
      <div className="content-box w-[90%] 2xl:w-[80%] flex flex-col gap-6 bg-zinc-800 justify-between border-[0.2px] border-zinc-700 px-5 py-10  text-zinc-200 rounded-md ">
        <div className="tit-area flex flex-col gap-2">
          <div className="title">
            <h1 className=" text-4xl font-semibold ">
            {postDetails?.title}
            </h1>
          </div>
          <div className="writer text-sm flex gap-2">
            <span>profession</span>
            <span>|</span>
            <span className="cursor-pointer text-zinc-400">{postDetails?.user_id?.username}</span>
          </div>
          <div className="tit-info flex gap-4 py-2 items-center " >
            <span className="flex gap-1 items-center">
              {" "}
              <FaRegClock className=" mr-1 text-lg" />
              <span>2h</span>
            </span>
            <span className="flex items-center">
            <FaRegEye className="mr-2 text-lg" />
            857
          </span>
          <span className="flex items-center cursor-pointer">
            <FaRegBookmark className="mr-2 text-lg" />
          </span>
          </div>
        </div>

        <div className="desc-content text-lg ">
        {postDetails?.description}
        </div>
        <div className="flex gap-4 py-2 items-center ">
          <span className="flex items-center cursor-pointer">
            {" "}
            <BiUpvote className="mx-1 text-2xl  " />
            69
          </span>
          <span className="flex items-center cursor-pointer">
            <BiComment className="mx-1 mt-1 text-2xl  " />
            <span className="text-center">21</span>
          </span>
        </div>
      </div>
      <div className="addcomment w-[90%] bg-zinc-900 h-[20vh] my-6 flex rounded-md justify-between ">
        <textarea
          className="w-[80%] h-full text-sm  bg-zinc-900 rounded px-3 py-4 focus:outline-none resize-none text-zinc-200 scrollbar-thin scrollbar-thumb-zinc-500"
          name="addnewcomment"
          id=""
          cols="30"
          rows="10"
          placeholder="Add a comment"
        ></textarea>
        <div className=" m-4   items-end flex justify-end">
          <button className="bg-zinc-800 h-[6vh] flex items-center text-zinc-100 px-4 py-2 rounded-md hover:bg-red-800 transition duration-300">
            Publish
          </button>
        </div>
      </div>
      <div className="commentsection w-full bg-zinc-700 h-80 px-5 py-4 rounded-md">
            <div><CommentSection/></div>

      </div>
    </div>
  );
};

export default PostBox;
