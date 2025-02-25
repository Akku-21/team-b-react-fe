import React, { useState } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const COLLAPSED_WIDTH = 64;

export default function Layout({ children }: LayoutProps) {
  const [_,setIsNavExpanded] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Box
          onMouseEnter={() => setIsNavExpanded(true)}
          onMouseLeave={() => setIsNavExpanded(false)}
        >
          <Navigation />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            ml: `${COLLAPSED_WIDTH}px`,
            mt: '64px',
            transition: 'margin-left 0.3s ease',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
} 