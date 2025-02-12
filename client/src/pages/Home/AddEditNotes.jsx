import React, { useState } from 'react'
import { RiCloseLargeFill } from "react-icons/ri";
import TagInput from '../../components/Input/TagInput';
import axios from 'axios';
import { toast } from 'react-toastify'


const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
    const [title, setTitle] = useState(noteData?.title || "")
    const [content, setContent] = useState(noteData?.content || "")
    const [tags, setTags] = useState(noteData?.tags || [])
    const [error, setError] = useState(null)
    
    const url = "https://notenest-backend-4zeo.onrender.com"
    const addNewNote = async () => {
        try {
            const res = await axios.post(`${url}/api/note/add`, {title, content, tags}, {withCredentials: true})

            if(res.data.success === false){
                console.log(res.data.message)
                // setError(res.data.message)
                toast.error(res.data.message)
                return;
            }
            toast.success(res.data.message)
            getAllNotes()
            onClose()
        }catch(err){
            toast.error(err.message)
            console.log(err)
            // setError(err)
        }
    }

    const editNote = async () => {
        const noteId = noteData._id;
        try {
            const res = await axios.put(`${url}/api/note/edit/${noteId}`,{title, content, tags}, {withCredentials: true}) 

            if(res.data.success == false){
                console.log(res.data.message)
                // setError(res.data.message)
                toast.error(res.data.message)
                return;
            }
            toast.success(res.data.message)
            getAllNotes()
            onClose()

        } catch(err){
            toast.error(err.message)
            console.log(err.message)
            // setError(err.message)
        }
    }

    const handleAddNote = () => {
        if(!title){
            setError("Please enter the title")
            return;
        }
        if(!content){
            setError("Please enter the content")
            return;
        }
       
        setError("")
        if(type === "edit"){
            editNote();
        } else {
            addNewNote();
        }
    }

  return (
      <div className='relative '>
      <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50'
        onClick={onClose}>
            <RiCloseLargeFill className='text-xl text-slate-400' />
        </button>
        <div className='flex flex-col gap-2 '>
            <label className='input-label text-red-400 text-sm  font-semibold uppercase'>title</label>
            <input type="text"
            placeholder='Wake up at 6am'
            value={title}
            onChange={({target}) => setTitle(target.value)}
            className="text-xl text-slate-950 outline-none"/>
        </div>
        <div className="flex flex-col gap-2 mt-4">
            <label className='input-label text-red-400 text-sm  font-semibold uppercase'>Content</label>
            <textarea type="text" className='text-md text-slate-950 outline-none bg-slate-50 p-2 rounded' placeholder='Content...'
            rows={6}
            value={content}
            onChange={({target}) => setContent(target.value)}
            ></textarea>
        </div>
        <div className='mt-3'>
            <label className='input-label text-red-400 text-sm font-semibold uppercase'>tags</label>
            <TagInput tags = {tags} setTags={setTags} />
        </div>
        {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}
        <button className='bg-blue-700 font-medium mt-5 px-3 py-2 text-white ml-48 hover:bg-blue-800'
        onClick={handleAddNote}
        >
            {type==="edit" ? "UPDATE": "ADD"}
        </button>
    </div>
  )
}

export default AddEditNotes
