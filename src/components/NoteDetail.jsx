import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material';
import { format } from 'date-fns';
import NoteForm from './NoteForm';

export default function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const foundNote = notes.find(n => n.id === id);
    setNote(foundNote);
  }, [id]);

  const handleDelete = () => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = notes.filter(n => n.id !== id);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    navigate('/');
  };

  const handleUpdate = (updatedNote) => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = notes.map(n => 
      n.id === id ? { ...n, ...updatedNote } : n
    );
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNote(prev => ({ ...prev, ...updatedNote }));
    setEditModalOpen(false);
  };

  if (!note) return <div>Note not found</div>;

  return (
    <Container className="container">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {note.title}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          Created: {format(new Date(note.createdTime), 'PPpp')}
        </Typography>
        <Typography variant="body1" paragraph>
          {note.content}
        </Typography>
        
        <Button 
          variant="contained" 
          sx={{ mr: 2 }}
          onClick={() => setEditModalOpen(true)}
        >
          Edit
        </Button>
        <Button 
          variant="outlined" 
          color="error"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Box>

      <NoteForm
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        note={note}
        onSubmit={handleUpdate}
      />
    </Container>
  );
}