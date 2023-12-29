import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { useParams } from "react-router-dom";

const CommentSection = () => {
  const { postid } = useParams();
  const [comments, setComments] = useState([]);

  // if(!comments){
  //   return null
  // }

  const fetchComments = async () => {
    const token = localStorage.getItem("token");
    const data = await fetch("http://localhost:4000/comments", {
      method: "GET",
      headers: {
        "CONTENT-TYPE": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await data.json();
    setComments(json);
  };

  useEffect(() => {
    fetchComments();
  }, []);
  // {filteredComments.length > 0 ? 'All Comments':'No comments, be the first to comment'}
  // console.log(postid)
  // console.log(comments)
  const filteredComments = comments.filter(
    (comment) => comment?.post_id?._id === postid
  );
  console.log(filteredComments);
  return (
    <div className="w-full  h-auto bg-[#161616] ">
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
                />
              )
          )}
    </div>
  );
};

export default CommentSection;
