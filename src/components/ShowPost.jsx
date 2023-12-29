import Asidebar from "./Asidebar";
import Header from "./Header";
import { useSelector } from "react-redux";
import AddPostCard from "./AddPostCard";
import PostDetail from "./PostDetail";

const ShowPost = () => {
  const showAddPostCard = useSelector((state) => state.addPost.isPoppedUp);

  return (
    <>
      {showAddPostCard && <AddPostCard />}
      <div className={`${showAddPostCard ? "blur-md" : ""}`}>
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