
import { useDispatch } from 'react-redux'
import { displayAddPostCard } from '../features/addPostCardSlice'

const Asidebar = () => {
  const dispatch = useDispatch()
  const handleToggleEvent = ()=>{
    dispatch(displayAddPostCard())
  }
  return (
    <div className="bg-[#1C1C1C] w-1/5 px-5 py-10 bg-inherit border-r-[1px] border-[#282828] min-h-[88vh] self-start sticky top-[12vh] ">
        <div onClick={handleToggleEvent} className="text-l px-2 py-2 text-center font-semibold border-[1px] border-[#1B1B1B] bg-[#292929]  rounded-xl hover:bg-[#2e2e2e] cursor-pointer sticky top-0">WRITE A POST
        </div>
        <hr className="border-b-2 border-[#282828] opacity-20 mb-8" />
        <h1 className="border-t-[1px] border-[#282828] py-2 text-[#FFFFFF]">TOPICS FOLLOWING</h1>

    </div>
  )
}

export default Asidebar