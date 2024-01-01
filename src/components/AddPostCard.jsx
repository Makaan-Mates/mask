/* eslint-disable react/prop-types */
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { hideAddPostCard,displayEditPostCard } from "../features/addPostCardSlice";
import { useRef } from "react";
import { topics } from "../utils/topics";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";


const AddPostCard = ({  initialTitle, initialDescription, initialTopic }) => {

  const dispatch = useDispatch();
  const showEditPostCard = useSelector((state)=>state.addPost.displayEditMode);


  const navigate = useNavigate();
  const handleHidePostCard = () => {
    dispatch(hideAddPostCard());
    dispatch(displayEditPostCard(false))
  };

  const { postid } = useParams();
  const title = useRef();
  const description = useRef();
  const topic = useRef();

  const handlePublishPost = async () => {
    const token = localStorage.getItem("token");
    const data = await fetch("http://localhost:4000/post", {
      method: "POST",
      headers: {
        "CONTENT-TYPE": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title.current.value,
        description: description.current.value,
        topic: topic.current.value,
      }),
    });

    const json = await data.json();
    console.log(json);
    dispatch(hideAddPostCard());
    navigate("/home");
    window.location.reload();

  };

  const handleUpdatePost = async () => {
    const token = localStorage.getItem("token");
    const data = await fetch(`http://localhost:4000/api/post/edit/${postid}`, {
      method: "POST",
      headers: {
        "CONTENT-TYPE": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        newTitle: title.current.value,
        newDescription: description.current.value,
        newTopic: topic.current.value
      }),
    });

    const json = await data.json();
    console.log(json);
    dispatch(hideAddPostCard());
    window.location.reload();

  };

  return (
    <>
      <div className="w-[70%] h-[85vh] pb-2 fixed top-[12vh] left-0  right-0 m-auto  bg-[#161616] z-50 rounded-lg ">
        <div className="w-full h-[10vh] flex justify-end px-6 py-4 border-b-[0.5px] border-[#282828]">
          <RxCross2
            className="text-4xl cursor-pointer text-[#8c8c8c] hover:text-[#d2d2d2]"
            onClick={handleHidePostCard}
          />
        </div>
        <div className="w-full h-[10vh] px-2  py-2 text-xl font-semibold ">
          <select
            className="rounded-md  w-full h-full focus:outline-none bg-[#1C1C1C] text-[#9B9B9B]"
            ref={topic}
            defaultValue={initialTopic}
          >
            <option disabled selected value="">
              Select a Topic
            </option>
            {topics.map((topic) => (
              <option key={topic.id}>{topic.name}</option>
            ))}
          </select>
        </div>
        <div className="w-full h-[15vh]  px-2 py-4">
          <input
            className="w-[95%] h-full text-3xl font-semibold bg-[#161616] rounded px-3 py-2 focus:outline-none  text-[#f4f4f4] placeholder:text-[#9B9B9B]"
            type="text"
            id="title"
            ref={title}
            placeholder="Write a specific title..."
            defaultValue={initialTitle}
          />
        </div>
        <div className="w-full h-[40vh] px-2 py-4">
          <textarea
            className="w-[96%] h-full text-xl  bg-[#161616] rounded px-3 py-2 focus:outline-none resize-none text-[#d8d8d8] placeholder:text-[#9B9B9B] scrollbar-thin scrollbar-thumb-zinc-500"
            type="text"
            ref={description}
            id="title"
            placeholder="Unleash your thoughts and paint the canvas of your imagination..."
            defaultValue={initialDescription}
          />
        </div>
        <div className="w-full h-[8vh] px-4 mb-4  flex justify-end">

          {showEditPostCard ? (
            <button
              onClick={handleUpdatePost}
              className=" h-[6vh] flex gap-2 items-center  px-6 py-2 border-[1px] border-[#1B1B1B] bg-[#292929] rounded-xl hover:bg-[#2e2e2e] transition duration-300  text-[#d5d5d5] "
            >
              <IoSend className="" />
               Update
            </button>
          ) : (
            <button
              onClick={handlePublishPost}
              className=" h-[6vh] flex gap-2 items-center  px-6 py-2 border-[1px] border-[#1B1B1B] bg-[#292929] rounded-xl hover:bg-[#2e2e2e] transition duration-300  text-[#d5d5d5] "
            >
              <IoSend className="" />
               Publish
            </button>
          )}

        </div>
      </div>
    </>
  );
};

export default AddPostCard;
