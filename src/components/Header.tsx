import React from "react";
import { Box, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  agentName?: string;
  agentRole?: string;
  customerName?: string;
}

export default function Header() {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'black', mb: 2 }}>
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
