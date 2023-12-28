/* eslint-disable react/prop-types */
import { useState } from 'react';
import { topics } from '../utils/topics';

const TopicSelection = ({ onTopicsSelected }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);

  const handleTopicToggle = (topicName) => {
    if (selectedTopics.includes(topicName)) {
      setSelectedTopics((prevSelectedTopics) =>
        prevSelectedTopics.filter((selected) => selected !== topicName)
      );
    } else {
      if (selectedTopics.length < 4) {
        setSelectedTopics((prevSelectedTopics) => [...prevSelectedTopics, topicName]);
      }
    }
  };

  const handleDone = () => {
    console.log("dfjhfkjxnkj")
    if (selectedTopics.length >= 4) {
      onTopicsSelected(selectedTopics);
    } else {
      alert('Please select at least 4 topics before clicking Done.');
    }
  };



  return (
    <div className="min-h-[50vh] flex justify-center items-center">
      <div className="bg-zinc-100 text-zinc-900 p-0 rounded shadow-md w-[48vh] h-auto mt-2  ">
        <h2 className="text-3xl font-semibold mb-4">Topics to Follow</h2>
        <div className="flex flex-wrap">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`w-1/6 sm:w-1/3 md:w-1/4 lg:w-1/6 mb-2  ${
                selectedTopics.includes(topic.name)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              } rounded-md p-10 cursor-pointer transition-all duration-300`}
              onClick={()=>handleTopicToggle(topic.name)}
            >
              {topic.name}
            </div>
          ))}
        </div>
         {handleDone}
      </div>
    </div>
  );
};

export default TopicSelection;
