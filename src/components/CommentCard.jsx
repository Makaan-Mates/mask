import { useState } from "react";
import CommentTextArea from "./CommentTextArea";
import PropTypes from "prop-types";
import { FaCircleUser } from "react-icons/fa6";
import UpvoteContainer from "./UpvoteContainer";
import { BiComment } from "react-icons/bi";
import { FaEllipsisV } from "react-icons/fa";
import { useFetchUser } from "../custom-hooks/useFetchUser";
import { RiDeleteBin6Fill } from "react-icons/ri";
const CommentCard = ({
  content,
  commentId,
  replyId,
  filteredComments,
  username,
  setReplyPosted,
  replyPosted,
  userid,
  setCommentDeleted,
  commentDeleted,
  customStyleReplies

}) => {


  const [displayReplyTextArea, setDisplayReplyTextArea] = useState(false);
  const [isReplySection, setIsReplySection] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const { userInfo,loading } = useFetchUser();
  const handleCommentReply = () => {
    setDisplayReplyTextArea(!displayReplyTextArea);
    setIsReplySection(true);
  };

  

  const deleteComment = async () => {
    const token = localStorage.getItem("token");

    const data = await fetch(
      `http://localhost:4000/api/comment/delete/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    setShowDeleteButton(!showDeleteButton);
    setCommentDeleted(!commentDeleted)
    const json = await data.json();
    console.log(json);
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

  const handleShowDeleteBtn = () => {
    setShowDeleteButton(!showDeleteButton);
  };

  const customStyle = customStyleReplies ? `bg-[#1c1c1c]  border-y-0 border-r-0 border-[0.5px] rounded-none` : `` 


  return (
    <div
      className={` ${
        commentId === undefined
          ? " px-2 py-2  "
          : ` w-full my-4 flex flex-col bg-[#1C1C1C] justify-between  px-5 py-5 gap-3 rounded-lg border-[0.2px] border-[#282828] ${customStyle} text-zinc-200`
      }`}
    >
      <div className="flex justify-between  items-center gap-2">
        <div className="flex items-center gap-4">
          <span className="text-xl">
            <FaCircleUser />
          </span>
          <span className="font-semibold text-lg text-[#858585] hover:text-white cursor-pointer">
            {username ? `${username}` : "anonymous"}
          </span>
        </div>
        <div className="relative">
          {userInfo?._id === userid && (
            <>
              <FaEllipsisV
                onClick={handleShowDeleteBtn}
                className=" mr-2 text-lg cursor-pointer text-[#9B9B9B] hover:text-[#d2d2d2]"
              />

              {showDeleteButton && (
                <div className="absolute top-6 -left-14 w-24 h-30 flex flex-col items-center  rounded-lg bg-[#1C1C1C] ">
                  <button
                    onClick={!loading && deleteComment}
                    className="w-full hover:bg-red-900 hover:text-white h-10 flex justify-center items-center px-2 py-2 rounded-lg drop-shadow-lg text-center font-semibold border-[1px] border-[#1B1B1B] bg-[#292929] text-[#d5d5d5] text-sm cursor-pointer"
                  >
                    <RiDeleteBin6Fill className="mr-1" />
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <h1
        className="text-[#d8d8d8] ml-9 w-[90%] whitespace-pre-wrap break-words"
        dangerouslySetInnerHTML={{ __html: renderContentWithLinks(content) }}
      />

      <div className="flex items-center ml-6 text-sm gap-3 ">
        <UpvoteContainer type="comment" id={replyId || commentId} />

        {commentId === undefined ? (
          <span></span>
        ) : (
          <div className="cursor-pointer text-[#d8d8d8] flex justify-between mr-2 items-center">
            <BiComment
              onClick={handleCommentReply}
              className="mx-1 mt-1 text-2xl text-[#9B9B9B] hover:text-[#d2d2d2] "
            />
            <span>{replies.length}</span>
          </div>
        )}
      </div>

      {displayReplyTextArea && (
        <CommentTextArea
          isReplySection={isReplySection}
          commentId={commentId}
          setReplyPosted={setReplyPosted}
          replyPosted={replyPosted}
        />
      )}
      {replies &&
        replies.map((reply) => (
          <div key={reply._id} className="ml-2">
            <CommentCard
              content={reply.content}
              commentId={reply._id} // pass commentId for reply
              replyId={reply._id}
              filteredComments={filteredComments} // pass filteredComments for reply
              username={reply.user_id.username}
              setReplyPosted={setReplyPosted}
              replyPosted={replyPosted} // pass replyPosted for reply
              userid={reply.user_id._id} // pass userid for reply
              setCommentDeleted={setCommentDeleted} // pass setCommentDeleted for reply
              commentDeleted={commentDeleted} // pass commentDeleted for reply
              customStyleReplies={true}
            />
          </div>
        ))}
    </div>
  );
};

CommentCard.propTypes = {
  content: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  replyId: PropTypes.string,
  filteredComments: PropTypes.arrayOf(
    PropTypes.shape({
      parentId: PropTypes.string,
    })
  ),
  username: PropTypes.string,
};

export default CommentCard;
