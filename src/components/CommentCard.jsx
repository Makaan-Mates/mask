import { useState } from "react";
import { FaReply } from "react-icons/fa";
import CommentTextArea from "./CommentTextArea";

const CommentCard = ({ content, commentId }) => {
  const [displayReplyTextArea, setDisplayReplyTextArea] = useState(false);
  const [isReplySection,setIsReplySection] = useState(false)

  const handleCommentReply = () => {
    setDisplayReplyTextArea(!displayReplyTextArea);
    setIsReplySection(true)
};


  return (
    <div className="w-full my-2 flex flex-col bg-zinc-800 justify-between border-[0.2px] border-zinc-700 px-5 py-5 gap-4  text-zinc-200 hover:border-zinc-600">
      <h1>{content}</h1>
      <div
        onClick={handleCommentReply}
        className="cursor-pointer flex items-center gap-2"
      >
        <FaReply /> <span> Reply </span>
      </div>
      {displayReplyTextArea && <CommentTextArea isReplySection={isReplySection} commentId={commentId}/>}
      {}<CommentCard />
    </div>
  );
};

export default CommentCard;
