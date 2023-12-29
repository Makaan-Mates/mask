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

  return (
    <div className="w-4/5 px-5 py-8  bg-[#161616] ">
      <div className="topic text-sm font-semibold my-2 mx-4 text-[#aeaeae] ">
        <span>{postDetails?.topic}</span>
      </div>

      <div className="content-box w-[90%] 2xl:w-[80%] flex flex-col gap-6 bg-[#1C1C1C]  justify-between  px-5 py-10  rounded-md border-[0.2px] border-[#282828] ">

        <div className="tit-area flex flex-col gap-2">
          <div className="title">
            <h1 className=" text-4xl font-semibold text-[#F6F6F6]  ">
            {postDetails?.title}
            </h1>
          </div>
          <div className="writer text-sm flex gap-2 text-[#858585]">
            <span>New</span>
            <span>|</span>
            <span className="cursor-pointer hover:text-white">{postDetails?.user_id?.username || "anonymous"}</span>
          </div>
          <div className="tit-info flex gap-4 py-2 items-center text-[#9B9B9B] " >
            <span className="flex gap-1 items-center">
              {" "}
              <FaRegClock className=" mr-1 text-lg text-[#9B9B9B] " />
              <span>2h</span>
            </span>
            <span className="flex items-center">
            <FaRegEye className="mr-2 text-lg text-[#9B9B9B] " />
            857
          </span>
          <span className="flex items-center cursor-pointer">
            <FaRegBookmark className="mr-2 text-lg text-[#9B9B9B] hover:text-[#d2d2d2]" />
          </span>
          </div>
        </div>

        <div className="desc-content text-lg text-[#d8d8d8] whitespace-pre-wrap">
        {postDetails?.description}
        </div>
        <div className="flex gap-4 py-2 items-center text-[#9B9B9B]">
          <span className="flex items-center cursor-pointer">
            {" "}
            <BiUpvote className="mx-1 text-2xl text-[#9B9B9B] hover:text-[#d2d2d2]" />
            69
          </span>
          <span className="flex items-center cursor-pointer">
            <BiComment className="mx-1 mt-1 text-2xl text-[#9B9B9B] hover:text-[#d2d2d2] " />
            <span className="text-center">21</span>
          </span>
        </div>
      </div>
      <CommentTextArea isReplySection={false}/>
      <div className="commentsection w-full h-auto bg-[#161616]  px-5 py-4 rounded-md">
            <div><CommentSection /></div>
      </div>
    </div>
  );
};

export default PostDetail;
