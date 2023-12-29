
import { useEffect ,useState} from "react";
import CommentCard from "./CommentCard";
import {useParams} from "react-router-dom"


const CommentSection = () => {
  const {postid} =useParams()
  const [comments,setComments] =useState([])
   
  // if(!comments){
  //   return null
  // }

  const fetchComments = async ()=>{
    const token = localStorage.getItem("token");
    const data = await fetch("http://localhost:4000/comments",{
      method: 'GET',
      headers:{
        "CONTENT-TYPE": "application/json",
        Authorization: `Bearer ${token}`,  
       }

    })

    const json = await data.json()
    setComments(json)
 
  }

  useEffect(()=>{
    fetchComments()
  },[])

  console.log(postid)
  console.log(comments)
  const filteredComments = comments.filter((comment)=> comment?.post_id?._id === postid)
  console.log(filteredComments);
  return (
    <div className="w-full h-auto bg-zinc-800">
    {filteredComments && filteredComments.map((comment)=>(
      <CommentCard key={comment._id} commentId={comment._id} content={comment.content} postid={postid}/>
    )

    )}
    </div>
  );
};

export default CommentSection;
