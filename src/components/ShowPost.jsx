import Asidebar from "./Asidebar";
import Header from "./Header";
import { useSelector } from "react-redux";
import AddPostCard from "./AddPostCard";
import PostDetail from "./PostDetail";
import SearchPosts from "./SearchPosts";

const ShowPost = () => {
  const showAddPostCard = useSelector((state) => state.addPost.isPoppedUp);
  const showEditPostCard = useSelector((state)=>state.addPost.displayEditMode);
  const initialTitle = useSelector((state)=>state.addPost.postDetails.title)
  const initialDescription = useSelector((state)=>state.addPost.postDetails.description)
  const showSearchBar = useSelector((state) => state.addPost.searchPoppedUp);


  return (
    <>
      {showAddPostCard  && <AddPostCard />}
      {showSearchBar && <SearchPosts />}
      {showEditPostCard &&  <AddPostCard initialTitle={initialTitle} initialDescription={initialDescription}/>}
      
      <div className={`${showAddPostCard || showEditPostCard || showSearchBar ? "blur-md" : ""}`}>

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