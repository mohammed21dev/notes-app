import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function NoteList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <Button variant="contained" component={Link} to="/create">
        New Note
      </Button>
      <List>
        {notes.map((note) => (
          <ListItem key={note.id} component={Link} to={`/note/${note.id}`}>
            <ListItemText
              primary={note.title}
              secondary={format(new Date(note.createdTime), 'MMM dd, yyyy HH:mm')}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}