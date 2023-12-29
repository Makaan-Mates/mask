/* eslint-disable react/prop-types */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { topics } from "../utils/topics";

const TopicsSelection = () => {
  const navigate = useNavigate();
  const [selectedTopics, setSelectedTopics] = useState([]);

  const saveSelectedTopics = async () => {
    const token = localStorage.getItem("token");
    const data = await fetch("http://localhost:4000/topics", {
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


      if(selectedTopics.length !== 4){
        const updatedTopics = [...selectedTopics,{id:topicId,name:topicName}]
        return updatedTopics
      }
      console.log(selectedTopics);
      return selectedTopics;
    });
  };

  const handleTopicsFollowing = () => {
    saveSelectedTopics();

  };

  console.log(selectedTopics);

  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <div className="bg-zinc-100 text-zinc-900 p-8 rounded shadow-md w-2/3 h-auto mt-10">
        <h2 className="text-3xl font-semibold mb-4">Topics To Follow</h2>
        <h3>Select atleast 3</h3>
        <div className="flex flex-wrap">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 mb-2 ${
                selectedTopics.find(
                  (selectedTopic) => selectedTopic.id === topic.id
                )
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } rounded-md p-2 cursor-pointer transition-all duration-300`}
              onClick={() => toggleTopic(topic.name, topic.id)}
            >
              {topic.name}
            </div>
          ))}
        </div>
        <button
          onClick={handleTopicsFollowing}
          className="mt-4 w-full bg-zinc-800 text-white rounded py-2 px-4 hover:bg-zinc-900 transition duration-300"
        >
          Done
        </button>
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
