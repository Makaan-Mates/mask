import { useEffect, useState } from "react";
import { BiComment, BiUpvote, BiSolidUpvote } from "react-icons/bi";
import { useParams } from "react-router-dom";

const UpvoteContainer = () => {
  const { postid } = useParams();
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [postDetails, setPostDetails] = useState();

  const updateUpvoteCounter = async () => {
    const token = localStorage.getItem("token");
    const data = await fetch(
      `http://localhost:4000/api/post/upvote/${postid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await data.json();
    setIsUpvoted(!isUpvoted);
    console.log(json);
  };

  const getPostDetails = async () => {
    const data = await fetch(`http://localhost:4000/api/upvote/${postid}`);
    const json = await data.json();
    setPostDetails(json);
  };

  useEffect(() => {
    getPostDetails();
  }, [isUpvoted]);

  const handleClick = () => {
    updateUpvoteCounter();
  };

  return (
    <div className="flex gap-4 py-2 items-center text-[#9B9B9B]">
      <span className="flex items-center cursor-pointer">
        {" "}
        {isUpvoted ? (
          <BiSolidUpvote
            onClick={handleClick}
            className="mx-1 text-2xl text-orange-500 "
          />
        ) : (
          <BiUpvote
            onClick={handleClick}
            className="mx-1 text-2xl text-[#9B9B9B] hover:text-[#d2d2d2]"
          />
        )}
        {postDetails && postDetails?.message?.upvotes?.length}
      </span>
      <span className="flex items-center cursor-pointer">
        <BiComment className="mx-1 mt-1 text-2xl text-[#9B9B9B] hover:text-[#d2d2d2] " />
        <span className="text-center">21</span>
      </span>
    </div>
  );
};

export default UpvoteContainer;
