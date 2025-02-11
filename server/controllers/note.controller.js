import { errorHandler } from "../utils/error.js";
import Note from '../models/note.model.js'

export const addNote = async (req, res, next) => {
    const { title, content, tags } = req.body;

    const { id } = req.user;

    try {
        if(!title){
            return next(errorHandler(400, "Title is required"));
        }
        if(!content){
            return next(errorHandler(400, "Content is required"));
        }
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: id
        })
        await note.save()
        if(note){
            return res.status(201).json({
                success: true,
                message: "Note created Successfully",
                note
            })
        } else {
            return next(errorHandler(401, "Error occured while notes creation"))
        }

    } catch(err){
        next(err)
    }
}

export const editNote = async (req, res, next) => {
    const { noteId } = req.params;

    const note = await Note.findById(noteId)
    if(!note){
        return next(errorHandler(404, "Note not found"))
    }
    if(req.user.id !== note.userId){
        return next(errorHandler(403, "Not authorized to update this note"))
    }
    try {
        const { title, content, tags, isPinned } = req.body;

        if(!title && !content && !tags){
            return next(errorHandler(400, "No changed Provided"))
        }
        note.title = title || note.title;
        note.content = content || note.content;
        note.tags = tags || note.tags;
        note.isPinned = isPinned || note.isPinned;
        
        await note.save();
        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            note
        })
    } catch (err){
        next(err)
    }
}

export const getAllNote = async(req, res, next) => {
    const  userId  = req.user.id;
    try {
        const notes = await Note.find({userId: userId}).sort({ isPinned: -1 })
        return res.status(200).json({
            success: true,
            message: "All Notes Fetched Successfully",
            notes
        })
    } catch(err){
        next(err)
    }
}

export const deleteNote = async (req, res, next) => {
    const { noteId } = req.params;

    try {
        const note = await Note.findById({ _id: noteId, userId: req.user.id})
        if(!note){
            return next(errorHandler(404, "Note not found"))
        }
        const deletedNote = await Note.findByIdAndDelete({ _id: noteId, userId: req.user.id})
        if(deletedNote){
            return res.status(200).json({
                success: true,
                message: "Note deleted Successfully",
                deletedNote
            })
        }
    } catch (err){
        next(err);
    }
}

export const updateNotePinned = async (req, res, next) => {
    try {
        const { noteId } = req.params;
        const note = await Note.findById(noteId)
        if(!note){
            return next(errorHandler(404, "Note not found"))
        }
        if(req.user.id !== note.userId){
            return next(errorHandler(401, "You are not authorized to perform the updation"))
        }
        const { isPinned } = req.body;
        note.isPinned = isPinned;

        await note.save()
        res.status(200).json({
            success: true,
            message: "Note updated Successfully",
            note
        })
    } catch(err){
        next(err)
    }
}

export const searchNote = async (req, res, next) =>{
    const {query} = req.query
    if(!query){
        return next(errorHandler(400,"Search Query is required"))
    }
    try {
        const notes = await Note.find({
            userId: req.user.id,
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } }
            ]
        })
        res.status(200).json({
            success: true,
            message: "Notes matching the search query retrieved successfully",
            notes
        })
    } catch (err){
        next(err)
    }
}