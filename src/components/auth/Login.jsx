import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const email = useRef();
  const password = useRef();

  const loginUser = async (e) => {
    e.preventDefault();
    const data = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
      }),
    });

    const json = await data.json();
    localStorage.setItem("token", json.token);
    if (json.message === "logged in") {
      navigate("/home");
    } else {
      setErrorMessage(json.message);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginGuest = async (e) => {
    e.preventDefault();
    const data = await fetch(`${apiUrl}/guest_login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await data.json();
    localStorage.setItem("token", response.token);
    // console.log(response);
    localStorage.setItem("isGuest", "true");
    if (response.message === "Guest login successful") {
      navigate("/home");
    } else {
      setErrorMessage(response.message);
    }
  };

  return (
    <div className=" h-[100vh] flex justify-center items-center ">
      <div className=" bg-[#1c1c1c] p-8 2xs:w-[90%] xs:w-[90%] md:w-3/4 sm:w-2/3 2xl:w-[28%] lg:w-2/6 h-auto rounded shadow-md mt-10  text-[#ffffff] bg-gradient-to-r from-[#141414] to-[#1c1c1c]">
        <div className="flex items-center justify-center">
          <h2 className="text-3xl max-md:text-2xl  font-semibold mb-4">
            Welcome back to Mask
          </h2>
        </div>
        <div className="my-6">
          <label className="block mb-1 " htmlFor="email">
            Email
          </label>
          <input
            className="w-full border rounded px-3 py-2 outline-none border-none focus:outline-none focus:border-[#1c1c1c] bg-[#1c1c1c] bg-gradient-to-r to-[#141414] from-[#1c1c1c]"
            type="email"
            id="email"
            ref={email}
            placeholder="Enter your email"
          />
        </div>
        <div className="my-6  ">
          <label className="block mb-1" htmlFor="password">
            Password
          </label>
          <div className=" relative flex items-center">
            <input
              className="w-full border rounded px-3 py-2 outline-none border-none focus:outline-none focus:border-[#1c1c1c] pr-10 bg-[#1c1c1c] bg-gradient-to-r to-[#141414] from-[#1c1c1c] "
              type={showPassword ? "text" : "password"}
              id="password"
              ref={password}
              placeholder="Enter your password"
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

        <div className="flex my-4 justify-between items-center">
          <div>
            <input type="checkbox" id="remember" className="" />
            <label className="ml-2 " htmlFor="remember">
              Remember me
            </label>
          </div>
          <a className="underline" href="/">
            Forgot Password?
          </a>
        </div>
        <button
          onClick={loginUser}
          className="w-full bg-[#1c1c1c] text-white my-4 rounded py-2 px-4 hover:bg-[#161616] transition duration-300"
        >
          Login
        </button>
        <button
          onClick={loginGuest}
          className="w-full bg-blue-800 text-white my-4 rounded py-2 px-4 hover:bg-blue-600 transition duration-300"
        >
          Login as Guest
        </button>
        <a
          className="mt-5 hover:underline hover:text-blue-900"
          href="/register"
        >
          {" "}
          Not on Mask yet! Sign up
        </a>
        <div className="errormessage w-full flex justify-center mt-4 text-red-800">
          {errorMessage}
        </div>
      </div>
    </div>
  );
};

export default Login;
