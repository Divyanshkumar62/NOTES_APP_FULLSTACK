import { useEffect, useState } from "react"
import NoteCard from "../../components/cards/NoteCard"
import { IoMdAddCircle } from "react-icons/io";
import Modal from 'react-modal'
import AddEditNotes from "./AddEditNotes";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import axios from "axios";
import { toast } from "react-toastify";
import EmptyCard from "../../components/EmptyCard/EmptyCard";


const Home = () => {
  const {currentUser, loading, errorDispatch} = useSelector((state) => state.user)

  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState(null)
  const [allNotes, setAllNotes] = useState([])
  const [isSearch, setIsSearch] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  })
  
  const onPinNote = () => {
    setIsPinned(!isPinned)
  }

  useEffect(()=> {
    if(currentUser === null || !currentUser)
      navigate("/login")
    else{
      setUserInfo(currentUser?.rest)
      getAllNotes()
    }
  }, [])

  // Get All Notes
  const getAllNotes = async () => {
    try{
      const res = await axios.get("http://localhost:3000/api/note/all", {withCredentials: true})

      if(res.data.success === false){
        console.log(res.data)
        return
      }

      setAllNotes(res.data.notes)

    } catch(err){
      console.log(err)
    }
  }

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({
      isShown: true,
      data: noteDetails,
      type: "edit"
    })
  }

  // Delete note logic
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const res = await axios.delete(`http://localhost:3000/api/note/delete/${noteId}`, {withCredentials: true})

      if(res.data.success === false){
        toast.error(res.data.message)
        return;
      }
      toast.success(res.data.message)
      getAllNotes()

    } catch(err){
      toast(err.message)
    }
  }

  const onSearchNote = async (query) => {
    try {
      const res = await axios.get("http://localhost:3000/api/note/search", { 
      params: {query}, 
      withCredentials: true 
    })
      if(res.data.success === false){
        toast.error(res.data.message)
        return;
      }
      setIsSearch(true)
      setAllNotes(res.data.notes)
    } catch(err){
      toast.error(err.message)
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false)
    getAllNotes()
  }

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const res = await axios.put(`http://localhost:3000/api/note/update-note-pinned/${noteId}`, {isPinned: !noteData.isPinned}, {withCredentials: true})

      if(res.data.success === false){
        toast.error(res.data.message)
        return;
      }
      let checkPinnedText = noteData.isPinned ? "Note Unpinned Successfully": "Note Pinned Successfully"
      toast.success(checkPinnedText)
      
      getAllNotes()

    } catch (err){
      toast.error(err.message)
    }
  }

  return (
  <>
    <Navbar userInfo={userInfo} onSearchNote = {onSearchNote} handleClearSearch = {handleClearSearch} />
    <div className='container mx-auto'>
      {allNotes?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-md:m-5">
        {allNotes.map((note, index) => (
            <NoteCard
              key={note._id} 
              title={note.title} 
              date={note.createdAt} 
              content={note.content} 
              tags={note.tags} 
              isPinned={note.isPinned} 
              onEdit={() => {
                handleEdit(note)
              }}
              onDelete={() => {
                deleteNote(note)
              }}
              onPinNote={() => {
                updateIsPinned(note)
              }}
            />
        ))}
        
      </div>
      ): (
      <EmptyCard imgSrc={
        isSearch ? "https://media.istockphoto.com/id/1149316411/vector/concept-404-error-page-flat-cartoon-style-vector-illustration.jpg?s=612x612&w=0&k=20&c=dLlOE7s6GuI4a5so_ipUFHeW9kaFWZVf-JTrFu5rAIk=" : "https://media.istockphoto.com/id/882917690/vector/pencil-with-paper-icon.jpg?s=612x612&w=0&k=20&c=AswM7O_mPKPz6783uSj9feo9SYiTmHtsY-Yh4g-S3Xk="
      } message={isSearch? "No Note Found matching your search! Try Searching again":`Ready to Capture your ideas? Click the 'Add' button to start noting down your thoughts, inspiration and remainders`} />
      )}  
    </div>
    <button className="w-22 h-22 flex justify-center items-center rounded-2xl bg-blue-600 hover:bg-blue-700 absolute right-10 bottom-10"
    onClick={() => {
      setOpenAddEditModal({ isShown: true, type: "add", data: null })
    }}
    >
      <IoMdAddCircle className="text-[32px] text-white"/>
    </button>

    <Modal 
      isOpen = {openAddEditModal.isShown}
      onRequestClose = {() => {}}
      style = {{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.2)",
        }
      }}
      contentLabel=""
      className="w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4 bg-white rounded-md mx-auto overflow-scroll p-5 mt-14"
    >
      <AddEditNotes 
        onClose={() => 
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        } 
        noteData = {openAddEditModal.data}
        type={openAddEditModal.type}
        getAllNotes = {getAllNotes}
      />
    </Modal>
  </>
  )
}

export default Home