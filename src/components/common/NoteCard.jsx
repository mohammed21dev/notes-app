import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatListDate } from '../../utils/dateUtils';

export default function NoteCard({ note }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/note/${note.id}`);
  };
  

  const getContentPreview = () => {
    const maxLength = note.title.length > 30 ? 80 : 120;
    if (note.content.length <= maxLength) return note.content;
    return `${note.content.substring(0, maxLength)}...`;
  };
  
  return (
    <Card 
      onClick={handleClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid', 
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography 
          variant="h6" 
          component="h3" 
          noWrap 
          sx={{ 
            mb: 1,
            fontWeight: 600,
            color: 'text.primary'
          }}
        >
          {note.title}
        </Typography>
        
        <Chip
          label={formatListDate(note.createdTime)}
          size="small"
          sx={{ 
            alignSelf: 'flex-start',
            bgcolor: 'rgba(99, 102, 241, 0.1)',
            color: 'primary.main',
            fontWeight: 500,
            fontSize: '0.7rem'
          }}
        />
      </Box>
      
      <CardContent sx={{ flexGrow: 1, pt: 1.5 }}>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.6
          }}
        >
          {getContentPreview()}
        </Typography>
      </CardContent>
    </Card>
  );
} 