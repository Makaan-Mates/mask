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

  console.log(selectedTopics);

  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <div className="bg-zinc-100 text-zinc-900 p-8 rounded shadow-md w-2/3 h-auto mt-10">
        <span className="flex flex-col mb-4 px-2">
          <h2 className="text-3xl font-semibold">Topics To Follow</h2>
          <h3 className="px-1">Select atleast 4</h3>
        </span>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`min-w-20 text-sm  px-4 py-4 mx-2 my-2 rounded-md text-center  cursor-pointer transition-all duration-300 ${
                selectedTopics.find(
                  (selectedTopic) => selectedTopic.id === topic.id
                )
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => toggleTopic(topic.name, topic.id)}
            >
              {topic.name}
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleTopicsFollowing}
            className="mt-4  bg-zinc-800 text-white rounded py-2 px-4 hover:bg-zinc-900 transition duration-300"
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
