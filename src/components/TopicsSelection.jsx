/* eslint-disable react/prop-types */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { topics } from "../utils/topics";

const TopicsSelection = () => {
  const navigate = useNavigate();
  const [selectedTopics, setSelectedTopics] = useState([]);

  const toggleTopic = (topic) => {
    setSelectedTopics((selectedTopics) => {
      if (selectedTopics.includes(topic)) {
        // If the topic is already selected, remove it
        const updatedTopics = selectedTopics.filter(
          (selected) => selected !== topic
        );
        console.log("updatedTopics", updatedTopics);
        return updatedTopics;
      }
      if (selectedTopics.length !== 3) {
        const updatedTopics = [...selectedTopics, topic];
        console.log("limit not reached", updatedTopics);
        return updatedTopics;
      }
      console.log("selectedTopics", selectedTopics);
      return selectedTopics;
    });
  };

  const handleSelection = () => {
    if (selectedTopics.length === 3) {
        console.log("done")
      navigate("/home");}
      
  };

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
                selectedTopics.includes(topic.name)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } rounded-md p-2 cursor-pointer transition-all duration-300`}
              onClick={() => toggleTopic(topic.name)}
            >
              {topic.name}
            </div>
          ))}
        </div>
        <button
          onClick={handleSelection}
          className="mt-4 w-full bg-zinc-800 text-white rounded py-2 px-4 hover:bg-zinc-900 transition duration-300"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default TopicsSelection;