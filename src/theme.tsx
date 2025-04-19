import { PaletteMode } from '@mui/material';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode
          primary: {
            main: '#556cd6',
          },
          secondary: {
            main: '#19857b',
          },
          background: {
            default: '#fff',
            paper: '#fff',
          },
          text: {
            primary: '#000000',
            secondary: 'rgba(0, 0, 0, 0.7)',
          },
        }
      : {
          // Dark mode
          primary: {
            main: '#bb86fc',
          },
          secondary: {
            main: '#03dac6',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)',
          },
        }),
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#1e1e1e' : '#556cd6',
        },
      },
    },
  },
});

export default getDesignTokens;
