import { useState } from "react";
import { FaReply } from "react-icons/fa";
import CommentTextArea from "./CommentTextArea";
import PropTypes from "prop-types";
import { FaCircleUser } from "react-icons/fa6";

const CommentCard = ({ content, commentId, filteredComments, username }) => {
  const [displayReplyTextArea, setDisplayReplyTextArea] = useState(false);
  const [isReplySection, setIsReplySection] = useState(false);

  const handleCommentReply = () => {
    setDisplayReplyTextArea(!displayReplyTextArea);
    setIsReplySection(true);
  };

  const replies = filteredComments?.filter(
    (reply) => reply?.parentId === commentId
  );

  return (
    <div
      className={` ${
        commentId === undefined
          ? " px-2 py-2  "
          : " w-full my-4 flex flex-col bg-[#1C1C1C] justify-between  px-5 py-5 gap-4 rounded-lg border-[0.2px] border-[#282828]   text-zinc-200"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">
          <FaCircleUser />
        </span>
        <span className="font-semibold text-lg text-[#858585] hover:text-white cursor-pointer">
          {username}
        </span>
      </div>
      <h1 className="text-[#d8d8d8] ">{content}</h1>
      {commentId === undefined ? (
        <span></span>
      ) : (
        <div className=" ">
          <button
            onClick={handleCommentReply}
            className="px-3 py-1 flex items-center gap-2 text-[16px] border-[#1B1B1B]  bg-[#292929]  rounded-lg hover:bg-[#2e2e2e]  text-[#d8d8d8]  transition duration-300  "
          >
            <FaReply className="text-[12px] text- cursor-pointer hover:text-white" />
            Reply
          </button>
        </div>
      )}
      {displayReplyTextArea && (
        <CommentTextArea
          isReplySection={isReplySection}
          commentId={commentId}
        />
      )}
      {replies &&
        replies.map((reply) => (
          <div key={reply.id} className="ml-8">
            <CommentCard
              content={reply.content}
              username={reply.user_id.username}
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
