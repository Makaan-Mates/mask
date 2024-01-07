import Header from "./Header";
import { useSelector } from "react-redux";
import AddPostCard from "./AddPostCard";
import { useFetchUserPosts } from "../custom-hooks/useFetchUserPosts";
import PostCard from "./PostCard";
import ProfileEdit from "./ProfileEdit";
const Profile = () => {
  const showAddPostCard = useSelector((state) => state.addPost.isPoppedUp);
  const fetchUserPosts = useFetchUserPosts();

  return (
    <>
      {showAddPostCard && <AddPostCard />}
      <div className={`${showAddPostCard ? "blur-md" : ""}`}>
        <Header />
        <div className=" flex flex-col max-md:items-center max-md:px-10 md:flex-row   gap-6">
          <ProfileEdit />
          <div className="your posts m-8 w-full  md:w-4/6">
            <div className=" bg-[#1C1C1C] w-full rounded-md border-[0.2px] border-[#282828] text-white px-5 py-5 ">
              <div className=" w-full bg-[#161616] py-2 px-2 flex flex-wrap">
                <h3 className="px-4 py-4 font-semibold text-xl text-[#9B9B9B]">
                  YOUR POSTS
                </h3>
                {fetchUserPosts &&
                  fetchUserPosts.map((post) => (
                    <PostCard
                      key={post._id}
                      title={post?.title}
                      description={post?.description}
                      topic={post?.topic}
                      username={post?.user_id?.username}
                      collegeName={post?.user_id?.college}
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
