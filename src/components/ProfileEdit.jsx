import  {  useRef, useState } from "react"
import { GoDotFill } from "react-icons/go";
import { useFetchUser } from "../custom-hooks/useFetchUser";
import {useDispatch} from "react-redux"
import { isProfileEdited } from "../features/userSlice";

const ProfileEdit = () => {
 const {userInfo} = useFetchUser();
 const dispatch = useDispatch()
  const [editMode, setEditMode] = useState(false);
  const [profileEdited,setProfileEdited] = useState(false)
  const [newUsername, setNewUsername] = useState(userInfo?.username);
  const userId = userInfo?._id
  const username =useRef()
  
  const handleEditProfile = async () => {
    try {
    const token = localStorage.getItem("token");
    const data = await fetch(`https://mask-backend.up.railway.app/api/profile/edit/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        newUsername :username.current.value,
      })
    });

    const json = await data.json()
    console.log(json)
    setProfileEdited(!profileEdited)
    setEditMode(false)
  }
    catch(error){
      console.error(error?.message || " Profile Not Updated")
    }
  };

  dispatch(isProfileEdited(profileEdited))
  

  const handleEditClick = () => {
    setEditMode(true);
  };


  return (
    <div className="userinfo mx-8 md:relative w-full md:w-2/6 ">
            <div className="mt-8 h-[40vh] md:h-[60vh] sticky top-36  bg-[#1C1C1C] rounded-md border-[0.2px] border-[#282828] text-white px-5 py-5">
              <div className="flex gap-10 items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img
                    src="https://i.pinimg.com/564x/16/0e/44/160e44f4fa8a509958d2cb9fc46b5c16.jpg"
                    alt=""
                  />
                </div>
                {editMode ?  <div className= "">
        <input
          type="text"
          id="username"
          value = {newUsername}
          defaultValue={userInfo?.username}
          ref={username} onChange={(e)=> setNewUsername(e.target.value)} className="bg-[#1c1c1c] border border-gray-500 text-white rounded-sm px-2"
        />
      </div> :
                <div className="text-xl font-semibold">
                  {userInfo?.username}
                </div>}
              </div>
              <div className="mt-2">
                <div className="text-sm font-semibold flex gap-2 items-center">
                  <span>New</span>
                  <span>
                    <GoDotFill className="text-xs" />
                  </span>
                  <span>Student</span>
                  <span>
                    <GoDotFill className="text-xs" />
                  </span>
                  <span>India</span>
                </div>
               <div className="text-sm font-semibold mt-4">
                  i am a student at {userInfo?.college}
                </div> 
                <div>
                  {editMode ?  <button onClick = {handleEditProfile} className="bg-[#292929] text-[#9B9B9B] px-4 py-2 rounded-md mt-4">
        Save Changes
      </button>
                  : <button
                    onClick={handleEditClick}
                    className="bg-[#292929] text-[#9B9B9B] px-4 py-2 rounded-md mt-4"
                  >
                    Edit Profile
                  </button> }
                </div>
              </div>
            </div>
          </div>
  );
};

export default ProfileEdit;
