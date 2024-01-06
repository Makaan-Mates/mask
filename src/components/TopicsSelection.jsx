/* eslint-disable react/prop-types */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { topics } from "../utils/topics";

const TopicsSelection = () => {
  const navigate = useNavigate();
  const [selectedTopics, setSelectedTopics] = useState([]);

  const saveSelectedTopics = async () => {
    const token = localStorage.getItem("token");
    const data = await fetch("https://mask-backend.up.railway.app/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        selectedTopics: selectedTopics,
      }),
    });

    const json = await data.json();
    if (json.message === "success") {
      navigate("/home");
    }
  };

  const toggleTopic = (topicName, topicId) => {
    setSelectedTopics((selectedTopics) => {
      // Logic if the topic is already selected, toggle and deselect it.
      if (selectedTopics.find((topic) => topic.id === topicId)) {
        const updatedTopics = selectedTopics.filter(
          (topic) => topic.id !== topicId
        );
        return updatedTopics;
      }

      if (selectedTopics.length !== 4) {
        const updatedTopics = [
          ...selectedTopics,
          { id: topicId, name: topicName },
        ];
        return updatedTopics;
      }
      console.log(selectedTopics);
      return selectedTopics;
    });
  };

  const handleTopicsFollowing = () => {
    saveSelectedTopics();
  };

  return (
    <div className="p-10 bg-[#1c1c1c] min-h-screen flex items-center justify-center ">
    <div className="w-full  m-auto right-0 left-0 flex flex-col justify-center items-center  ">
        <span className="flex flex-col  mb-4 px-2 text-[#f4f4f4] ">
          <h2 className="text-lg  md:text-3xl font-bold">Topics to Follow</h2>
          <h3 className="px-1  text-sm sm:text-base text-center">Select any 4</h3>
        </span>
        <div className="cardparent  w-full md:w-[75%] lg:w-[80%] xl:w-[85%]  flex flex-wrap items-center justify-center ">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`carddiv h-12 w-32 flex  flex-shrink-0 text-xs items-center justify-center  px-4 py-4 mx-2 my-2 rounded-lg text-center  cursor-pointer transition-all duration-300  ${
                selectedTopics.find(
                  (selectedTopic) => selectedTopic.id === topic.id
                )
                  ? "bg-[#b96d1d] text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => toggleTopic(topic.name, topic.id)}
            >
              {topic.name}
            </div>
          ))}
        </div>
        <div className="flex w-full justify-center">
          <button
            onClick={handleTopicsFollowing}
            className="mt-4 w-[80%] sm:w-56 xl:w-80 bg-zinc-800 text-white rounded-lg py-2 px-4 hover:bg-zinc-900 transition duration-300 "
          >
            Continue
          </button>
        </div>
    </div>
    </div>
  );
};

export default TopicsSelection;

//   topics.map((topic)=>{})
// POST request -> topic id and topic content --> topics
// topic id = req.body.topicId
// topic name = req.body.topicName

// selectedTopics -->
// const selectedTopics = [{topicid, topicname}, {topicid, topicname}]
