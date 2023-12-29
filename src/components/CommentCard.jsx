import { useState } from "react";
import { FaReply } from "react-icons/fa";
import CommentTextArea from "./CommentTextArea";
import PropTypes from "prop-types";

const CommentCard = ({ content, commentId, filteredComments }) => {
  const [displayReplyTextArea, setDisplayReplyTextArea] = useState(false);
  const [isReplySection, setIsReplySection] = useState(false);

  console.log(commentId);
//   console.log(filteredComments);
  const handleCommentReply = () => {
    setDisplayReplyTextArea(!displayReplyTextArea);
    setIsReplySection(true);
  };

  const replies = filteredComments?.filter(
    (reply) => reply?.parentId === commentId
  );
//   console.log(replies);

  return (
    <div className="w-full my-2 flex flex-col bg-zinc-800 justify-between border-[0.2px] border-zinc-700 px-5 py-5 gap-4  text-zinc-200 hover:border-zinc-600">
      <h1>{content}</h1>
      {(commentId === undefined ) ? ( 
        <span></span>
      ):<div
      onClick={handleCommentReply}
      className="cursor-pointer flex items-center gap-2"
    >
      <FaReply /> <span> Reply </span>
    </div>
      }
      {displayReplyTextArea && (
        <CommentTextArea
          isReplySection={isReplySection}
          commentId={commentId}
        />
      )}
      {replies &&
        replies.map((reply) => (
          <div key={reply.id} className="bg-zinc-500">
            <CommentCard
              content={reply.content}
            />
          </div>
        ))}
    </div>
  );
};
CommentCard.PropTypes = {
  content: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
};
export default CommentCard;
