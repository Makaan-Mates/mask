import { useEffect } from "react"
import {useDispatch} from "react-redux"
import { addAllPosts } from "../features/postSlice"


const AllPosts = () => {

  const dispatch = useDispatch()
 
  useEffect(()=>{
    const fetchAllPosts = async ()=>{
      const token = localStorage.getItem("token");
      const data = await fetch("http://localhost:4000/api/posts",{
        method: "GET",
        headers: {
          "CONTENT-TYPE": "application/json",
          authorization: `Bearer ${token}`,
        }
      })

      const json = await data.json()
      console.log(json)
      dispatch(addAllPosts(json))
    }


    fetchAllPosts()
  },[])




  return (
    <div className="px-5 py-5 ">AllPosts cards here</div>
  )
}

export default AllPosts