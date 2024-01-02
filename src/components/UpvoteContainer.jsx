import { useEffect, useState } from "react";
import { BiUpvote, BiSolidUpvote } from "react-icons/bi";
import { useFetchUser } from "../custom-hooks/useFetchUser";
import PropTypes from "prop-types";

const UpvoteContainer = ({ type, id }) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [postDetails, setPostDetails] = useState();
  const [postid, setPostid] = useState();
  const { userInfo, loading } = useFetchUser();

  const updateUpvoteCounter = async () => {
    const token = localStorage.getItem("token");
    const data = await fetch(`http://localhost:4000/api/${type}/upvote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const info = await data.json();
    setIsUpvoted(info?.message?.upvotes?.includes(userInfo?._id));
    setPostid(info?.postDetails._id);
  };
  useEffect(() => {
    const getPostDetails = async () => {
      const data = await fetch(
        `http://localhost:4000/api/${type}/upvote/${id}`
      );
      const json = await data.json();
      setPostDetails(json);
      setIsUpvoted(json?.upvotes?.includes(userInfo?._id));
    };

    if (!loading) {
      getPostDetails();
    }
  }, [loading, isUpvoted, type, id, userInfo, setPostDetails, setIsUpvoted]);

  console.log(postid);

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
        {postDetails && postDetails?.upvotes?.length}
      </span>
    </div>
  );
};

UpvoteContainer.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default UpvoteContainer;
