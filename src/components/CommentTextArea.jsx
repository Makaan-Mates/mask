import {useRef} from 'react'
import {useParams} from "react-router-dom"
import PropTypes from 'prop-types';

const CommentTextArea= ({isReplySection,commentId,setCommentPosted,commentPosted})=> {
const{postid} = useParams()
const comment = useRef();


  const handlePublishComment = async () => {
    const token = localStorage.getItem("token");
    const data = await fetch(`https://mask-backend.up.railway.app/post/comment?isReplySection=${isReplySection}`, {
   
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
    

    setCommentPosted(!commentPosted)
    comment.current.blur();
    comment.current.value = '';
    const response = await data.json()
    console.log(response)
  };



  return (
    <>
      <div className="addcomment w-[90%] bg-[#1C1C1C]  h-[20vh] my-6 flex rounded-md justify-between border-[0.2px] border-[#282828] ">
        <textarea
          className="w-[80%] h-full text-sm  bg-[#1C1C1C]  rounded px-3 py-4 focus:outline-none resize-none text-[#d8d8d8] scrollbar-thin scrollbar-thumb-zinc-500 placeholder:text-[#9B9B9B]"
          name="addnewcomment"
          id=""
          ref={comment}
          cols="30"
          rows="10"
          placeholder="Add a comment"
        ></textarea>
        <div className=" m-4   items-end flex justify-end">
          <button
            onClick={handlePublishComment}
            className="border-[#1B1B1B] bg-[#292929]  rounded-xl hover:bg-[#2e2e2e]  h-[6vh] flex items-center text-[#d8d8d8] px-4 py-2  transition duration-300"
          >
            Comment
          </button>
        </div>
      </div>
    </>
  );
}
CommentTextArea.propTypes = {
  isReplySection: PropTypes.bool.isRequired,
  commentId: PropTypes.string,
};

export default CommentTextArea;
