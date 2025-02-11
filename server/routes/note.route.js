import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'

import { addNote, deleteNote, editNote, getAllNote, searchNote, updateNotePinned } from '../controllers/note.controller.js'

const router = express.Router()

router.post('/add', verifyToken, addNote)
router.put('/edit/:noteId', verifyToken, editNote)
router.get('/all', verifyToken, getAllNote)
router.delete('/delete/:noteId', verifyToken, deleteNote)
router.put('/update-note-pinned/:noteId', verifyToken, updateNotePinned)
router.get("/search", verifyToken, searchNote)

export default router