import { useDispatch } from "react-redux";
import { displayAddPostCard } from "../features/addPostCardSlice";
import { useFetchUser } from "../custom-hooks/useFetchUser";
import { topics } from "../utils/topics";
import { filterByTopic } from "../features/postSlice";

const Asidebar = () => {
  
  const fetchUser = useFetchUser();
  const dispatch = useDispatch();


  const handleToggleEvent = () => {
    dispatch(displayAddPostCard());
  };

  if (!fetchUser) {
    return null;
  }

  const allTopics = topics;

  const { topicsFollowing } = fetchUser.user;
  console.log(topicsFollowing);

  const exploreMoreTopics = allTopics.filter(
    (topic) =>
      !topicsFollowing.some(
        (followedTopic) => followedTopic.name === topic.name
      )
  );

  console.log(exploreMoreTopics);

  const handleTopicSelection = (selectedTopic)=>{
    dispatch(filterByTopic(selectedTopic))
  }

 

  return (
    <div className="bg-[#1C1C1C] w-1/5 px-5 py-10 border-r-[1px] border-[#282828] min-h-[88vh] self-start sticky top-[12vh] ">
      <div
        onClick={handleToggleEvent}
        className="text-l px-2 py-2 text-center font-semibold border-[1px] border-[#1B1B1B] bg-[#292929] text-[#d5d5d5]  rounded-xl hover:bg-[#2e2e2e] cursor-pointer sticky top-0"
      >
        WRITE A POST
      </div>

      <div className="scrollable-div max-h-[70vh] mt-8 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 pb-8">
        <div className="border-t-[1px] font-semibold   border-[#282828]"></div>
        <h1 className=" border-[#aeaeae] py-2 mt-4 font-semibold text-[#d5d5d5] text-sm">
          FOLLOWING
        </h1>
        <div className="text-[#9B9B9B] text-sm">
          {topicsFollowing.map((topic) => (
            <div className="hover:text-white py-2" key={topic.id}>
              <button  onClick={()=>handleTopicSelection(topic.name)} >{topic.name}</button>
            </div>
          ))}
        </div>
        <h1 className="border-t-[1px] font-semibold pt-6 mt-4 border-[#282828] py-2 text-[#d5d5d5] text-sm">
          EXPLORE MORE TOPICS
        </h1>
        {exploreMoreTopics.map((moreTopic) => (
          <div className="text-[#9B9B9B] text-sm py-2" key={moreTopic.id}>
            <button  onClick={()=>handleTopicSelection(moreTopic.name)} className="hover:text-white">{moreTopic.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Asidebar;
