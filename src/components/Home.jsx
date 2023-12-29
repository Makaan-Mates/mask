import { useEffect } from "react";
import Asidebar from "./Asidebar";
import Header from "./Header";
import { useSelector } from "react-redux";
import AddPostCard from "./AddPostCard";
import AllPosts from "./AllPosts";
import { useFetchUser } from "../custom-hooks/useFetchUser";

const Home = () => {
  
  const showAddPostCard = useSelector((state) => state.addPost.isPoppedUp);
  const fetchUser = useFetchUser()


  return (
    <>
      {showAddPostCard && <AddPostCard />}
      <div className={`${showAddPostCard ? "blur-md" : ""}`}>
        <Header />
        <div className="flex ">
          <Asidebar />
          <AllPosts />
        </div>
      </div>
    </>
  );
};

export default Home;
