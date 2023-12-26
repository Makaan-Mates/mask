const Register = () => {
  return (
    <div className="min-h-[70vh] flex justify-center ">
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
            placeholder="Remember your password"
          />
        </div>
        <button className="w-full bg-zinc-800 text-white rounded py-2 px-4 hover:bg-zinc-900 transition duration-300">
          Sign Up
        </button>
      </form>
      <a className="mt-4 hover:underline" href="/">Already on Mask! Login.</a>
    </div>
  </div>
  )
}

export default Register