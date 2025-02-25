import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    insurance: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
  interface PaletteOptions {
    insurance: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#7DD1DE',
      light: '#9CDBE5',
      dark: '#5CB7C4',
      contrastText: '#ffffff',
    },
    insurance: {
      main: '#7DD1DE',
      light: '#9CDBE5',
      dark: '#5CB7C4',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F8F9FA',
      paper: '#F8F9FA',
    },
    text: {
      primary: '#4B5563',
      secondary: '#6B7280',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
        },
        contained: {
          backgroundColor: '#7DD1DE',
          color: '#ffffff',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#5CB7C4',
            boxShadow: 'none',
          },
        },
        outlined: {
          borderColor: '#7DD1DE',
          color: '#7DD1DE',
          '&:hover': {
            backgroundColor: 'rgba(125, 209, 222, 0.04)',
            borderColor: '#5CB7C4',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: '#F8F9FA',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#7DD1DE',
          color: '#ffffff',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          '& .MuiInputBase-input': {
            color: '#4B5563',
          },
          '& .MuiInputLabel-root': {
            color: '#6B7280',
          },
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#FFFFFF',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          '&.Mui-selected': {
            backgroundColor: '#7DD1DE',
            color: '#ffffff',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          backgroundColor: '#F8F9FA',
        },
        head: {
          backgroundColor: '#F0F2F5',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 500,
      color: '#4B5563',
    },
    h5: {
      fontWeight: 500,
      color: '#4B5563',
    },
    h6: {
      fontWeight: 500,
      color: '#4B5563',
    },
    body1: {
      color: '#4B5563',
    },
    body2: {
      color: '#6B7280',
    },
  },
  shape: {
    borderRadius: 8,
  },
});
