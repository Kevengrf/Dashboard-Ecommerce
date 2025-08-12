import { createTheme } from '@mui/material/styles';

// Paleta de cores tecnológica refinada para Recimportados
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#42a5f5', // Deep vibrant blue
    },
    secondary: {
      main: '#ab47bc', // Rich purple
    },
    background: {
      default: '#0d1117', // Very dark blue-gray
      paper: '#161b22', // Slightly lighter blue-gray
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: '"Roboto Mono", "monospace"', // Using a monospace font for tech feel
    h4: { fontWeight: 700, color: '#42a5f5' },
    h5: { fontWeight: 600, color: '#ab47bc' },
    h6: { fontWeight: 500, color: '#ffffff' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'uppercase',
          fontWeight: 700,
          boxShadow: '0 0 8px rgba(66, 165, 245, 0.6)', // Subtle glow matching primary
          '&:hover': {
            boxShadow: '0 0 12px rgba(66, 165, 245, 0.8)',
          },
        },
      },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundImage: 'none',
                border: '1px solid rgba(66, 165, 245, 0.3)', // Matching primary
                boxShadow: '0 0 10px rgba(66, 165, 245, 0.2)', // Matching primary
                borderRadius: 8,
            }
        }
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'rgba(66, 165, 245, 0.5)', // Matching primary
                    },
                    '&:hover fieldset': {
                        borderColor: '#42a5f5', // Matching primary
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#42a5f5', // Matching primary
                    },
                },
                '& .MuiInputLabel-root': {
                    color: '#b0b0b0',
                },
                '& .MuiInputBase-input': {
                    color: '#ffffff',
                },
            },
        },
    },
    MuiList: {
        styleOverrides: {
            root: {
                background: '#161b22', // Matching paper background
            }
        }
    },
    MuiListItemButton: {
        styleOverrides: {
            root: {
                '&:hover': {
                    backgroundColor: 'rgba(66, 165, 245, 0.1)', // Matching primary
                },
            }
        }
    },
    MuiListItemIcon: {
        styleOverrides: {
            root: {
                color: '#42a5f5', // Matching primary
            }
        }
    },
    MuiDivider: {
        styleOverrides: {
            root: {
                backgroundColor: 'rgba(66, 165, 245, 0.3)', // Matching primary
            }
        }
    }
  },
});

export default theme;
