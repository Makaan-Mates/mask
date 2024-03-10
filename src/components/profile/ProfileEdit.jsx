import { useRef, useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { useFetchUser } from "../../custom-hooks/useFetchUser";
import { useDispatch } from "react-redux";
import { isProfileEdited } from "../../features/userSlice";

const ProfileEdit = () => {
  const { userInfo } = useFetchUser();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [profileEdited, setProfileEdited] = useState(false);
  const [newUsername, setNewUsername] = useState(userInfo?.username);
  const userId = userInfo?._id;
  const username = useRef();
  const [usernamEdited, setUsernameEdited] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleEditProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await fetch(`${apiUrl}/api/profile/edit/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newUsername: username.current.value,
        }),
      });

      const json = await data.json();
      console.log(json);

      if (json?.message !== "Profile Updated") {
        setErrorMessage(json?.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 4000);
      } else {
        setProfileEdited(!profileEdited);
        setUsernameEdited(true);
        setTimeout(() => {
          setUsernameEdited(false);
          setEditMode(false);
        }, 2000);
      }
    } catch (error) {
      console.error(error?.message || " Profile Not Updated");
    }
  };

  useEffect(() => {
    if (errorMessage && window.innerWidth > 640) {
      username.current.focus();
    }
  }, [errorMessage]);

  dispatch(isProfileEdited(profileEdited));

  const handleEditClick = () => {
    setEditMode(true);
  };

  return (
    <div className="userinfo mx-8 md:relative w-full md:w-2/6  ">
      <div className="mt-8 h-[50vh] md:h-[51vh] sticky top-36  bg-[#1C1C1C] rounded-md border-[0.2px] border-[#282828] text-[#f4f4f4] px-5 py-5 ">
        <div className="flex gap-10 items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img
              src="https://i.pinimg.com/564x/16/0e/44/160e44f4fa8a509958d2cb9fc46b5c16.jpg"
              alt=""
            />
          </div>
          {editMode ? (
            <div className="">
              <input
                type="text"
                id="username"
                value={newUsername}
                defaultValue={userInfo?.username}
                ref={username}
                onChange={(e) => setNewUsername(e.target.value)}
                autoFocus
                placeholder="Can't be empty"
                className="bg-[#1c1c1c] w-36 border border-gray-500 text-white rounded-md px-2 py-1 placeholder:text-xs"
              />
            </div>
          ) : (
            <div className="text-xl font-semibold">{userInfo?.username}</div>
          )}
        </div>
        <div className="mt-2 ">
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
          <div className="mt-10 mb-2">
            {editMode ? (
              <button
                onClick={handleEditProfile}
                disabled={!newUsername?.trim()}
                className={`bg-[#292929] text-[#f4f4f4] px-4 py-2 text-sm md:text-base rounded-md mt-4 
                ${usernamEdited ? "bg-green-800 text-[#f4f4f4]" : ""}
                } ${
                  !newUsername?.trim() ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {usernamEdited
                  ? `${
                      !newUsername?.trim()
                        ? "username not changed"
                        : "username updated"
                    }`
                  : "Update Username"}
              </button>
            ) : (
              <button
                onClick={handleEditClick}
                className="bg-[#292929] text-[#f4f4f4] px-4 py-2  text-sm md:text-base  rounded-md mt-4 hover:bg-[#2e2e2e]"
              >
                Edit username
              </button>
            )}
          </div>

          <span className="text-red-400 text-sm  md:text-base mt-4">
            {errorMessage}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
