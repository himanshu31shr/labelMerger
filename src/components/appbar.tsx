import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  IconButton,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Switch,
  styled,
} from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

const DRAWER_WIDTH = 250;

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: `${DRAWER_WIDTH}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const getRouteTitle = (pathname: string): string => {
  switch (pathname) {
    case "/labelMerger/":
      return "PDF Label Merger";
    case "/labelMerger/transactions/":
      return "Transaction Analytics";
    default:
      return "Label Merger";
  }
};

export const AppBar = ({
  toggleDrawer,
  toggleTheme,
  mode,
  open,
}: {
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  toggleTheme: () => void;
  mode: "light" | "dark";
  open: boolean;
}) => {
  const location = useLocation();
  const title = getRouteTitle(location.pathname);

  return (
    <StyledAppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(!open)}
          data-testid="menu-button"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="close drawer"
          onClick={toggleDrawer(false)}
          sx={{ mr: 2, ...(!open && { display: 'none' }) }}
        >
          <ChevronLeftIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        <Switch
          checked={mode === "dark"}
          onChange={toggleTheme}
          inputProps={{ "aria-label": "dark mode toggle" }}
        />
      </Toolbar>
    </StyledAppBar>
  );
};
