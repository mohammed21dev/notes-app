import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

export default function EmptyState() {
  const navigate = useNavigate();
  
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 2,
        textAlign: 'center',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        mt: 4
      }}
    >
      <NoteAddIcon 
        sx={{ 
          fontSize: 80, 
          color: 'primary.light',
          mb: 2,
          opacity: 0.7
        }} 
      />
      
      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom
        sx={{ fontWeight: 600, color: 'text.primary' }}
      >
        No notes yet
      </Typography>
      
      <Typography 
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 450, mb: 4 }}
      >
        Create your first note to get started. You can write anything you want - ideas, reminders, or important information.
      </Typography>
      
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<NoteAddIcon />}
        onClick={() => navigate('/create')}
        sx={{ 
          px: 4,
          py: 1.5,
          borderRadius: 2
        }}
      >
        Create Your First Note
      </Button>
    </Box>
  );
} 