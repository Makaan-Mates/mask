import Header from "./Header";
import { useSelector } from "react-redux";
import AddPostCard from "./AddPostCard";
import { useRef } from "react";
import { IoSend } from "react-icons/io5";
import { useState } from "react";

const FeedBack = () => {
  const showAddPostCard = useSelector((state) => state.addPost.isPoppedUp);
  const [placeholder, setPlaceholder] = useState(
    "We value your feedback! Please share your thoughts with us to help improve this platform."
  );
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const feedback = useRef();
  const handleFeedbackChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleSubmitFeedback = async () => {
    if (!feedbackText.trim()) {
      return;
    }
    const token = localStorage.getItem("token");
    const data = await fetch(
      `${apiUrl}/api/user/feedback`,
      {
        method: "POST",
        headers: {
          "CONTENT-TYPE": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          feedback: feedback.current.value,
        }),
      }
    );
    const json = await data.json();
    console.log(json);
    feedback.current.value = "";
    setFeedbackText("");
    setPlaceholder("Thank you for your feedback!");
    setTimeout(() => {
      setPlaceholder(
        "We value your feedback! Please share your thoughts with us to help improve this platform."
      );
    }, 5000);

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <>
      {showAddPostCard && <AddPostCard />}
      <div className={`${showAddPostCard ? "blur-md" : ""}`}>
        <Header />
        <div className="w-full flex  items-center justify-center  gap-6">
          <div className="yourfeedbacks w-full flex m-8 md:w-4/6">
            <div className=" bg-[#1C1C1C] w-full h-[70vh] rounded-md border-[0.2px] border-[#282828] text-white px-5 py-5 ">
              <div className=" w-full h-[100%] bg-[#161616] py-2 px-2 flex flex-col gap-2">
                <h3 className="px-2 py-2 font-semibold text-xl text-[#9B9B9B]">
                  Any Feedback!
                </h3>
                <textarea
                  className="w-[96%] h-[60%]  text-base sm:text-xl  bg-[#161616] rounded px-3 py-2 focus:outline-none resize-none text-[#d8d8d8] placeholder:text-[#9B9B9B] scrollbar-thin scrollbar-thumb-zinc-500  placeholder:text-base"
                  type="text"
                  ref={feedback}
                  id="feedback"
                  value={feedbackText}
                  onChange={handleFeedbackChange}
                  placeholder={placeholder}
                />
                <div className="flex justify-end w-[96%] py-2">
                  <button
                    onClick={handleSubmitFeedback}
                    disabled={!feedbackText.trim()}
                    className={`h-[6vh] flex gap-2 text-sm sm:text-lg items-center  px-6 py-2 border-[1px] border-[#1B1B1B] bg-[#292929] rounded-xl hover:bg-[#2e2e2e] transition duration-300  text-[#d5d5d5] ${
                      isSubmitted ? "bg-green-800 text-black" : ""
                    }`}
                  >
                    <IoSend className="" />
                    {isSubmitted ? "Thanks" : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedBack;
