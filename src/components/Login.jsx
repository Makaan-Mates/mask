import {useRef} from 'react'
import {useNavigate} from 'react-router-dom'


const Login = () => {

  const navigate = useNavigate()

  const email = useRef()
  const password = useRef()

  const loginUser = async (e)=>{
   e.preventDefault()
   const data = await fetch('https://mask-backend.up.railway.app/login' , {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email.current.value,
      password: password.current.value
    })
   })

   const json = await data.json()
   localStorage.setItem('token' , json.token)
   if(json.message==="logged in"){

    navigate('/home', {replace: true})
   }

  }  

  return (
    <div className=" h-[100vh] flex justify-center items-center ">
      <div className="bg-zinc-100 p-8 w-2/6 h-auto rounded shadow-md mt-10  text-zinc-900">
        <h2 className="text-3xl  font-semibold mb-4">Welcome back to Mask</h2>
        <form className="space-y-4 my-2">
          <div>
            <label className="block mb-1 " htmlFor="email">
              Email
            </label>
            <input
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-black "
              type="email"
              id="email"
              ref ={email}
              placeholder="Enter your email"
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
              ref={password}
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
          <button onClick={loginUser} className="w-full bg-zinc-800 text-white rounded py-2 px-4 hover:bg-zinc-900 transition duration-300">
            Login
          </button>
        </form>
        <a className="mt-5 hover:underline" href="/register"> Not on Mask yet! Sign up</a>
      </div>
    </div>
  )
}

export default Login