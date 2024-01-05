import Header from "./Header";
import { useSelector } from "react-redux";
import AddPostCard from "./AddPostCard";
import { GoDotFill } from "react-icons/go";
import { useFetchUserPosts } from "../custom-hooks/useFetchUserPosts";
import PostCard from "./PostCard";

const Profile = () => {
  const showAddPostCard = useSelector((state) => state.addPost.isPoppedUp);
  const fetchUserPosts = useFetchUserPosts();
  console.log(fetchUserPosts);

  return (
    <>
      {showAddPostCard && <AddPostCard />}
      <div className={`${showAddPostCard ? "blur-md" : ""}`}>
        <Header />
        <div className="w-full flex  gap-6">
          <div className="userinfo mx-8 relative w-2/6 ">
            <div className="mt-8 h-[60vh] sticky top-36  bg-[#1C1C1C] rounded-md border-[0.2px] border-[#282828] text-white px-5 py-5">
              <div className="flex gap-10 items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img
                    src="https://i.pinimg.com/564x/16/0e/44/160e44f4fa8a509958d2cb9fc46b5c16.jpg"
                    alt=""
                  />
                </div>
                <div className="text-xl font-semibold">
                  {fetchUserPosts[0]?.user_id?.username}
                </div>
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
                  <span>India</span>
                </div>
                <div className="text-sm font-semibold mt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quos.
                </div>
                <div>
                    <button className="bg-[#292929] text-[#9B9B9B] px-4 py-2 rounded-md mt-4">Edit Profile</button>
                </div>
              </div>
            </div>
          </div>
          <div className="your posts m-8 w-4/6">
            <div className=" bg-[#1C1C1C] w-full rounded-md border-[0.2px] border-[#282828] text-white px-5 py-5 ">
              <div className=" w-full bg-[#161616] py-2 px-2 flex flex-wrap">
                <h3 className="px-4 py-4 font-semibold text-xl text-[#9B9B9B]">YOUR POSTS</h3>
                {fetchUserPosts &&
                  fetchUserPosts.map((post) => (
                    <PostCard
                      key={post._id}
                      title={post?.title}
                      description={post?.description}
                      topic={post?.topic}
                      postid={post._id}
                      totalUpvotes={post?.upvotes?.length}
                      timeSinceCreated={post?.timeSinceCreated}
                      customStyleProfile={true}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
