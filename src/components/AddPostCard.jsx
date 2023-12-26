import { RxCross2 } from "react-icons/rx";
import {useDispatch} from 'react-redux'
import { hideAddPostCard } from '../features/addPostCardSlice'

const AddPostCard = ()=>{

    const dispatch = useDispatch()
    const handleHidePostCard = ()=>{
        dispatch(hideAddPostCard())
    }
return(
    <>
    <div className="w-[70%] left-0 right-0 m-auto top-24 h-[80vh] absolute bg-zinc-900 z-10 rounded-md ">
        <div className='w-full flex justify-end px-6 py-4 '>
        <RxCross2 className='text-4xl cursor-pointer text-zinc-100' onClick={handleHidePostCard}/>

        </div>
    </div>
    </>
)
}

export default AddPostCard  