import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App.jsx'
import './index.css'

// Create custom Material UI theme with navy blue colors
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4F7EFC', // Bright Blue from image
      light: '#6B8FFF',
      dark: '#3B6BF0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4F7EFC', // Bright Blue from image
      light: '#6B8FFF',
      dark: '#3B6BF0',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0F1419', // Deep navy from image
      paper: '#1A1F29', // Darker card background
    },
    text: {
      primary: '#ffffff', // Pure white text
      secondary: '#9CA3AF', // Light gray from image
    },
    action: {
      active: '#ffffff',
      hover: 'rgba(255, 255, 255, 0.05)',
      selected: 'rgba(79, 126, 252, 0.15)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    },
    divider: '#374151',
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
    },
    success: {
      main: '#10B981', // Teal green from checkmarks
      light: '#34D399',
      dark: '#059669',
    },
    info: {
      main: '#4F7EFC',
      light: '#6B8FFF',
      dark: '#3B6BF0',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      letterSpacing: '-0.015em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
        h1: {
          color: '#ffffff',
        },
        h2: {
          color: '#ffffff',
        },
        h3: {
          color: '#ffffff',
        },
        h4: {
          color: '#ffffff',
        },
        h5: {
          color: '#ffffff',
        },
        h6: {
          color: '#ffffff',
        },
        body1: {
          color: '#9CA3AF',
        },
        body2: {
          color: '#9CA3AF',
        },
        caption: {
          color: '#9CA3AF',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(15, 20, 25, 0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(55, 65, 81, 0.3)',
          boxShadow: '0 1px 0 0 rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '64px !important',
          '@media (max-width: 600px)': {
            minHeight: '56px !important',
            paddingLeft: '16px',
            paddingRight: '16px',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#9CA3AF',
          fontWeight: 500,
          textTransform: 'none',
          minHeight: 44,
          '&.Mui-selected': {
            color: '#4F7EFC',
            fontWeight: 600,
          },
          '&:hover': {
            color: '#6B8FFF',
            backgroundColor: 'rgba(79, 126, 252, 0.08)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          fontWeight: 600,
          fontSize: '1rem',
          padding: '12px 24px',
          boxShadow: 'none',
        },
        contained: {
          backgroundColor: '#4F7EFC',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#3B6BF0',
            boxShadow: 'none',
          },
          '&:active': {
            backgroundColor: '#2B5CE6',
          },
        },
        outlined: {
          borderColor: '#374151',
          color: '#9CA3AF',
          borderWidth: '1px',
          '&:hover': {
            borderColor: '#4F7EFC',
            backgroundColor: 'rgba(79, 126, 252, 0.08)',
            color: '#4F7EFC',
          },
        },
        text: {
          color: '#4F7EFC',
          '&:hover': {
            backgroundColor: 'rgba(79, 126, 252, 0.08)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1F29',
          borderRadius: 16,
          border: '1px solid rgba(55, 65, 81, 0.3)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: '#1A1F29',
          backgroundImage: 'none',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(55, 65, 81, 0.3)',
          transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          '&:hover': {
            border: '1px solid rgba(79, 126, 252, 0.4)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.7)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#1A1F29',
            borderRadius: 12,
            color: '#ffffff',
            fontSize: '1rem',
            '& fieldset': {
              borderColor: '#374151',
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: '#4F7EFC',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#4F7EFC',
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#9CA3AF',
            fontSize: '1rem',
            '&.Mui-focused': {
              color: '#4F7EFC',
            },
          },
          '& .MuiInputBase-input': {
            color: '#ffffff',
            padding: '14px 16px',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1F29',
          borderRadius: 12,
          color: '#ffffff',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#374151',
            borderWidth: '1px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4F7EFC',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4F7EFC',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          backgroundColor: '#1A1F29',
          borderRadius: 8,
          margin: '2px 8px',
          '&:hover': {
            backgroundColor: '#374151',
          },
          '&.Mui-selected': {
            backgroundColor: '#4F7EFC',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#3B6BF0',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(79, 126, 252, 0.15)',
          color: '#6B8FFF',
          border: '1px solid rgba(79, 126, 252, 0.3)',
          borderRadius: 20,
          fontSize: '0.875rem',
          fontWeight: 500,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          '@media (max-width: 360px)': {
            width: '90vw !important',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (max-width: 600px)': {
            paddingLeft: '16px',
            paddingRight: '16px',
          },
        },
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
) 