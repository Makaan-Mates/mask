import {useRef,useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()
  const [errorMessage,setErrorMessage] = useState(null)

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 6000); 

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);


  const email = useRef()
  const password = useRef()

  const loginUser = async (e)=>{
   e.preventDefault()
   const data = await fetch('http://localhost:4000/login' , {
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
    navigate('/home')
   } else {
    setErrorMessage(json.message)
   }

  }  

  return (
    <div className=" h-[100vh] flex justify-center items-center ">
      <div className= " bg-[#f4f4f4] p-8 2xs:w-[90%] xs:w-[90%] md:w-3/4 sm:w-2/3 2xl:w-[28%] lg:w-2/6 h-auto rounded shadow-md mt-10  text-[#1c1c1c]">
        <h2 className="text-3xl  font-semibold mb-4">Welcome back to Mask</h2>
          <div className='my-6'>
            <label className="block mb-1 " htmlFor="email">
              Email
            </label>
            <input
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-[#1c1c1c] "
              type="email"
              id="email"
              ref ={email}
              placeholder="Enter your email"
            />
          </div>
          <div className='my-6'>
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-[#1c1c1c] "
              type="password"
              id="password"
              ref={password}
              placeholder="Enter your password"
            />
          </div>
          
          <div className="flex my-4 justify-between items-center">
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
          <button onClick={loginUser} className="w-full bg-zinc-800 text-white my-4 rounded py-2 px-4 hover:bg-zinc-900 transition duration-300">
            Login
          </button>
        <a className="mt-5 hover:underline hover:text-blue-900" href="/register"> Not on Mask yet! Sign up</a>
        <div className="errormessage w-full flex justify-center mt-4 text-red-800">
        {errorMessage}
      </div>
      </div>
    </div>
  )
}

export default Login