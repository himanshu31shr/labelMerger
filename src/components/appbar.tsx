import {
  Box,
  IconButton,
  Toolbar,
  Typography,
  AppBar as MuiAppBar,
} from "@mui/material";

export const AppBar = () => (
  <Box sx={{ flexGrow: 1 }}>
    <MuiAppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        ></IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Label Merger
        </Typography>
      </Toolbar>
    </MuiAppBar>
  </Box>
);
