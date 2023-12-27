import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { hideAddPostCard } from "../features/addPostCardSlice";
import { useRef } from "react";
import { topics } from "../utils/topics";


const AddPostCard = () => {

  const dispatch = useDispatch();
  const handleHidePostCard = () => {
    dispatch(hideAddPostCard());
  };

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
      body:JSON.stringify({
        title: title.current.value,
        description: description.current.value,
        topic: topic.current.value,
      })
    });

    const json = await data.json();
    console.log(json);
   dispatch(hideAddPostCard())
   window.location.reload()
   

  };

  return (
    <>
      <div className="w-[70%] h-[85vh] pb-2 fixed top-[12vh] left-0  right-0 m-auto  bg-zinc-900 z-50 rounded-lg ">
        <div className="w-full h-[10vh] flex justify-end px-6 py-4 border-b-[0.5px] border-zinc-600">
          <RxCross2
            className="text-4xl cursor-pointer text-zinc-100"
            onClick={handleHidePostCard}
          />
        </div>
        <div className="w-full h-[10vh] px-2  py-2 text-xl font-semibold ">
          <select
            className="rounded-md  w-full h-full focus:outline-none bg-zinc-800 text-zinc-200"
            ref={topic}
          >
            <option disabled selected value="">
              Select a Topic
            </option>
            {topics.map((topic)=> (
                <option key={topic.id}>
                    {topic.name}
                </option>
            ))}
          </select>
        </div>
        <div className="w-full h-[15vh]  px-2 py-4">
          <input
            className="w-[95%] h-full text-3xl font-semibold bg-zinc-900 rounded px-3 py-2 focus:outline-none  text-zinc-200"
            type="text"
            id="title"
            ref={title}
            placeholder="Write a specific title..."
          />
        </div>
        <div className="w-full h-[40vh] px-2 py-4">
          <textarea
            className="w-[96%] h-full text-xl  bg-zinc-900 rounded px-3 py-2 focus:outline-none resize-none text-zinc-200 scrollbar-thin scrollbar-thumb-zinc-500"
            type="text"
            ref={description}
            id="title"
            placeholder="Unleash your thoughts and paint the canvas of your imagination..."
          />
        </div>
        <div className="w-full h-[8vh] px-4 mb-4  flex justify-end">
          <button
            onClick={handlePublishPost}
            className="bg-zinc-800 h-[6vh] flex items-center text-zinc-100 px-4 py-2 rounded-md hover:bg-red-800 transition duration-300"
          >
            Publish
          </button>
        </div>
      </div>
    </>
  );
};

export default AddPostCard;
