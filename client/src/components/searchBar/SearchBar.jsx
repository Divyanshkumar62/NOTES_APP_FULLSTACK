import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { RxCross2 } from "react-icons/rx";
const SearchBar = ({value, onChange, handleSearch, onClearSearch}) => {
  return (
    <div className='flex w-40 sm:w-60 md:w-80 bg-slate-200 px-4 rounded-lg items-center'>
        <input 
            type="text"
            placeholder='Search Notes...'
            className='w-full text-md bg-transparent py-[11px] outline-none text-slate-800 font-base'
            value={value}
            onChange = {onChange}
        />
        {
            value && <RxCross2 RxCross2 className='text-slate-800 font-bold cursor-pointer hover:text-blue-700 text-2xl mr-2' onClick={onClearSearch}/>
        }
            <FaMagnifyingGlass className='text-slate-800 font-bold cursor-pointer hover:text-blue-700 text-xl mr-2' onClick = {handleSearch}/>
        

    </div>
  )
}

export default SearchBar