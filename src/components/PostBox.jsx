
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
    <div className="w-full min-h-[88vh] bg-zinc-800 px-5 py-10">
      <div className="w-full h-full bg-zinc-700">
      <h1>{postDetails?.title}</h1>
      <p>{postDetails?.description}</p>
      </div>
    </div>
  );
};

export default PostBox;
