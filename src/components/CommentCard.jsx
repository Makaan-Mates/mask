import { useState } from "react";
import { FaReply } from "react-icons/fa";
import CommentTextArea from "./CommentTextArea";
import PropTypes from "prop-types";
import { FaCircleUser } from "react-icons/fa6";
import UpvoteContainer from "./UpvoteContainer";


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

  // Regular expression to find URLs within the content
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Function to replace URLs with clickable links
  const renderContentWithLinks = (text) => {
    return text.replace(
      urlRegex,
      (url) =>
        `<a href="${url}" target="_blank" class=" text-blue-400 hover:text-blue-300" rel="noopener noreferrer">${url}</a>`
    );
  };

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

          {username ? `${username}` : "anonymous"}
        </span>
      </div>
      <h1
        className="text-[#d8d8d8] whitespace-pre-wrap break-words"
        dangerouslySetInnerHTML={{ __html: renderContentWithLinks(content) }}
      />
      <UpvoteContainer type="comment" id={commentId}/>
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


CommentCard.propTypes = {
    content: PropTypes.string.isRequired,
    commentId: PropTypes.string.isRequired,
    filteredComments: PropTypes.arrayOf(
      PropTypes.shape({
        parentId: PropTypes.string,
      })
    ),
    username: PropTypes.string,
  };

export default CommentCard;
