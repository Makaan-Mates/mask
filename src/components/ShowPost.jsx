import Asidebar from "./Asidebar";
import Header from "./Header";
import { useSelector } from "react-redux";
import AddPostCard from "./AddPostCard";
import PostDetail from "./PostDetail";
import SearchPosts from "./SearchPosts";

const ShowPost = () => {
  const showAddPostCard = useSelector((state) => state.addPost.isPoppedUp);
  const showSearchBar = useSelector((state) => state.addPost.searchPoppedUp);
 console.log(showSearchBar);

  return (
    <>
      {showAddPostCard && <AddPostCard />}
      {showSearchBar && <SearchPosts />}

      <div className={`${showAddPostCard || showSearchBar ? "blur-md" : ""}`}>
        <Header />
        <div className="flex ">
          <Asidebar />
          <PostDetail />
        </div>
      </div>
    </>
  )
}

export default ShowPost