import { AppBar, Toolbar, Typography, Box, Container, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NoteIcon from '@mui/icons-material/Note';
import LogoutIcon from '@mui/icons-material/Logout';

export default function MainLayout({ children, title = 'Notes App' , setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      alignItems: 'center',
      width: '100%'
    }}>
      <AppBar position="sticky" elevation={0} sx={{ 
        bgcolor: 'white', 
        borderBottom: '1px solid', 
        borderColor: 'divider',
        width: '100%'
      }}>
        <Toolbar sx={{ maxWidth: 'md', width: '100%', mx: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
            <NoteIcon sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ color: 'primary.main', fontWeight: 700 }}>
              {title}
            </Typography>
          </Box>
          <IconButton 
            edge="end" 
            color="default" 
            aria-label="logout" 
            onClick={handleLogout}
            sx={{ 
              '&:hover': { 
                color: 'primary.main',
                backgroundColor: 'rgba(99, 102, 241, 0.08)'
              } 
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Container 
        maxWidth="md" 
        sx={{ 
          flexGrow: 1, 
          pb: 4, 
          pt: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '800px' }}>
          {children}
        </Box>
      </Container>
      
      <Box 
        component="footer" 
        sx={{ 
          py: 2, 
          textAlign: 'center',
          borderTop: '1px solid',
          borderColor: 'divider', 
          mt: 'auto',
          width: '100%'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Notes App
        </Typography>
      </Box>
    </Box>
  );
} 