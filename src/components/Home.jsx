import Asidebar from "./Asidebar";
import Header from "./Header";
import { useSelector } from "react-redux";
import AddPostCard from "./AddPostCard";
import AllPosts from "./AllPosts";
import SearchPosts from "./SearchPosts";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PostDetail from "./PostDetail";
import { io } from "socket.io-client";
import { useFetchUser } from "../custom-hooks/useFetchUser";

const Home = () => {
  const showAddPostCard = useSelector((state) => state.addPost.isPoppedUp);
  const [reloadPosts, setReloadPosts] = useState(false);
  const [page, setPage] = useState(1);
  const [postEdited, setPostEdited] = useState(null);
  const showEditPostCard = useSelector(
    (state) => state.addPost.displayEditMode
  );
  const initialTitle = useSelector((state) => state.addPost.postDetails.title);
  const initialDescription = useSelector(
    (state) => state.addPost.postDetails.description
  );
  const initialTopic = useSelector((state) => state.addPost.postDetails.topic);
  const showSearchBar = useSelector((state) => state.addPost.searchPoppedUp);
  const [socket, setSocket] = useState(null);
  const { userInfo } = useFetchUser();
  // const senderName = userInfo?.username;
  // console.log(senderName);

  const location = useLocation();
  const isAllPosts = location.pathname === "/home";
  const isPostDetail = location.pathname.startsWith("/post/");

  useEffect(() => {
    if (isPostDetail) {
      window?.scrollTo(0, 0);
      setPage(1);
    }
  }, [isPostDetail]);

  //socket.io client
  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    console.log(`Socket connection established`, newSocket);
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (userInfo) {
      socket?.emit("newUser", userInfo?.username);
    }
  }, [socket, userInfo]);

  return (
    <>
      {showAddPostCard && (
        <AddPostCard
          reloadPosts={reloadPosts}
          setReloadPosts={setReloadPosts}
        />
      )}
      {showSearchBar && <SearchPosts />}
      {showEditPostCard && (
        <AddPostCard
          initialTitle={initialTitle}
          initialDescription={initialDescription}
          initialTopic={initialTopic}
          setPostEdited={setPostEdited}
          postEdited={postEdited}
        />
      )}

      <div
        className={`${
          showAddPostCard || showEditPostCard || showSearchBar ? "blur-md" : ""
        }`}
      >
        <Header socket={socket}  />
        <div className="flex  ">
          <Asidebar />
          {isAllPosts && (
            <AllPosts page={page} setPage={setPage} reloadPosts={reloadPosts} />
          )}
          {isPostDetail && (
            <PostDetail
              postEdited={postEdited}
              socket={socket}
              senderName={userInfo && userInfo?.username  }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
