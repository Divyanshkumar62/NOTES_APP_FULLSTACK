import { useState } from 'react'
import PasswordInput from '../../components/Input/PasswordInput'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/Helper'
import axios from 'axios'
import { toast } from 'react-toastify'

const Signup = () => { 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [name, setName] = useState("")

  const navigate = useNavigate()
  const url = "http://localhost:3000"

  const handleSignup = async (e) => {
    e.preventDefault()
    if(!name) {
      setError("Please Enter the Name")
      return;
    }
    if(!validateEmail(email)){
      setError("Please Enter a valid Email address")
      return;
    }
    if(!password){
      setError("Please Enter the Password")
      return;
    }
    setError("")

    // Backend Logic for signup
    try {
      const res = await axios.post(`${url}/api/auth/signup`, {username: name, email, password}, {withCredentials: true})

      if(res.data.success === false){
        toast.error(res.data.message)
        // setError(res.data.message)
        return;
      }
      setError("")

      toast.success(res.data.message)
      navigate('/login')

    } catch(err){
      toast.error(err.message)
      console.log(err.message)
      // setError(err.message)
    }
  }

  return (
    <div className='flex justify-center items-center mt-20'>
      <div className='w-96 rounded bg-white px-7 py-10'>
        <form onSubmit={handleSignup}>
          <h4 className='text-2xl mb-4 text-blue-700 font-medium'>Signup</h4>
          <input 
            type="text" 
            placeholder='Name' className='w-full text-sm bg-transparent py-3 mr-3 rounded-md outline-none border-[1.5px] px-5 mb-4'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            type="text" 
            placeholder='Email' className='w-full text-sm bg-transparent py-3 mr-3 rounded-md outline-none border-[1.5px] px-5 mb-4'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
          {/* Error Displaying Logic */}
          {error && <p className='text-red-500 text-sm pb-1'>{error}</p>}

          <button type='submit' className='btn-primary bg-blue-700 px-2 py-3 rounded-md w-20 text-white ml-[7.5rem]'>Signup</button>
          <p className='text-sm text-center mt-4'>
            Already Have an Account?{" "}
            <Link to={'/login'} className='font-medium text-blue-700'>Login to your account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup
