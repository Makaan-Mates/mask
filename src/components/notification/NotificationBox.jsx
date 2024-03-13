import { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const NotificationBox = ({ socket }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [openNoti, setOpenNoti] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState(
    "🎉 We just shipped notification feature, check it out! "
  );
  const apiUrl = import.meta.env.VITE_API_URL;

  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setOpenNoti(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("broadcastMessage") !== "shadev") {
      localStorage.setItem("broadcastMessage", broadcastMessage);
      // setBroadcastMessage("");
    }
  }, []);

  //socket.io client
  useEffect(() => {
    const fetchNotifications = async () => {
      if (localStorage.getItem("isGuest") === "true") {
        return;
      }
      const token = localStorage.getItem("token");
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await fetch(`${apiUrl}/api/notification`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        setNotifications(json);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    // Initial fetch
    fetchNotifications();

    const intervalId = setInterval(fetchNotifications, 15000);

    return () => clearInterval(intervalId);
  }, [apiUrl]);

  const handleClearNotifications = async () => {
    localStorage.setItem("broadcastMessage", "shadev");
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
      return;
    }
    const data = await fetch(`${apiUrl}/api/notification/clear`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const json = await data.json();
    console.log(json);
  };

  const handleNavigatePost = (postId) => {
    navigate(`/post/${postId}`);
    setOpenNoti(false);
  };

  const message = localStorage.getItem("broadcastMessage");

  const filteredNotifications =
    Array.isArray(notifications) &&
    notifications?.filter(
      (notification) => notification?.senderName !== notification?.receiverName
    );

  return (
    <div ref={notificationRef} className="">
      <div className="relative  ">
        <FaBell
          onClick={() => setOpenNoti(!openNoti)}
          className="text-2xl md:text-2xl cursor-pointer transition-transform transform text-[#9B9B9B] hover:text-white "
        />
        {filteredNotifications.length !== 0 || message !== "shadev" ? (
          <div className="absolute w-5 h-5 bg-red-800 rounded-full flex items-center justify-center  -top-3 -right-2">
            <span className="text-white  text-xs  md:text-sm font-medium text-center  rounded-full items-center">
              {filteredNotifications.length === 0
                ? "1"
                : filteredNotifications.length}
            </span>
          </div>
        ) : null}
      </div>

      {openNoti && (
        <div className="notifications  absolute top-[12vh] right-3 md:right-10  bg-[#161616] w-[95%]  md:w-[42%] max-h-[80vh]  overflow-y-auto rounded-lg backdrop-filter backdrop-blur-lg bg-opacity-40 border-[1px] border-[#353535] ">
          <div className="flex justify-between items-center pr-2 pl-4 border-b-[1px] border-[#717070] py-2">
            <h1 className="text-xl text-[#f4f4f4] font-bold">Notifications</h1>
            <div className="flex justify-end">
              <button
                onClick={handleClearNotifications}
                className="nButton text-xs text-[#d5d5d5]   bg-[#292929]  hover:bg-[#2e2e2e] py-2 my-4 mx-2 rounded-lg px-3 "
              >
                Clear Notifications
              </button>
            </div>
          </div>
          {message === "shadev" ? (
            " "
          ) : (
            <div className="text-lg pt-4 text-yellow-200 text-center">
              {message}
            </div>
          )}

          <div className="mt-2 p-2 overflow-y-auto">
            {filteredNotifications &&
              Array.isArray(filteredNotifications) &&
              filteredNotifications?.map((notification) => {
                return (
                  <div
                    onClick={() => handleNavigatePost(notification?.postId)}
                    key={notification._id}
                    className="notification px-2 py-2  border-b-[1px] border-[#353535] text-base cursor-pointer text-[#f4f4f4] hover:bg-[#272727] rounded-lg"
                  >{`${notification.senderName} ${
                    notification.notificationAction === "upvote"
                      ? "upvoted on"
                      : notification.notificationAction === "comment"
                      ? "commented on"
                      : notification.notificationAction === "reply"
                      ? "replied on"
                      : notification.notificationAction === "commentUpvote"
                      ? "upvoted on"
                      : ""
                  } ${
                    notification.notificationAction === "reply" ||
                    notification.notificationAction === "commentUpvote"
                      ? "your comment in"
                      : "your post"
                  } ${notification?.postTitle} `}</div>
                );
              })}
          </div>
          {notifications.length === 0 && (
            <div className="w-full text-center mb-4">No Notifications</div>
          )}
        </div>
      )}
    </div>
  );
};

NotificationBox.propTypes = {
  socket: PropTypes.object,
};

export default NotificationBox;
