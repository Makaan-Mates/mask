import { useRef } from "react";

import { useNavigate } from "react-router-dom";


const Register = () => {

  const navigate = useNavigate();

  const username = useRef();
  const email = useRef();
  const password = useRef();

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
      navigate("/register/topics-to-follow");
    }

  };

  return (
    <div className="min-h-[100vh] flex justify-center items-center ">
      <div className="bg-zinc-100 text-zinc-900 p-8 rounded shadow-md w-2/6 h-auto mt-10">
        <h2 className="text-3xl  font-semibold mb-4">Welcome to Mask</h2>
        <form className="space-y-4 my-2" action="">
          <div>
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

          <div>
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
          <div>
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
            className="w-full bg-zinc-800 text-white rounded py-2 px-4 hover:bg-zinc-900 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <span>
          Already on Mask!
          <a className="mt-4 hover:underline" href="/login">
            Login.
          </a>
        </span>
      </div>
    </div>
  );
};

export default Register;


