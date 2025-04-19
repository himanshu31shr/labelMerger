import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  IconButton,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Switch
} from "@mui/material";
import React from "react";

export const AppBar = ({ toggleDrawer, toggleTheme, mode }: {
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}) => (
  <Box sx={{ flexGrow: 1 }}>
    <MuiAppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer(true)}
          data-testid="menu-button"
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Label Merger
        </Typography>

        <Switch
          checked={mode === 'dark'}
          onChange={toggleTheme}
          inputProps={{ 'aria-label': 'dark mode toggle' }}
        />
      </Toolbar>
    </MuiAppBar>
  </Box>
);
