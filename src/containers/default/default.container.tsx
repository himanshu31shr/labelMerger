import InboxIcon from "@mui/icons-material/MoveToInbox";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Box,
  Container,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router";
import { AppBar } from "../../components/appbar";

const DRAWER_WIDTH = 250;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>((_) => ({
  flexGrow: 1,
  marginLeft: 0,
  width: "100%",
}));

export const DefaultContainer = ({
  children,
  toggleTheme,
  mode,
}: {
  children: React.ReactNode;
  toggleTheme: () => void;
  mode: "light" | "dark";
}) => {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: DRAWER_WIDTH }} role="presentation">
      <DrawerHeader>
        <Typography variant="h6" noWrap component="div">
          Sacred Sutra
        </Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <Link
          component={RouterLink}
          to={"/labelMerger/"}
          data-testid="merge-labels"
        >
          <ListItem key={"Merge Labels"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Merge Labels"} />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link
          component={RouterLink}
          to={"/labelMerger/products/"}
          data-testid="products"
        >
          <ListItem key={"Products"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText primary={"Products"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          component={RouterLink}
          to={"/labelMerger/transactions/"}
          data-testid="transactions"
        >
          <ListItem key={"Transaction Analytics"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText primary={"Transaction Analytics"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        toggleDrawer={toggleDrawer}
        toggleTheme={toggleTheme}
        mode={mode}
        open={open}
      />
      <Drawer
        sx={{
          width: open ? DRAWER_WIDTH : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? DRAWER_WIDTH : 0,
            boxSizing: "border-box",
          },
          transition: "width 0.3s ease-in-out",
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        {DrawerList}
      </Drawer>
      <Main open={open}>
        <Container
          maxWidth={false}
          sx={{
            maxWidth: "100%",
            mt: 8, // Add margin top to account for AppBar
          }}
        >
          {children}
        </Container>
      </Main>
    </Box>
  );
};
