import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import NoteForm from './NoteForm';
import { createNote } from '../../utils/noteUtils';

export default function CreateNotePage() {
  const navigate = useNavigate();
  
  const handleSubmit = (noteData) => {
    createNote(noteData);
    navigate('/');
  };
  
  const handleClose = () => {
    navigate('/');
  };
  
  return (
    <MainLayout title="Create Note">
      <NoteForm 
        open={true}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </MainLayout>
  );
} 
