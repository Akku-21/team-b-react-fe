import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import NewCustomerForm from '../components/NewCustomerForm';
import { useParams } from 'react-router-dom';

export default function CustomerDataPage() {
  const { customerId } = useParams<{ customerId: string }>();

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" component="div" gutterBottom>
          {customerId === 'new' ? 'Neuer Kunde' : 'Kundendaten bearbeiten'}
        </Typography>
        <NewCustomerForm 
          customerId={customerId}
          open={true}
        />
      </Paper>
    </Box>
  );
} 