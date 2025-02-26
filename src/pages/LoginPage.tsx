import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useSnackbar } from "../contexts/SnackbarContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  // Check if user is already logged in on component mount
  useEffect(() => {
    if (isAuthenticated) {
      // User is already logged in, redirect to kundendaten page
      navigate("/kundendaten", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);

      showSnackbar("Login erfolgreich", "success");
      navigate("/kundendaten");
    } catch (error: any) {
      showSnackbar(error?.message || "Ein Fehler ist aufgetreten", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Anmeldung
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            type="email"
            required
          />
          <TextField
            fullWidth
            label="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            type="password"
            required
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              mt: 3,
              bgcolor: "black",
              "&:hover": { bgcolor: "#333" },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Anmelden"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
