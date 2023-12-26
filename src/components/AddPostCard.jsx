import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { hideAddPostCard } from "../features/addPostCardSlice";

const AddPostCard = () => {
  const dispatch = useDispatch();
  const handleHidePostCard = () => {
    dispatch(hideAddPostCard());
  };
  return (
    <>
      <div className="w-[70%] left-0 right-0 m-auto top-24 h-[85vh] absolute bg-zinc-900 z-10 rounded-md  ">
        <div className="w-full flex justify-end px-6 py-4 border-b-[0.5px] border-zinc-600">
          <RxCross2
            className="text-4xl cursor-pointer text-zinc-100"
            onClick={handleHidePostCard}
          />
        </div>
        <div className="w-full h-20 px-2  py-2 text-xl font-semibold ">
          <select
            className="rounded-md  w-full h-12 focus:outline-none bg-zinc-800 text-zinc-200"
            placeholder="Choose "
          >
            <option disabled selected value="">
              Select a Topic
            </option>
            <option
              className="bg-zinc-800 text-zinc-200 p-2 m-1"
              value="option1"
            >
              Option 1
            </option>
            <option
              className="bg-zinc-800 text-zinc-200 p-2 m-1"
              value="option2"
            >
              Option 2
            </option>
            <option
              className="bg-zinc-800 text-zinc-200 p-2 m-1"
              value="option3"
            >
              Option 3
            </option>
          </select>
        </div>
        <div className="w-full px-2 py-4">
          <input
            className="w-[90%] text-3xl font-semibold bg-zinc-900 rounded px-3 py-2 focus:outline-none  text-zinc-200"
            type="text"
            id="title"
            placeholder="Write a specific title..."
          />
        </div>
        <div className="w-full h-[50%] px-2 py-4">
            <textarea
                className="w-full h-full text-xl  bg-zinc-900 rounded px-3 py-2 focus:outline-none resize-none text-zinc-200"
                type="text"
                id="title"
                placeholder="Unleash your thoughts and paint the canvas of your imagination..."
            />
        </div>
        <div className="w-full px-4 mb-4 flex justify-end">
            <button className="bg-zinc-800  text-zinc-100 px-4 py-2 rounded-md hover:bg-red-800 transition duration-300">Publish</button>
        </div>
      </div>
    </>
  );
};

export default AddPostCard;
