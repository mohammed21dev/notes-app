import { v4 as uuidv4 } from 'uuid';

export const getAllNotes = () => {
  return JSON.parse(localStorage.getItem('notes')) || [];
};

export const getNoteById = (id) => {
  const notes = getAllNotes();
  return notes.find(note => note.id === id) || null;
};

export const createNote = (noteData) => {
  const notes = getAllNotes();
  
  const newNote = {
    id: uuidv4(),
    createdTime: new Date().toISOString(),
    ...noteData
  };
  
  localStorage.setItem('notes', JSON.stringify([newNote, ...notes]));
  return newNote;
};

export const updateNote = (id, noteData) => {
  const notes = getAllNotes();
  const index = notes.findIndex(note => note.id === id);
  
  if (index === -1) return null;
  
  const updatedNote = { ...notes[index], ...noteData };
  notes[index] = updatedNote;
  
  localStorage.setItem('notes', JSON.stringify(notes));
  return updatedNote;
};

export const deleteNote = (id) => {
  const notes = getAllNotes();
  const filteredNotes = notes.filter(note => note.id !== id);
  
  if (filteredNotes.length === notes.length) return false;
  
  localStorage.setItem('notes', JSON.stringify(filteredNotes));
  return true;
}; 
