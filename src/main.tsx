import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Paper } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import getDesignTokens from './theme';
import App from './App';

const AppWrapper = () => {
  const [mode, setMode] = useState<'light' | 'dark'>(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper sx={{ minHeight: '100vh' }}>
        <BrowserRouter>
          <App toggleTheme={toggleTheme} mode={mode} />
        </BrowserRouter>
      </Paper>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
);
