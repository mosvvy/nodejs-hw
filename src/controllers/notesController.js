import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { tag = 'Todo', search = '', page = 1, perPage = 10 } = req.query;

  const skip = (page - 1) * perPage;

  const notesQuery = Note.find();

  if (search) {
    notesQuery.where({
      title: { $regex: search, $options: 'i' },
    });
  }

  if (tag) {
    notesQuery.where('tag').equals(tag);
  }

  const [totalItems, notes] = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({ page, perPage, totalItems, totalPages, notes });
};

export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const newNote = new Note(req.body);
  const savedNote = await newNote.save();
  res.status(201).json(savedNote);
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const deletedNote = await Note.findByIdAndDelete(noteId);

  if (!deletedNote) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(deletedNote);
};

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;
  const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, {
    new: true,
  });

  if (!updatedNote) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(updatedNote);
};
