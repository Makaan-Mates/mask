
import {useDispatch} from 'react-redux'
import { displayAddPostCard } from '../features/addPostCardSlice'

const Asidebar = () => {
  const dispatch = useDispatch()
  const handleToggleEvent = ()=>{
    dispatch(displayAddPostCard())
  }
  return (
    <div className="w-1/5 px-5 py-10 bg-inherit border-r-[1px] border-zinc-900 min-h-[88vh] text-zinc-100">
        <div onClick={handleToggleEvent} className="text-l px-2 py-1 text-center font-semibold border-2 border-red-500 hover:border-red-700 text-zinc-100 rounded-md cursor-pointer">WRITE A POST
        </div>
        <hr className="border-b-2 border-zinc-900 opacity-20 mb-8" />
        <h1 className="border-t-[1px] border-zinc-900 py-2">TOPICS FOLLOWING</h1>

    </div>
  )
}

export default Asidebar