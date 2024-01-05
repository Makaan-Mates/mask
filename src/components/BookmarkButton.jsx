import { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useFetchUser } from "../custom-hooks/useFetchUser";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { totalPostBookMarks } from "../features/counterSlice";

const BookmarkButton = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [postDetails, setPostDetails] = useState();
  const { userInfo, loading } = useFetchUser();
  const { postid } = useParams();
  const dispatch = useDispatch();

  const updateBookmark = async () => {
    const token = localStorage.getItem("token");
    const data = await fetch(
      `https://mask-backend.up.railway.app/api/user/bookmark/${postid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await data.json();
    const isBookmarked = json?.message?.bookmarks?.includes(postid);
    setIsBookmarked(isBookmarked);
  };

  const getUserDetails = async () => {
    const data = await fetch(
      `https://mask-backend.up.railway.app/api/post/bookmark/${postid}`
    );
    const json = await data.json();
    setPostDetails(json);
    setIsBookmarked(json?.bookmarkedUsers?.includes(userInfo?._id));
  };

  const totalBookMarkedUsers = postDetails?.bookmarkedUsers?.length;

  useEffect(() => {
    if (!loading) {
      getUserDetails();
      dispatch(totalPostBookMarks(totalBookMarkedUsers));
    }
  }, [loading, isBookmarked]);

  const handleBookmarkClick = () => {
    updateBookmark();
  };

  return (
    <div className="flex gap-4 py-2 items-center text-[#9B9B9B]">
      <span className="flex items-center cursor-pointer">
        {isBookmarked ? (
          <FaBookmark
            onClick={handleBookmarkClick}
            className="mr-2 text-lg text-[#9B9B9B] hover:text-[#d2d2d2]"
          />
        ) : (
          <FaRegBookmark
            onClick={handleBookmarkClick}
            className="mr-2 text-lg text-[#9B9B9B] hover:text-[#d2d2d2]"
          />
        )}
        {}
      </span>
    </div>
  );
};

export default BookmarkButton;
