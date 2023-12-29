import { FaRegEye, FaRegClock } from "react-icons/fa";
import { BiComment, BiUpvote } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa6";
import CommentSection from "./CommentSection";
import { useEffect,useState } from "react";
import {useParams} from "react-router-dom"
import CommentTextArea from "./CommentTextArea";

const PostDetail = () => {
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
            <span className="cursor-pointer text-zinc-400">{postDetails?.user_id?.username || "anonymous"}</span>
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
      <CommentTextArea isReplySection={false}/>
      <div className="commentsection w-full h-auto bg-zinc-700  px-5 py-4 rounded-md">
            <div><CommentSection /></div>

      </div>
    </div>
  );
};

export default PostDetail;
