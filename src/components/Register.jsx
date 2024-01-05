import { useRef,useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null)
  const username = useRef();
  const email = useRef();
  const password = useRef();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 6000); 

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const registerUser = async (e) => {
    e.preventDefault();

    const data = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }),
    });

    const json = await data.json();

    localStorage.setItem("token", json.token);
    if (json?.message === "account created!") {
      navigate("/verification");
    } else {
      setErrorMessage(json?.message)
    }

  };

 

  return (
    <div className="min-h-[100vh] flex justify-center items-center ">
      <div className="bg-[#f4f4f4] text-[#1c1c1c] p-8 rounded shadow-md 2xs:w-[90%] xs:w-[90%] md:w-3/4 sm:w-2/3 2xl:w-[28%] lg:w-2/6  h-auto mt-10">
        <h2 className="text-3xl  font-semibold mb-7">Welcome to Mask</h2>
       
          <div className="my-4">
            <label className="block mb-1" htmlFor="email">
              Username
            </label>
            <input
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-black "
              type="text"
              id="username"
              ref={username}
              placeholder="Create  username"
            />
          </div>

          <div className="my-4">
            <label className="block mb-1" htmlFor="password">
              Email
            </label>
            <input
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-black"
              type="email"
              id="email"
              ref={email}
              placeholder="Enter your email"
            />
          </div>
          <div className="my-4">
            <label className="block mb-1" htmlFor="password">
              Create Password
            </label>
            <input
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-black "
              type="password"
              id="password"
              ref={password}
              placeholder="Remember your password"
            />
          </div>
          <button
            onClick={registerUser}
            className="w-full mt-4 mb-4 bg-zinc-800 text-white rounded py-2 px-4 hover:bg-zinc-900 transition duration-300"
          >
            Sign Up
          </button>
    
        <a className="mt-4  hover:text-blue-900 hover:underline" href="/login">
          <span className="mt-4">Already on Mask! Login.</span>
        </a>
        <div className="errormessage w-full flex justify-center mt-4 text-red-800">
        {errorMessage}
      </div>
      </div>
     
    </div>
  );
};

export default Register;
