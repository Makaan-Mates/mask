import {useRef} from 'react'
import {useParams} from "react-router-dom"



const CommentTextArea= ({isReplySection,commentId})=> {
const{postid} = useParams()
const comment = useRef();




  const handlePublishComment = async () => {
    const token = localStorage.getItem("token");
    const data = await fetch(`http://localhost:4000/post/comment?isReplySection=${isReplySection}`, {
   
      method: "POST",
      headers: {
        "CONTENT-TYPE": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: comment.current.value,
        postid:postid,
        commentId: commentId
      })
      
    });
    
    console.log(comment.current.value)

    const response = await data.json()

    window.location.reload()
    // console.log(response)
  };



  return (
    <>
      <div className="addcomment w-[90%] bg-zinc-900 h-[20vh] my-6 flex rounded-md justify-between ">
        <textarea
          className="w-[80%] h-full text-sm  bg-zinc-900 rounded px-3 py-4 focus:outline-none resize-none text-zinc-200 scrollbar-thin scrollbar-thumb-zinc-500"
          name="addnewcomment"
          id=""
          ref={comment}
          cols="30"
          rows="10"
          placeholder="Add a comment"
          autoFocus
        ></textarea>
        <div className=" m-4   items-end flex justify-end">
          <button
            onClick={handlePublishComment}
            className="bg-zinc-800 h-[6vh] flex items-center text-zinc-100 px-4 py-2 rounded-md hover:bg-red-800 transition duration-300"
          >
            Comment
          </button>
        </div>
      </div>
    </>
  );
}

export default CommentTextArea;
