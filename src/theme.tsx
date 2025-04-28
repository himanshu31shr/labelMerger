import { PaletteMode, ThemeOptions } from "@mui/material";

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? "#2196f3" : "#90caf9",
      light: mode === 'light' ? "#64b5f6" : "#bbdefb",
      dark: mode === 'light' ? "#1976d2" : "#42a5f5",
    },
    secondary: {
      main: mode === 'light' ? "#26a69a" : "#80cbc4",
    },
    background: {
      default: mode === 'light' ? "#f5f5f5" : "#121212",
      paper: mode === 'light' ? "#ffffff" : "#1e1e1e",
    },
    text: {
      primary: mode === 'light' ? "#2c3e50" : "#ecf0f1",
      secondary: mode === 'light' ? "rgba(44, 62, 80, 0.7)" : "rgba(236, 240, 241, 0.7)",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 400,
      letterSpacing: 0.5,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "dark" ? "#1e1e1e" : "#2196f3",
          boxShadow:
            mode === "dark"
              ? "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
              : "0 2px 4px rgba(33,150,243,0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "8px 16px",
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow:
            mode === "dark"
              ? "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
              : "0 2px 4px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow:
              mode === "dark"
                ? "0 4px 6px rgba(0,0,0,0.15)"
                : "0 4px 6px rgba(0,0,0,0.08)",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: "16px",
          paddingBottom: "16px",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          "&:before": {
            display: "none",
          },
          borderRadius: 8,
          marginBottom: 16,
          boxShadow:
            mode === "dark"
              ? "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
              : "0 2px 4px rgba(0,0,0,0.05)",
        },
      },
    },
  },
});

export default getDesignTokens;
