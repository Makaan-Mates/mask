
const Login = () => {
  return (
    <div className=" min-h-screen bg-zinc-800 flex justify-center items-center">
      <div className="bg-zinc-100 p-8 w-2/5 h-auto rounded shadow-md  text-zinc-900">
        <h2 className="text-3xl  font-semibold mb-4">Welcome back to Mask</h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-1 " htmlFor="email">
              Username
            </label>
            <input
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-black "
              type="text"
              id="username"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-black-500 "
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label className="ml-2" htmlFor="remember">
                Remember me
              </label>
            </div>
            <a className="underline" href="/">
              Forgot Password?
            </a>
          </div>
          <button className="w-full bg-zinc-800 text-white rounded py-2 px-4 hover:bg-zinc-900 transition duration-300">
            Login
          </button>
        </form>
        <a className="mt-5 hover:underline" href="/register"> Not on Mask yet! Sign up</a>
      </div>
    </div>
  )
}

export default Login