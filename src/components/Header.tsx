import React from "react";
import { Box, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

interface HeaderProps {
  agentName?: string;
  agentRole?: string;
  customerName?: string;
}

export default function Header() {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();
  const theme = useTheme();

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
