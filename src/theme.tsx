import { PaletteMode, ThemeOptions } from "@mui/material";

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? "#1565c0" : "#90caf9", // Darker blue for better contrast
      light: mode === 'light' ? "#64b5f6" : "#bbdefb",
      dark: mode === 'light' ? "#0d47a1" : "#42a5f5",
    },
    secondary: {
      main: mode === 'light' ? "#2e7d32" : "#81c784", // Green for inventory success
      light: mode === 'light' ? "#4caf50" : "#a5d6a7",
      dark: mode === 'light' ? "#1b5e20" : "#66bb6a",
    },
    error: {
      main: mode === 'light' ? "#d32f2f" : "#f44336", // Red for out of stock/errors
      light: mode === 'light' ? "#ef5350" : "#e57373",
      dark: mode === 'light' ? "#b71c1c" : "#d32f2f",
    },
    warning: {
      main: mode === 'light' ? "#ed6c02" : "#ffa726", // Orange for low stock
      light: mode === 'light' ? "#ff9800" : "#ffb74d",
      dark: mode === 'light' ? "#e65100" : "#f57c00",
    },
    info: {
      main: mode === 'light' ? "#0288d1" : "#29b6f6", // Blue for info alerts
      light: mode === 'light' ? "#03a9f4" : "#4fc3f7",
      dark: mode === 'light' ? "#01579b" : "#0288d1",
    },
    success: {
      main: mode === 'light' ? "#2e7d32" : "#66bb6a", // Green for in stock
      light: mode === 'light' ? "#4caf50" : "#81c784",
      dark: mode === 'light' ? "#1b5e20" : "#388e3c",
    },
    background: {
      default: mode === 'light' ? "#f8f9fa" : "#121212", // Lighter background for better contrast
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
          backgroundColor: mode === "dark" ? "#1e1e1e" : "#1565c0", // Updated to match primary color
          boxShadow:
            mode === "dark"
              ? "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
              : "0 2px 4px rgba(21,101,192,0.2)",
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
        // Add specific styling for inventory-related buttons
        containedPrimary: {
          '&:hover': {
            boxShadow: '0 4px 8px rgba(21,101,192,0.2)',
          },
        },
        containedSecondary: {
          '&:hover': {
            boxShadow: '0 4px 8px rgba(46,125,50,0.2)',
          },
        },
        containedError: {
          '&:hover': {
            boxShadow: '0 4px 8px rgba(211,47,47,0.2)',
          },
        },
        containedWarning: {
          '&:hover': {
            boxShadow: '0 4px 8px rgba(237,108,2,0.2)',
          },
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
          // Add transition for hover effects
          transition: "box-shadow 0.2s ease-in-out",
          '&:hover': {
            boxShadow:
              mode === "dark"
                ? "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
                : "0 3px 6px rgba(0,0,0,0.1)",
          },
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
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
        // Specific styling for inventory status chips
        colorError: {
          backgroundColor: mode === "dark" ? "rgba(211,47,47,0.2)" : "rgba(211,47,47,0.1)",
          color: mode === "dark" ? "#f44336" : "#d32f2f",
          fontWeight: 600,
        },
        colorWarning: {
          backgroundColor: mode === "dark" ? "rgba(237,108,2,0.2)" : "rgba(237,108,2,0.1)",
          color: mode === "dark" ? "#ffa726" : "#ed6c02",
          fontWeight: 600,
        },
        colorSuccess: {
          backgroundColor: mode === "dark" ? "rgba(46,125,50,0.2)" : "rgba(46,125,50,0.1)",
          color: mode === "dark" ? "#66bb6a" : "#2e7d32",
          fontWeight: 600,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: "24px", // Increased padding for better spacing
          paddingBottom: "24px",
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
    MuiTable: {
      styleOverrides: {
        root: {
          '& .MuiTableRow-root:hover': {
            backgroundColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(21,101,192,0.05)",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        standardWarning: {
          backgroundColor: mode === "dark" ? "rgba(237,108,2,0.2)" : "#fff3e0",
          color: mode === "dark" ? "#ffa726" : "#9a0007",
          border: `1px solid ${mode === "dark" ? "rgba(237,108,2,0.5)" : "#ed6c02"}`,
        },
        standardError: {
          backgroundColor: mode === "dark" ? "rgba(211,47,47,0.2)" : "#ffebee",
          color: mode === "dark" ? "#f44336" : "#b71c1c",
          border: `1px solid ${mode === "dark" ? "rgba(211,47,47,0.5)" : "#f44336"}`,
        },
        standardInfo: {
          backgroundColor: mode === "dark" ? "rgba(2,136,209,0.2)" : "#e3f2fd",
          color: mode === "dark" ? "#29b6f6" : "#0d47a1",
          border: `1px solid ${mode === "dark" ? "rgba(2,136,209,0.5)" : "#2196f3"}`,
        },
        standardSuccess: {
          backgroundColor: mode === "dark" ? "rgba(46,125,50,0.2)" : "#e8f5e9",
          color: mode === "dark" ? "#66bb6a" : "#1b5e20",
          border: `1px solid ${mode === "dark" ? "rgba(46,125,50,0.5)" : "#2e7d32"}`,
        },
      },
    },
  },
});

export default getDesignTokens;
