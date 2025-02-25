import {  Typography, AppBar, Toolbar, Button } from "@mui/material";
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Versicherungsportal
        </Typography>
        <Typography variant="body1" sx={{ mr: 2 }}>
          {user?.name}
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Abmelden
        </Button>
      </Toolbar>
    </AppBar>
  );
}
