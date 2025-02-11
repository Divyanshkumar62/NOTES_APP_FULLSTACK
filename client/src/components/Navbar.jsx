import React, { useState } from 'react'
import ProfileInfo from './cards/ProfileInfo'
import SearchBar from './searchBar/SearchBar'
import { Link, useNavigate } from 'react-router-dom'
import { signInSuccess, signOutFailure, signOutStart, signOutSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = ({userInfo, onSearchNote, handleClearSearch}) => {
    const [searchQuery, setSearchQuery] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSearch = () => {
      if(searchQuery) {
        onSearchNote(searchQuery)
      }
    }
    const onClearSearch = () => {
        setSearchQuery("")
        handleClearSearch()
    }
    const onLogout = async () => {
      try {
        dispatch(signOutStart())

        const res = await axios.get("https://notenest-66l4.onrender.com/api/auth/signout", {withCredentials: true})

        if(res.data.success === false){
          dispatch(signOutFailure(res.data.message))
          toast.error(res.data.message)
          return;
        }
        toast.success(res.data.message)
        dispatch(signInSuccess())
        navigate('/login')

      } catch(err){
        toast.error(err.message)
        dispatch(signOutFailure(err.message))
      }
    }

  return (
    <section className=' bg-white flex justify-between items-center px-6 py-2 drop-shadow'>
        <Link to={'/'}>
          <h2 className='font-semibold text-2xl'>
            <span className='text-blue-700'>Good</span>
            <span className='text-gray-700'>Notes</span>
          </h2>
        </Link>
        
        <SearchBar value={searchQuery} onChange={({target}) => setSearchQuery(target.value)} handleSearch={handleSearch}  onClearSearch={onClearSearch} />
        <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
    </section>
  )
}

export default Navbar
