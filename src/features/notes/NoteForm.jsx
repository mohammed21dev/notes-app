import { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Typography,
  IconButton,
  Box,
  InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';

export default function NoteForm({ open, onClose, note, onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});
  const [titleCharCount, setTitleCharCount] = useState(0);
  const [contentCharCount, setContentCharCount] = useState(0);
  
  const TITLE_MAX_LENGTH = 50;
  const CONTENT_MAX_LENGTH = 1000;

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setTitleCharCount(note.title?.length || 0);
      setContentCharCount(note.content?.length || 0);
    } else {
      setTitle('');
      setContent('');
      setTitleCharCount(0);
      setContentCharCount(0);
    }
    setErrors({});
  }, [note, open]);

  const validate = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > TITLE_MAX_LENGTH) {
      newErrors.title = `Title must be ${TITLE_MAX_LENGTH} characters or less`;
    }
    
    if (!content.trim()) {
      newErrors.content = 'Content is required';
    } else if (content.length > CONTENT_MAX_LENGTH) {
      newErrors.content = `Content must be ${CONTENT_MAX_LENGTH} characters or less`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({ title: title.trim(), content: content.trim() });
      onClose();
    }
  };
  
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    setTitleCharCount(value.length);
    
    if (errors.title) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.title;
        return newErrors;
      });
    }
  };
  
  const handleContentChange = (e) => {
    const value = e.target.value;
    setContent(value);
    setContentCharCount(value.length);
    
    if (errors.content) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.content;
        return newErrors;
      });
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          pb: 1,
          pr: 7,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography variant="h5" component="div" sx={{ fontWeight: 600, flexGrow: 1 }}>
          {note ? 'Edit Note' : 'Create Note'}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 12,
            color: 'text.secondary',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 2 }}>
        <TextField
          autoFocus
          margin="normal"
          label="Title"
          fullWidth
          value={title}
          onChange={handleTitleChange}
          error={!!errors.title}
          helperText={errors.title || (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', color: titleCharCount > TITLE_MAX_LENGTH ? 'error.main' : 'text.secondary' }}>
              <span>Give your note a meaningful title</span>
              <span>{titleCharCount}/{TITLE_MAX_LENGTH}</span>
            </Box>
          )}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TitleIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        
        <TextField
          margin="normal"
          label="Content"
          fullWidth
          multiline
          rows={8}
          value={content}
          onChange={handleContentChange}
          error={!!errors.content}
          helperText={errors.content || (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', color: contentCharCount > CONTENT_MAX_LENGTH ? 'error.main' : 'text.secondary' }}>
              <span>Write your note here</span>
              <span>{contentCharCount}/{CONTENT_MAX_LENGTH}</span>
            </Box>
          )}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                <DescriptionIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          sx={{ borderRadius: 2, px: 3 }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          sx={{ borderRadius: 2, px: 3 }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
} 