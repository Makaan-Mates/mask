import Asidebar from "./Asidebar";
import Header from "./Header";
import { useSelector } from "react-redux";
import AddPostCard from "./AddPostCard";
import PostBox from "./PostBox";

const ShowPost = () => {
  const showAddPostCard = useSelector((state) => state.addPost.isPoppedUp);

  return (
    <>
      {showAddPostCard && <AddPostCard />}
      <div className={`${showAddPostCard ? "blur-md" : ""}`}>
        <Header />
        <div className="flex ">
          <Asidebar />
          <PostBox />
        </div>
      </div>
    </>
  )
}

export default ShowPost