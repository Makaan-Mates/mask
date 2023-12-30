import Header from "./Header";
import { useSelector } from "react-redux";
import AddPostCard from "./AddPostCard";
import { GoDotFill } from "react-icons/go";
import PostCard from "./PostCard";

const Profile = () => {
  const showAddPostCard = useSelector((state) => state.addPost.isPoppedUp);

  return (
    <>
      {showAddPostCard && <AddPostCard />}
      <div className={`${showAddPostCard ? "blur-md" : ""}`}>
        <Header />
        <div className="w-full flex px-10 py-10 gap-10">
          <div className="w-2/6 h-[50vh] bg-[#1C1C1C] rounded-md border-[0.2px] border-[#282828] text-white px-5 py-5">
            <div className="flex gap-10 items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img
                  src="https://i.pinimg.com/564x/16/0e/44/160e44f4fa8a509958d2cb9fc46b5c16.jpg"
                  alt=""
                />
              </div>
              <div className="text-xl font-semibold">username</div>
            </div>
            <div className="mt-2">
              <div className="text-sm font-semibold flex gap-2 items-center">
                <span>New</span>
                <span>
                  <GoDotFill className="text-xs" />
                </span>
                <span>Student</span>
                <span>
                  <GoDotFill className="text-xs" />
                </span>
                <span>Location</span>
              </div>
              <div className="text-sm font-semibold mt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
              </div>
            </div>
          </div>

          <div className="w-4/6 h-[75vh] bg-[#1C1C1C] rounded-md border-[0.2px] border-[#282828] text-white px-5 py-5 ">
            MY POSTS
            <div className="flex flex-wrap  ">
              <PostCard />
              <PostCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
