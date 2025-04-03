import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  Paper, 
  InputAdornment,
  IconButton,
  Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NoteIcon from '@mui/icons-material/Note';

export default function Login({ setIsAuthenticated }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    
    if (error) setError('');
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        px: 2
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 3, sm: 4 }, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          borderRadius: 3,
          width: '100%',
          maxWidth: '450px'
        }}
      >
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            mb: 4,
            color: 'primary.main'
          }}
        >
          <NoteIcon sx={{ fontSize: 40, mr: 1 }} />
          <Typography 
            variant="h4" 
            component="h1"
            sx={{ fontWeight: 700 }}
          >
            Notes App
          </Typography>
        </Box>
        
        <Box 
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white', 
            width: 56, 
            height: 56,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2 
          }}
        >
          <LockOutlinedIcon />
        </Box>
        
        <Typography 
          component="h2" 
          variant="h5" 
          sx={{ mb: 3, fontWeight: 600 }}
        >
          Sign In
        </Typography>
        
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 3, width: '100%' }}
          >
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            name="username"
            autoComplete="username"
            autoFocus
            value={credentials.username}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            name="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth
            size="large"
            sx={{ 
              mt: 3, 
              mb: 2,
              py: 1.5,
              borderRadius: 2
            }}
          >
            Sign In
          </Button>
          
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
            For demo purposes, you can use any username and password
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
} 