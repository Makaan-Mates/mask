import { FaRegClock } from "react-icons/fa";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { BiUpvote } from "react-icons/bi";

const PostCard = ({
  title,
  description,
  topic,
  postid,
  username,
  customStyleProfile,
  customStyleSearch,
  timeSinceCreated,
  totalUpvotes,
  collegeName,
}) => {
  const navigate = useNavigate();

  const truncateDescription = (text, maxLength) => {
    const words = text?.split(" ");
    if (words?.length > maxLength) {
      return words.slice(0, maxLength).join(" ") + "...";
    }
    return text;
  };

  const truncatedDesc = truncateDescription(description, 30);

  const handleShowPost = () => {
    navigate(`/post/${postid}`);
  };

  const customStyleProfileClass = customStyleProfile
    ? " w-full  2xl:w-full"
    : customStyleSearch
    ? " w-full  2xl:w-full "
    : "w-[96%]  md:[90%] lg:w-[47.5%] xl:w-[48.3%] 2xl:w-[31.8%]  rounded-md   ";

  console.log(collegeName);

  return (
    <div
      onClick={handleShowPost}
      className={` flex flex-col bg-[#1C1C1C] mx-2 my-2 px-5 py-5 gap-4 justify-between border-[0.2px] border-[#242424] cursor-pointer hover:border-[#282828] ${customStyleProfileClass} `}
    >
      <span className="text-xs  sm:text-sm font-semibold text-[#aeaeae] ">
        {topic}
      </span>
      <span className="text-lg sm:text-2xl  font-semibold text-[#F6F6F6] whitespace-pre-wrap break-words ">
        {title}
      </span>
      <div className="text-sm break-words text-[#858585] ">{truncatedDesc}</div>
      <div className="flex gap-4 justify-end px-2 items-center text-sm text-[#aeaeae]">
        <div className=" flex flex-shrink-0  gap-1 items-center">
          <span className="text-xs text-[#aeaeae]">{collegeName || null}</span>
          <span className="text-xs text-[#aeaeae]">|</span>
          <span className="text-xs">
            {username
              ? `@${username}`
              : `${customStyleProfile ? " " : "anonymous"}`}
          </span>
        </div>

        <span className="flex items-center">
          <BiUpvote className="mx-1  " />
          {totalUpvotes}
        </span>
        <span className="flex items-center">
          {" "}
          <FaRegClock className="mx-1 " />
          {timeSinceCreated}
        </span>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  postid: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  customStyleProfile: PropTypes.bool,
  customStyleSearch: PropTypes.bool,
  totalUpvotes: PropTypes.number,
  timeSinceCreated: PropTypes.string,
  collegeName: PropTypes.string,
};

export default PostCard;
