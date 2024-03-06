import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { totalPostComments } from "../features/counterSlice";
import { ImSpinner9 } from "react-icons/im";
import PropTypes from "prop-types";

const CommentSection = ({ commentPosted, socket, senderName, postData }) => {
  const { postid } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [replyPosted, setReplyPosted] = useState(false);
  const dispatch = useDispatch();
  const [commentDeleted, setCommentDeleted] = useState(false);

  const fetchComments = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const data = await fetch(
      `https://mask-backend.up.railway.app/comments/?postid=${postid}`,
      {
        method: "GET",
        headers: {
          "CONTENT-TYPE": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const json = await data.json();
    setComments(json);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [commentPosted, replyPosted, commentDeleted]);

  useEffect(() => {
    dispatch(totalPostComments(comments?.length));
  }, [comments]);

  console.log(comments);

  if (isLoading) {
    return (
      <>
        <div className="flex w-[90%] justify-center ">
          <div className="mx-4 flex items-center justify-center gap-3 text-[#d5d5d5]">
            <span>Loading Comments</span>
            <ImSpinner9 className="animate-spin text-lg text-[#9B9B9B]" />
          </div>
        </div>
      </>
    );
  }

  // const reversedComments = comments?.toReversed()

  return (
    <div className="h-auto  w-full  bg-[#161616] text-[#d5d5d5] ">
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
        Array.isArray(comments) &&
        comments
          ?.toReversed()
          .map(
            (comment) =>
              comment.parentId === null && (
                <CommentCard
                  key={comment?._id}
                  commentId={comment._id}
                  content={comment?.content}
                  postid={postid}
                  filteredComments={comments}
                  username={comment?.user_id?.username}
                  totalcomments={comments?.length}
                  setReplyPosted={setReplyPosted}
                  replyPosted={replyPosted}
                  userid={comment?.user_id?._id}
                  setCommentDeleted={setCommentDeleted}
                  commentDeleted={commentDeleted}
                  socket={socket}
                  senderName={senderName}
                  postData={postData}
                  receiverName={comment?.user_id?.username}
                />
              ),
          )}
    </div>
  );
};

CommentSection.propTypes = {
  commentPosted: PropTypes.bool.isRequired,
  socket: PropTypes.object.isRequired,
  senderName: PropTypes.string.isRequired,
  postData: PropTypes.object.isRequired,
};

export default CommentSection;
