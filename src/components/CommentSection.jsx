import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { totalPostComments } from "../features/counterSlice";
import { ImSpinner9 } from "react-icons/im";
import PropTypes from "prop-types";

const CommentSection = ({ commentPosted }) => {
  const { postid } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading , setIsLoading ] = useState(false)
  const [replyPosted, setReplyPosted] = useState(false);
  const dispatch = useDispatch();
  const [commentDeleted, setCommentDeleted] = useState(false)

  const fetchComments = async () => {
    setIsLoading(true)
    const token = localStorage.getItem("token");
    const data = await fetch(
      `https://mask-backend.up.railway.app/comments/?postid=${postid}`,
      {
        method: "GET",
        headers: {
          "CONTENT-TYPE": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await data.json();
    setComments(json);
    setIsLoading(false)
  };


  useEffect(() => {
    fetchComments();
  }, [commentPosted,replyPosted,commentDeleted]);

  useEffect(() => {
    dispatch(totalPostComments(comments?.length));
  }, [comments]);

  console.log(comments)

  if (isLoading) {
    return (
      <>
        <div className="w-[90%] flex justify-center ">
          <div className="text-[#d5d5d5] flex gap-3 items-center justify-center mx-4">
            <span>Loading Comments</span>
            <ImSpinner9 className="text-lg animate-spin text-[#9B9B9B]" />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="w-full  text-[#d5d5d5]  h-auto bg-[#161616] ">
      {comments.length > 0 ? (
        <h1 className="px-2 pb-2 font-semibold">All Comments</h1>
      ) : (
        <div className="flex w-[90%]  justify-center">
          <h1 className="px-2 pb-2  font-semibold">
            No comments, be the first to comment
          </h1>
        </div>
      )}

      {comments &&
        comments
          .toReversed()
          .map(
            (comment) =>
              comment.parentId === null && (
                <CommentCard
                  key={comment._id}
                  commentId={comment._id}
                  content={comment.content}
                  postid={postid}
                  filteredComments={comments}
                  username={comment.user_id.username}
                  totalcomments={comments.length}
                  setReplyPosted={setReplyPosted}
                  replyPosted={replyPosted}
                  userid={comment?.user_id?._id}
                  setCommentDeleted={setCommentDeleted}
                  commentDeleted={commentDeleted}
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
