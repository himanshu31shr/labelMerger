import InboxIcon from "@mui/icons-material/MoveToInbox";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LabelIcon from "@mui/icons-material/Label";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import AnalyticsIcon from "@mui/icons-material/Analytics";
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
  alpha,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar } from "../../components/appbar";

const DRAWER_WIDTH = 250;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2),
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
  '&.Mui-selected': {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.16),
    },
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 40,
  color: theme.palette.primary.main,
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontWeight: 500,
  },
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
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
          Sacred Sutra
        </Typography>
        <IconButton 
          onClick={toggleDrawer(false)}
          sx={{ 
            color: 'inherit',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List sx={{ px: 1, py: 2 }}>
        <Link
          component={RouterLink}
          to={"/labelMerger/"}
          data-testid="dashboard"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItem key={"Dashboard"} disablePadding>
            <StyledListItemButton>
              <StyledListItemIcon>
                <DashboardIcon />
              </StyledListItemIcon>
              <StyledListItemText primary={"Dashboard"} />
            </StyledListItemButton>
          </ListItem>
        </Link>

        <Link
          component={RouterLink}
          to={"/labelMerger/home/"}
          data-testid="merge-labels"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItem key={"Merge Labels"} disablePadding>
            <StyledListItemButton>
              <StyledListItemIcon>
                <LabelIcon />
              </StyledListItemIcon>
              <StyledListItemText primary={"Merge Labels"} />
            </StyledListItemButton>
          </ListItem>
        </Link>

        <Link
          component={RouterLink}
          to={"/labelMerger/activeOrders/"}
          data-testid="merge-labels"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItem key={"Active Orders"} disablePadding>
            <StyledListItemButton>
              <StyledListItemIcon>
                <ShoppingCartIcon />
              </StyledListItemIcon>
              <StyledListItemText primary={"Active Orders"} />
            </StyledListItemButton>
          </ListItem>
        </Link>

        <Link
          component={RouterLink}
          to={"/labelMerger/products/"}
          data-testid="products"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItem key={"Products"} disablePadding>
            <StyledListItemButton>
              <StyledListItemIcon>
                <InventoryIcon />
              </StyledListItemIcon>
              <StyledListItemText primary={"Products"} />
            </StyledListItemButton>
          </ListItem>
        </Link>
        <Link
          component={RouterLink}
          to={"/labelMerger/transactions/"}
          data-testid="transactions"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItem key={"Transaction Analytics"} disablePadding>
            <StyledListItemButton>
              <StyledListItemIcon>
                <AnalyticsIcon />
              </StyledListItemIcon>
              <StyledListItemText primary={"Transaction Analytics"} />
            </StyledListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
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
            borderRight: 'none',
            boxShadow: '0 0 35px 0 rgba(154,161,171,.15)',
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
