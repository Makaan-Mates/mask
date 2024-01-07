import { useEffect, useState } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import AddPostCard from "./AddPostCard";
import PostCard from "./PostCard";

const BookMarkedPosts = () => {
  const showAddPostCard = useSelector((state) => state.addPost.isPoppedUp);
  const [bookMarkedPosts, setBookMarkedPosts] = useState();

  const fetchBookMarksDetails = async () => {
    const token = localStorage.getItem("token");
    const data = await fetch(
      "https://mask-backend.up.railway.app/api/user/bookmarks",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await data.json();
    setBookMarkedPosts(json);
  };

  useEffect(() => {
    fetchBookMarksDetails();
  }, []);

  return (
    <>
      {showAddPostCard && <AddPostCard />}
      <div className={`${showAddPostCard ? "blur-md" : ""}`}>
        <Header />
        <div className="w-full flex  items-center justify-center  gap-6">
          <div className="yourposts flex m-8 md:w-4/6">
            <div className=" bg-[#1C1C1C] w-full rounded-md border-[0.2px] border-[#282828] text-white px-5 py-5 ">
              <div className=" w-full bg-[#161616] py-2 px-2 flex flex-wrap">
                <h3 className="text-base pl-4 pr-2 py-4 font-semibold sm:text-xl text-[#9B9B9B]">
                  BOOKMARKED POSTS
                </h3>
                {bookMarkedPosts && bookMarkedPosts?.bookmarks?.length > 0 ? (
                  bookMarkedPosts?.bookmarks?.map((post) => (
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
                  ))
                ) : (
                  <div className="text-xs sm:text-base flex items-center text-[#9B9B9B]">(NONE!)</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookMarkedPosts;
