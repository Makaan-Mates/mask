import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  hideAddPostCard,
  displayEditPostCard,
} from "../features/addPostCardSlice";
import { topics } from "../utils/topics";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Select from "react-select";
import { useState,useEffect, useRef } from "react";

const AddPostCard = ({
  initialTitle,
  initialDescription,
  initialTopic,
  setReloadPosts,
  setPostEdited,
  postEdited,
  reloadPosts,
}) => {
  const dispatch = useDispatch();
  const showEditPostCard = useSelector(
    (state) => state.addPost.displayEditMode
  );

  const navigate = useNavigate();

  const [selectedTopic, setSelectedTopic] = useState(null);

  const { postid } = useParams();
  const title = useRef();
  const description = useRef();
  const addPostRef = useRef(null);

  const handleHidePostCard = () => {
    dispatch(hideAddPostCard());
    dispatch(displayEditPostCard(false));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addPostRef.current && !addPostRef.current.contains(event.target)) {
        dispatch(hideAddPostCard());
        dispatch(displayEditPostCard(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePublishPost = async () => {
    const token = localStorage.getItem("token");
    const data = await fetch("https://mask-backend.up.railway.app/post", {
      method: "POST",
      headers: {
        "CONTENT-TYPE": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title.current.value,
        description: description.current.value,
        topic: selectedTopic?.label,
      }),
    });

    const json = await data.json();
    console.log(json);
    dispatch(hideAddPostCard());
    navigate("/home");
    setReloadPosts(!reloadPosts);
  };

  const handleUpdatePost = async () => {
    const token = localStorage.getItem("token");
    await fetch(`https://mask-backend.up.railway.app/api/post/edit/${postid}`, {
      method: "POST",
      headers: {
        "CONTENT-TYPE": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        newTitle: title.current.value,
        newDescription: description.current.value,
        newTopic: selectedTopic?.label,
      }),
    });

    dispatch(displayEditPostCard(false));
    dispatch(hideAddPostCard());
    setPostEdited(!postEdited);
  };

  const options = topics.map((topic) => ({
    value: topic.id,
    label: topic.name,
  }));

  return (
    <>
      <div
        ref={addPostRef}
        className="w-[90%]  sm:w-[70%] h-[85vh] pb-2 fixed top-[12vh] left-0 rounded-lg  right-0 m-auto  bg-[#161616] z-50 "
      >
        <div className="w-full h-[8vh] sm:h-[10vh] flex justify-end px-6 py-4 border-b-[0.5px] border-[#282828]">
          <RxCross2
            className="text-2xl  sm:text-4xl cursor-pointer text-[#8c8c8c] hover:text-[#d2d2d2]"
            onClick={handleHidePostCard}
          />
        </div>
        <Select
          className="rounded-md w-full text-base sm:text-xl   bg-[#1C1C1C] border-[0.5px] border-[#282828] "
          options={options}
          defaultValue={options.find(
            (option) => option?.label === initialTopic
          )}
          onChange={(selectedOption) => setSelectedTopic(selectedOption)}
          styles={{
            option: (provided, state) => ({
              ...provided,
              fontSize: state.selectProps.myFontSize,
              backgroundColor: state.isSelected ? "#1C1C1C" : "#161616",
              color: "#f4f4f4",
              border: "1px solid #282828",
            }),
            control: (provided) => ({
              ...provided,
              backgroundColor: "#161616",
              borderWidth: "0.5px",
              borderColor: "#282828",
            }),
            placeholder: (provided) => ({
              ...provided,
              color: "#9B9B9B",
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "#f4f4f4",
            }),
            menu: (provided) => ({
              ...provided,
              marginTop: "0",
            }),
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
              marginTop: "-2px",
            }),
            input: (provided) => ({
              ...provided,
              color: "#f4f4f4",
            }),
          }}
          myFontSize="20px"
          placeholder="Select a topic"
          menuPortalTarget={document.body}
        />
        <div className="w-full h-[15vh]  px-2 py-4">
          <input
            className="w-[95%] h-full text-xl sm:text-3xl font-semibold bg-[#161616] rounded px-3 py-2 focus:outline-none  text-[#f4f4f4] placeholder:text-[#9B9B9B]"
            type="text"
            id="title"
            ref={title}
            placeholder="Write a specific title..."
            defaultValue={initialTitle}
          />
        </div>
        <div className="w-full h-[40vh] px-2 py-4">
          <textarea
            className="w-[96%] h-full text-base sm:text-xl  bg-[#161616] rounded px-3 py-2 focus:outline-none resize-none text-[#d8d8d8] placeholder:text-[#9B9B9B] scrollbar-thin scrollbar-thumb-zinc-500"
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
              className=" h-[6vh] flex gap-2 text-sm sm:text-lg items-center  px-6 py-2 border-[1px] border-[#1B1B1B] bg-[#292929] rounded-xl hover:bg-[#2e2e2e] transition duration-300  text-[#d5d5d5] "
            >
              <IoSend className="" />
              Update
            </button>
          ) : (
            <button
              onClick={handlePublishPost}
              className=" h-[6vh] flex gap-2 text-sm sm:text-lg items-center  px-6 py-2 border-[1px] border-[#1B1B1B] bg-[#292929] rounded-xl hover:bg-[#2e2e2e] transition duration-300  text-[#d5d5d5] "
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

AddPostCard.propTypes = {
  initialTitle: PropTypes.string,
  initialDescription: PropTypes.string,
  initialTopic: PropTypes.string,
  setReloadPosts: PropTypes.func,
  setPostEdited: PropTypes.func,
  postEdited: PropTypes.bool,
  reloadPosts: PropTypes.bool,
};
export default AddPostCard;