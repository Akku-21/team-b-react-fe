import { useEffect } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function ThankYouPage() {
  const handleClose = () => {
    // First clear the history to prevent back navigation
    window.history.replaceState(null, '', window.location.href);
    window.history.pushState(null, '', window.location.href);
    
    // Attempt multiple close methods
    window.location.href = "about:blank";
    window.close();
    window.top?.close();
  };

  // Add keyboard shortcut for closing
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2
    }}>
      <Paper sx={{ 
        maxWidth: 600,
        width: '100%',
        p: 4,
        textAlign: 'center'
      }}>
        <CheckCircleOutlineIcon 
          sx={{ 
            fontSize: 64,
            color: 'success.main',
            mb: 2
          }} 
        />
        <Typography variant="h4" gutterBottom>
          Vielen Dank!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Ihre Daten wurden erfolgreich gespeichert. Sie können dieses Fenster jetzt schließen.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Drücken Sie ESC oder klicken Sie den Button zum Schließen.
        </Typography>
        <Button 
          variant="contained"
          onClick={handleClose}
          sx={{ 
            bgcolor: 'black',
            '&:hover': { bgcolor: '#333' }
          }}
        >
          Fenster schließen
        </Button>
      </Paper>
    </Box>
  );
} 