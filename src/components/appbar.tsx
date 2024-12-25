import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  IconButton,
  AppBar as MuiAppBar,
  Toolbar,
  Typography
} from "@mui/material";
import React from "react";

export const AppBar = ({ toggleDrawer }: {
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
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
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Label Merger
        </Typography>
      </Toolbar>
    </MuiAppBar>
  </Box>
);
