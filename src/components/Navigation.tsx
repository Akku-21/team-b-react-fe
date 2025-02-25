import { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Paper, Tooltip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';

const navigationItems = [
  { path: '/', label: 'Dashboard', icon: <DashboardIcon /> },
  { path: '/kunden', label: 'Kunden', icon: <PeopleIcon /> },
  { path: '/statistiken', label: 'Statistiken', icon: <BarChartIcon /> },
  { path: '/einstellungen', label: 'Einstellungen', icon: <SettingsIcon /> },
];

const COLLAPSED_WIDTH = 64;
const EXPANDED_WIDTH = 240;
const TRANSITION_DURATION = '0.3s';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Paper 
      elevation={0}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      sx={{ 
        width: isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
        borderRight: '1px solid',
        borderColor: 'divider',
        height: 'calc(100vh - 64px)',
        position: 'fixed',
        top: 64,
        left: 0,
        bgcolor: 'background.default',
        transition: `width ${TRANSITION_DURATION} ease`,
        overflow: 'hidden',
        '&:hover': {
          width: EXPANDED_WIDTH,
        },
        zIndex: (theme) => theme.zIndex.drawer
      }}
    >
      <List>
        {navigationItems.map((item) => (
          <Tooltip 
            key={item.path}
            title={!isExpanded ? item.label : ''}
            placement="right"
          >
            <ListItem
              button
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                mb: 1,
                borderRadius: 1,
                mx: 1,
                minHeight: 48,
                justifyContent: isExpanded ? 'initial' : 'center',
                '&.Mui-selected': {
                  bgcolor: 'action.selected',
                  '&:hover': {
                    bgcolor: 'action.selected',
                  },
                },
              }}
            >
              <ListItemIcon 
                sx={{ 
                  minWidth: 0,
                  mr: isExpanded ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                sx={{ 
                  opacity: isExpanded ? 1 : 0,
                  transition: `opacity ${TRANSITION_DURATION} ease`,
                }}
              />
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Paper>
  );
} 