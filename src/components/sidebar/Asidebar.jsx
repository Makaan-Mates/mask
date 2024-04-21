import { useDispatch } from "react-redux";
import { displayAddPostCard } from "../../features/addPostCardSlice";
import { useFetchUser } from "../../custom-hooks/useFetchUser";
import { topics } from "../../utils/topics";
import { filterByTopic } from "../../features/postSlice";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const Asidebar = ({ customStyleAsidebarMobile, hideAsideBar }) => {
  const navigate = useNavigate();
  const { userInfo, loading } = useFetchUser();
  const dispatch = useDispatch();
  const activeTopic = useSelector((state) => state.posts.data.topic);

  const handleTopicSelection = (selectedTopic) => {
    dispatch(filterByTopic(selectedTopic));
    navigate("/home");
    hideAsideBar();
  };

  const handleToggleEvent = () => {
    if (localStorage.getItem("isGuest") !== "true") {
      dispatch(displayAddPostCard());
    } else {
      toast("Please Login with college email to post on mask.", {
        className: "bg-[#161616]",
      });
    }
  };

  const allTopics = topics;

  const { topicsFollowing = [] } = userInfo || {};

  const exploreMoreTopics = allTopics?.filter(
    (topic) =>
      !topicsFollowing.some(
        (followedTopic) => followedTopic.name === topic.name
      )
  );

  const customstyle = customStyleAsidebarMobile
    ? "w-[65%] h-[100vh] absolute top-0 left-0 px-2 flex flex-col   z-50 "
    : "hidden";

  return (
    <div
      className={` bg-[#1C1C1C] md:block   md:w-2/5 lg:w-2/6 xl:w-1/5 md:px-5 md:pt-10 border-r-[1px] border-[#282828] min-h-[88vh] self-start md:sticky md:top-[12vh]  ${customstyle}`}
    >
      <div
        onClick={handleToggleEvent}
        className="hidden md:block text-l px-2 py-2 text-center font-semibold border-[1px] border-[#1B1B1B] bg-[#292929] text-[#d5d5d5]  rounded-xl hover:bg-[#2e2e2e] cursor-pointer sticky top-0 "
      >
        WRITE A POST
      </div>
      <div className="flex items-center justify-between px-2">
        <span className="md:hidden text-center pt-3 text-xl text-[#f4f4f4] ">
          {" "}
          Topics
        </span>
        <IoIosArrowBack
          onClick={hideAsideBar}
          className="text-2xl text-[#313131] md:hidden mt-3 animate-bounce-x"
        />
      </div>

      <div className="md:scrollable-div max-h-[90vh]  md:max-h-[70vh] mt-4 md:mt-8 overflow-y-auto scrollbar-custom-width scrollbar-thumb-gray-500 scrollbar-track-gray-300 ">
        <div className="border-t-[1px] font-semibold border-[#282828]"></div>
        <h1 className=" border-[#aeaeae] py-2 mt-4 font-semibold text-[#d5d5d5] text-sm">
          FOLLOWING
        </h1>
        {loading ? (
          <div className="animate-pulse mt-4">
            <div className="h-4 bg-[#282828] rounded w-3/4"></div>
            <div className="h-4 bg-[#282828] rounded w-3/4 mt-5"></div>
            <div className="h-4 bg-[#282828] rounded w-3/4 mt-5"></div>
            <div className="h-4 bg-[#282828] rounded w-3/4 mt-5"></div>
          </div>
        ) : (
          <div className="text-[#9B9B9B] text-sm ">
            {localStorage.getItem("isGuest") === "true" && (
              <>
                <div
                  className={`hover:text-[#d1d1d1]  bg-[#292929] w-fit px-4 py-2 rounded-lg `}
                  key={1}
                >
                  <button
                    onClick={() => {
                      navigate("/login");
                      localStorage.removeItem("isGuest");
                      localStorage.removeItem("token");
                    }}
                  >
                    Login to follow topics
                  </button>
                </div>
              </>
            )}
            {Array.isArray(topicsFollowing) &&
              topicsFollowing.map((topic) => (
                <div
                  className={`hover:text-white w-fit px-4 py-2 rounded-lg ${
                    topic.name === activeTopic ? "bg-[#282828] " : ""
                  }`}
                  key={topic.id}
                >
                  <button onClick={() => handleTopicSelection(topic.name)}>
                    {topic.name}
                  </button>
                </div>
              ))}
          </div>
        )}

        <h1 className="border-t-[1px] font-semibold pt-6 mt-4 border-[#282828] py-2 text-[#d5d5d5] text-sm">
          EXPLORE MORE TOPICS
        </h1>
        {loading ? (
          <div className="animate-pulse mt-4">
            <div className="h-4 bg-[#282828] rounded w-3/4"></div>
            <div className="h-4 bg-[#282828] rounded w-3/4 mt-5"></div>
            <div className="h-4 bg-[#282828] rounded w-3/4 mt-5"></div>
            <div className="h-4 bg-[#282828] rounded w-3/4 mt-5"></div>
            <div className="h-4 bg-[#282828] rounded w-3/4 mt-5"></div>
            <div className="h-4 bg-[#282828] rounded w-3/4 mt-5"></div>
            <div className="h-4 bg-[#282828] rounded w-3/4 mt-5"></div>
            <div className="h-4 bg-[#282828] rounded w-3/4 mt-5"></div>
          </div>
        ) : (
          exploreMoreTopics.map((moreTopic) => (
            <div
              className={`text-[#9B9B9B] w-fit px-4 text-sm py-2 rounded-lg ${
                moreTopic.name === activeTopic ? "bg-[#2B2B2B]" : ""
              }`}
              key={moreTopic.id}
            >
              <button
                onClick={() => handleTopicSelection(moreTopic.name)}
                className="hover:text-white"
              >
                {moreTopic.name}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

Asidebar.propTypes = {
  customStyleAsidebarMobile: PropTypes.bool,
  hideAsideBar: PropTypes.func,
};

export default Asidebar;
