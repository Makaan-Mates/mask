import { FaRegEye, FaRegClock, FaEllipsisV } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import CommentSection from "./CommentSection";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentTextArea from "./CommentTextArea";
import { useDeletePost } from "../custom-hooks/useDeletePost";
import { useFetchUser } from "../custom-hooks/useFetchUser";
import UpvoteContainer from "./UpvoteContainer";
import BookmarkButton from "./BookmarkButton";
import {
  displayEditPostCard,
  storePostDetail,
} from "../features/addPostCardSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiComment } from "react-icons/bi";

const PostDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useFetchUser();
  const { postid } = useParams();
  const [postData, setPostData] = useState();
  const [showEditComponent, setShowEditComponent] = useState(false);
  const filteredCommentsLength = useSelector((state) => state.counter.value);
  const totalcomments = filteredCommentsLength;

  const deletePost = useDeletePost();
  const fetchPostDetails = async () => {
    const token = localStorage.getItem("token");
    const data = await fetch(`http://localhost:4000/api/post/${postid}`, {
      method: "GET",
      headers: {
        "CONTENT-TYPE": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await data.json();
    setPostData(json);
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (!postData) {
    return;
  }
  const { postDetails } = postData;

  const initialTitle = postDetails?.title;
  const initialDescription = postDetails?.description;
  const initialTopic = postDetails?.topic;

  dispatch(
    storePostDetail({
      title: initialTitle,
      description: initialDescription,
      topic: initialTopic,
    })
  );

  const renderDescriptionWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(
      urlRegex,
      (url) =>
        `<a href="${url}" target="_blank" class="text-blue-400 hover:text-blue-300" rel="noopener noreferrer">${url}</a>`
    );
  };

  const handleToggleEditComponent = () => {
    setShowEditComponent(!showEditComponent);
  };

  const handleEditPost = () => {
    dispatch(displayEditPostCard(true));
  };

  const handleDeletePost = async () => {
    await deletePost();
    navigate("/home ");
  };

  if (!userInfo) {
    return null;
  }
  // console.log(postDetails)

  return (
    <div className="w-4/5 px-5 py-8  bg-[#161616] ">
      <div className="topic text-sm font-semibold my-2 mx-4 text-[#aeaeae] ">
        <span>{postDetails?.topic}</span>
      </div>

      <div className="content-box w-[90%] 2xl:w-[80%] flex flex-col gap-6 bg-[#1C1C1C]  justify-between  px-5 py-10  rounded-md border-[0.2px] border-[#282828] ">
        <div className="tit-area flex flex-col gap-2">
          <div className="title">
            <h1 className=" text-4xl font-semibold text-[#F6F6F6]  ">
              {postDetails?.title}
            </h1>
          </div>
          <div className="writer text-sm flex gap-2 text-[#858585]">
            <span>New</span>
            <span>|</span>
            <span className="cursor-pointer hover:text-white">
              {postDetails?.user_id?.username || "anonymous"}
            </span>
          </div>
          <div className=" tit-info w-full  flex justify-between items-center text-[#9B9B9B] ">
            <div className="flex gap-3">
              <span className="flex gap-1 items-center">
                {" "}
                <FaRegClock className=" mr-1 text-lg text-[#9B9B9B] " />
                <span className="text-sm">{postData.timeSinceCreated}</span>
              </span>
              <span className="flex items-center">
                <FaRegEye className="mr-2 text-lg text-[#9B9B9B] " />
                857
              </span>
            </div>
            <div className="relative flex gap-3">
              <BookmarkButton />
              {/*<span className="flex items-center cursor-pointer">
              <FaRegBookmark className="mr-2 text-lg text-[#9B9B9B] hover:text-[#d2d2d2]" />
              </span>*/}
              {userInfo?._id === postDetails?.user_id._id && (
                <span
                  className=" flex items-center cursor-pointer"
                  onClick={handleToggleEditComponent}
                >
                  <FaEllipsisV className="mr-2 text-lg text-[#9B9B9B] hover:text-[#d2d2d2]" />
                </span>
              )}

              {showEditComponent && (
                <div className="absolute top-6 -left-7  w-40 h-30 flex flex-col items-center  rounded-lg bg-[#1C1C1C] overflow-hidden ">
                  <span
                    onClick={handleEditPost}
                    className="w-full h-10 flex justify-center items-center px-2 py-2 text-center font-semibold border-[1px] border-[#1B1B1B] bg-[#292929] text-[#d5d5d5] hover:bg-[#2e2e2e] cursor-pointer"
                  >
                    <MdModeEdit className="mr-1" /> Edit
                  </span>
                  <button
                    onClick={handleDeletePost}
                    className="w-full h-10 flex justify-center items-center px-2 py-2 text-center font-semibold border-[1px] border-[#1B1B1B] bg-[#292929] text-[#d5d5d5] hover:bg-[#2e2e2e] cursor-pointer"
                  >
                    <RiDeleteBin6Fill className="mr-1" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className="desc-content text-lg text-[#d8d8d8] whitespace-pre-wrap"
          dangerouslySetInnerHTML={{
            __html: renderDescriptionWithLinks(postDetails?.description || ""),
          }}
        ></div>
        <div className="flex items-center">
          <UpvoteContainer type="post" id={postid} />
          <BiComment className="ml-4 mr-2 mt-1 text-2xl text-[#9B9B9B] hover:text-[#d2d2d2] " />
          <span className="text-[#9B9B9B]">{totalcomments}</span>
        </div>
      </div>
      <CommentTextArea isReplySection={false} />
      <div className="commentsection w-full h-auto bg-[#161616]  px-5 py-4 rounded-md">
        <div>
          <CommentSection />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
