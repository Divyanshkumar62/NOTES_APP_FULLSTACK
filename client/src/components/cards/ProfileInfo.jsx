import React from 'react'
import { getInitials } from '../../utils/Helper'

const ProfileInfo = ({ onLogout, userInfo }) => {
  return (
    <div className='flex justify-center items-center gap-2'>
      <div className='w-12 h-12 flex justify-center items-center rounded-full text-blue-600 font-semibold bg-slate-200'>
        {getInitials(userInfo?.username)}
      </div>
      <div>
        <p className='text-base font-medium'>{userInfo?.username}</p>
      </div>
      <button className='text-base bg-red-600 px-2 py-1 rounded-md text-white hover:opacity-80 cursor-pointer' onClick={onLogout}>Logout</button>
    </div>
  )
}

export default ProfileInfo