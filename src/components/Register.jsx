import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
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

    const data = await fetch("https://mask-backend.up.railway.app/register", {
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
      setErrorMessage(json?.message);
    }
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginGuest = async (e) => {
    e.preventDefault();
    const data = await fetch("https://mask-backend.up.railway.app/guest_login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await data.json();
    localStorage.setItem("token", response.token);
    console.log(response);
    localStorage.setItem("isGuest", "true");
    if (response.message === "Guest login successful") {
      navigate("/home");
    } else {
      setErrorMessage(response.message);
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
            placeholder="Create anonymous username"
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
            placeholder="Enter your college email"
          />
        </div>
        <div className="my-6  ">
          <label className="block mb-1" htmlFor="password">
            Create Password
          </label>
          <div className=" relative flex items-center">
            <input
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-[#1c1c1c] pr-10 "
              type={showPassword ? "text" : "password"}
              id="password"
              ref={password}
              placeholder="Remember your password"
            />
            {showPassword ? (
              <FaRegEyeSlash
                onClick={handleShowPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            ) : (
              <FaRegEye
                onClick={handleShowPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            )}
          </div>
        </div>
        <button
          onClick={registerUser}
          className="w-full mt-4 mb-4 bg-zinc-800 text-white rounded py-2 px-4 hover:bg-zinc-900 transition duration-300"
        >
          Sign Up
        </button>
        <button
          onClick={loginGuest}
          className="w-full bg-blue-800 text-white my-4 rounded py-2 px-4 hover:bg-blue-900 transition duration-300"
        >
          Login as Guest
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
