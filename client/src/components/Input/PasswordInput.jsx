import  { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";

const PasswordInput = ({ value, onChange, placeholder }) => {
    const [isShowPassword, setIsShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }

  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded-md mb-3'>
        <input 
            value={value}
            onChange={onChange}
            type={isShowPassword ? "text": "password"}
            placeholder={placeholder || "Password"}
            className='w-full text-sm bg-transparent py-3 mr-3 rounded-md outline-none '
        />
        {
            isShowPassword?(
            <FaEye size={22} className='text-blue-800 cursor-pointer' onClick={() => toggleShowPassword()}/>
        ):(
            <LuEyeClosed size={22} className='text-blue-800 cursor-pointer' onClick={() => toggleShowPassword()}/>
        )
        }
    </div>
  )
}

export default PasswordInput