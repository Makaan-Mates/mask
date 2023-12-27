import { FaRegEye, FaRegClock } from "react-icons/fa";

const PostCard = ({ title, description,topic }) => {

    const truncateDescription = (text, maxLength) => {
        const words = text?.split(' ');
        if (words?.length > maxLength) {
          return words.slice(0, maxLength).join(' ') + '...';
        }
        return text;
      };
      const truncatedDesc = truncateDescription(description, 20);

  return (
    <div className="w-2/4 2xl:w-1/3 flex flex-col bg-zinc-800 justify-between border-[0.2px] border-zinc-700 px-5 py-5 gap-4 cursor-pointer text-zinc-200 hover:border-zinc-600">
      <span className="text-sm font-semibold ">{topic}</span>
      <span className="text-2xl font-semibold">{title}</span>
      <div className="text-sm">{truncatedDesc}</div>
      <div className="flex gap-4 justify-end px-2 items-center">
        <span>@username</span>
        <span className="flex items-center">
          <FaRegEye className="mx-1" />
          Views
        </span>
        <span className="flex items-center">
          {" "}
          <FaRegClock className="mx-1" />2 hr
        </span>
      </div>
    </div>
  );
};

export default PostCard;
