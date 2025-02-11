import { useState } from 'react'
import PasswordInput from '../../components/Input/PasswordInput'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/Helper'
import { useDispatch } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if(!validateEmail(email)){
      setError("Please Enter a valid Email address")
      return;
    }
    if(!password){
      setError("Please Enter the Password")
      return;
    }
    setError("")
    // Login Logic
    try {
      dispatch(signInStart())

      const res = await axios.post("http://localhost:3000/api/auth/signin", {email, password}, {withCredentials: true})

      if(res.data.success === false){
        console.log(res.data)
        toast.error(res.data.message)
        dispatch(signInFailure(res.data.message))
      }
      toast.success(res.data.message)
      dispatch(signInSuccess(res.data))
      navigate("/")

    } catch(err){
      toast.error(err.message)
      console.log(err)
      dispatch(signInFailure(err.message))
    }
  }

  return (
    <div className='flex justify-center items-center mt-20'>
      <div className='w-96 rounded bg-white px-7 py-10'>
        <form onSubmit={handleLogin}>
          <h4 className='text-2xl mb-4 text-blue-700 font-medium'>Login</h4>
          <input 
            type="text" 
            placeholder='Email' className='w-full text-sm bg-transparent py-3 mr-3 rounded-md outline-none border-[1.5px] px-5 mb-4'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>

          {error && <p className='text-red-500 text-sm pb-1'>{error}</p>}
          <button type='submit' className='btn-primary bg-blue-700 px-2 py-3 rounded-md w-20 text-white ml-[7.5rem]'>Login</button>
          <p className='text-sm text-center mt-4'>
            Not registered yet?{" "}
            <Link to={'/signup'} className='font-medium text-blue-700'>Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login