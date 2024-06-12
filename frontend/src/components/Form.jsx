import {useState} from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants"
import "../styles/Form.css"
import { FaGoogle } from "react-icons/fa";

const Form = ({route, method}) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [submitClicked, setSubmitClicked] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const name = method === "login" ? "Login": "Register"
    console.log(method)

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        setSubmitClicked(true)

        try{
            const res = await api.post(route, {username, password})

            if(method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            }else{
                navigate("/login")
            }
        
        }catch(error){
            setError(true)
        }finally{
            setLoading(false)
        }
    }

  return ( 
    <>    
    <section className="h-screen">
  <div className="h-full">
    <div
      className="flex h-full flex-wrap items-center justify-center bg-gradient-to-br from-slate-900 to-purple-900">

      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
        <form onSubmit={handleSubmit} >
          <div
            className="flex flex-col items-center justify-center">
            <p className="mb-0 me-4 text-lg font-secondary">Sign in with</p>
            
          <button className="mt-2 scale-125 hover:scale-150"><FaGoogle/> </button>
          </div>

          <div
            className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
            <p
              className="mx-4 font-secondary mb-0 text-center font-semibold dark:text-white">
              Or
            </p>
          </div>
          {password && username && method === "login" && error && (
          <div className="flex justify-center align-middle">
          <p className="text-red-700 font-secondary">Your credentials are incorrect.</p>
          </div>
          )}

          {password && username && method == "register" && error && (
          <div className="flex justify-center align-middle">
          <p className="text-red-700 font-secondary">Account already exists!</p>
          </div>
          )}

          {!password && username && submitClicked && (
          <div className="flex justify-center align-middle">
          <p className="text-red-700 font-secondary" >Please input your password.</p>
          </div>
          )}

          {password && !username && submitClicked && (
          <div className="flex justify-center align-middle">
          <p className="text-red-700 font-secondary">Please input your username.</p>
          </div>
          )}

          <div className="relative mb-6" data-twe-input-wrapper-init>
          <label className="font-secondary">
              Username
            </label>
            <input
              value={username} onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="exampleFormControlInput2"
              className="font-secondary"
              placeholder="Username" />
            
          </div>

          <div className="relative" data-twe-input-wrapper-init>
          <label className="font-secondary">
              Password
            </label>
            <input
              value={password} onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="font-secondary"
              id="exampleFormControlInput22"
              placeholder="Password" />
          </div>

      
         


          <div className="text-center lg:text-left">
            <button
              type="button"
              className="font-secondary inline-block w-full rounded bg-primary px-7 pb-2 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              data-twe-ripple-init
              data-twe-ripple-color="light ">
              Login
            </button>
            <button className="bg-blue-500 mb-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" type="submit">{name}</button>

            {method === "login" && (
            <div className="flex flex-col items-center justify-center">
              <p className="font-secondary">Don't have an account? </p>
            <p className="flex justify-center items-center cursor-pointer hover:scale-110  mb-0 mt-2 pt-1 text-sm font-semibold bg-gray-500 text-white p-4 rounded-full">
              <div
                onClick={() => navigate("/register")}
                className="text-danger font-secondary transition mt-2 duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                >REGISTER</div>
            </p>
            </div>)}
            {method === "register" && (
            <div className="flex flex-col font-secondary items-center justify-center ">
            <p>Already have an account? </p>
            <p className="flex justify-center items-center cursor-pointer hover:scale-110   mb-0 mt-2 pt-1 text-sm font-semibold bg-gray-500 text-white p-4 rounded-full">
            <div
              onClick={() => navigate("/login")}
              className="text-danger font-secondary transition mt-2 duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
              >LOGIN</div>
          </p>
          </div>)}

          </div>
        </form>
      </div>
    </div>
  </div>
</section>

  </>
  )
}

export default Form