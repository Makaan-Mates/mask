import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { displayAddPostCard } from '../features/addPostCardSlice'
import { useFetchUser } from '../custom-hooks/useFetchUser'
import { topics } from '../utils/topics'

const Asidebar = () => {
  const fetchUser = useFetchUser()
  const dispatch = useDispatch()
  const handleToggleEvent = ()=>{
    dispatch(displayAddPostCard())
  }

  if(!fetchUser){
    return null
  }

 const allTopics = topics;



  const {topicsFollowing}  = fetchUser.user;
  console.log(topicsFollowing)

  const exploreMoreTopics = allTopics.filter((topic) => !topicsFollowing.some((followedTopic) => followedTopic.name === topic.name));

  console.log(exploreMoreTopics)


  return (
    <div className="bg-[#1C1C1C] w-1/5 px-5 py-10 border-r-[1px] border-[#282828] min-h-[88vh] self-start sticky top-[12vh] ">
        <div onClick={handleToggleEvent} className="text-l px-2 py-2 text-center font-semibold border-[1px] border-[#1B1B1B] bg-[#292929] text-[#d5d5d5]  rounded-xl hover:bg-[#2e2e2e] cursor-pointer sticky top-0">WRITE A POST
        </div>
        <hr className="border-b-2 border-[#282828] opacity-20 mb-8" />
        <div className='scrollable-div max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300'>
        <h1 className="border-t-[1px] border-[#282828] py-2 text-[#FFFFFF] text-lg">TOPICS FOLLOWING</h1>
        <div className='text-white mt-8'>{topicsFollowing.map((topic)=>(
          <div key={topic.id}>
            <button>{topic.name}</button>
          </div>
        ))}</div>
        <h1 className='border-t-[1px] font-bold text-lg mt-4 border-[#282828] py-2 text-[#FFFFFF]'>Explore more topics</h1>
        {exploreMoreTopics.map((moreTopic)=>(
          <div className='text-white' key={moreTopic.id}>
          <button>{moreTopic.name}</button>
        </div>
        ))}
        </div>
        

    </div>
  )
}

export default Asidebar