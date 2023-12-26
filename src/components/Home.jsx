import { useEffect } from "react";
import Asidebar from "./Asidebar";
const Home = () => {
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
      console.log(json);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="flex ">
        <Asidebar />
        <h1 className="text-white px-5 py-10">All Posts Component</h1>
      </div>
    </>
  );
};

export default Home;
