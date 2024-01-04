import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { useParams } from "react-router-dom";
import {useDispatch} from 'react-redux'
import {totalPostComments} from '../features/counterSlice'
import { ImSpinner9 } from "react-icons/im";
import PropTypes from 'prop-types'

const CommentSection = ({commentPosted}) => {
  const { postid } = useParams();
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch()

  const fetchComments = async () => {
    setComments(null)
    const token = localStorage.getItem("token");
    const data = await fetch(`https://mask-backend.up.railway.app/comments/?postid=${postid}`, {
      method: "GET",
      headers: {
        "CONTENT-TYPE": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await data.json();
    setComments(json);
  };

    // Here filtered comments is the total comments of a post 
    const filteredComments = comments ? comments.filter(
      (comment) => comment?.post_id?._id === postid
    ) : []


  useEffect(() => {
    fetchComments();
  }, [commentPosted]);


 
  useEffect(() => {
    dispatch(totalPostComments(filteredComments.length))
  },[filteredComments])


   if(!comments){
      return(
        <>
        <div className="w-[90%] flex justify-center "> 
        <div className="text-[#d5d5d5] flex gap-3 items-center mx-4"><span>Loading Comments</span><ImSpinner9 className="text-lg animate-spin text-[#9B9B9B]"/></div>
         </div>
        </>
      ) 
    }

  return (
    <div className="w-full  text-[#d5d5d5]  h-auto bg-[#161616] ">
      {filteredComments.length > 0 ? (
        <h1 className="px-2 pb-2 font-semibold">All Comments</h1>
      ) : (
        <div className="flex w-[90%] justify-center">
          <h1 className="px-2 pb-2  font-semibold">
            No comments, be the first to comment
          </h1>
        </div>
      )}

      {filteredComments &&
        filteredComments
          .toReversed()
          .map(
            (comment) =>
              comment.parentId === null && (
                <CommentCard
                  key={comment._id}
                  commentId={comment._id}
                  content={comment.content}
                  postid={postid}
                  filteredComments={filteredComments}
                  username={comment.user_id.username}
                  totalcomments={filteredComments.length}
                />
              )
          )}
    </div>
  );
};

CommentSection.propTypes = {
  commentPosted: PropTypes.bool.isRequired,
};

export default CommentSection;
