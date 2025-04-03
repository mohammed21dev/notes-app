import { useState, useEffect } from 'react';
import { 
  Grid, 
  Typography, 
  Fab, 
  Box, 
  TextField, 
  InputAdornment,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
import NoteCard from '../../components/common/NoteCard';
import EmptyState from '../../components/common/EmptyState';
import { getAllNotes } from '../../utils/noteUtils';

export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedNotes = getAllNotes();
    setNotes(storedNotes);
    setFilteredNotes(storedNotes);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = notes.filter(
        note => 
          note.title.toLowerCase().includes(lowercaseQuery) || 
          note.content.toLowerCase().includes(lowercaseQuery)
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes);
    }
  }, [searchQuery, notes]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <MainLayout title="My Notes">
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            color: 'text.primary',
            mb: 3
          }}
        >
          My Notes
        </Typography>
        
        <TextField
          fullWidth
          placeholder="Search notes..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchQuery ? (
              <InputAdornment position="end">
                <IconButton 
                  onClick={clearSearch}
                  edge="end"
                  size="small"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null
          }}
        />
        
        {notes.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {filteredNotes.length === 0 ? (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}
              >
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No matching notes found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try a different search term
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {filteredNotes.map((note) => (
                  <Grid item xs={12} sm={6} md={4} key={note.id}>
                    <NoteCard note={note} />
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Box>
      
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => navigate('/create')}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
        }}
      >
        <AddIcon />
      </Fab>
    </MainLayout>
  );
} 