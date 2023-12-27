import { useEffect } from "react";
import Asidebar from "./Asidebar";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useSelector } from "react-redux";
import AddPostCard from "./AddPostCard";
import AllPosts from "./AllPosts";

const Home = () => {
  const navigate = useNavigate();
  const showAddPostCard = useSelector((state) => state.addPost.isPoppedUp);


  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      const data = await fetch("http://localhost:4000/api/home", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await data.json();
      if (
        json?.message === "invalid token" ||
        json?.message === "token not found"
      ) {
        navigate("/login");
      }
    };

    fetchPosts();
  }, [navigate]);

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
