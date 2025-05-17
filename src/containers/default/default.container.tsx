import InboxIcon from "@mui/icons-material/MoveToInbox";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LabelIcon from "@mui/icons-material/Label";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import InventoryManagementIcon from "@mui/icons-material/Warehouse";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar } from "../../components/appbar";

// Responsive drawer width
const DRAWER_WIDTH = {
  xs: 240,  // Smaller on mobile
  sm: 240,  // Same on tablet
  md: 250,  // Default on desktop
};

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
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  width: "100%",
  ...(open && {
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }
  }),
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Initialize drawer state - closed by default on mobile
  const [open, setOpen] = React.useState(!isMobile);

  // Update drawer state when screen size changes
  React.useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // Function to handle navigation and close drawer on mobile
  const handleNavigation = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  const DrawerList = (
    <Box sx={{ width: { xs: DRAWER_WIDTH.xs, sm: DRAWER_WIDTH.sm, md: DRAWER_WIDTH.md } }} role="presentation">
      <DrawerHeader>
        <Typography variant="h6" noWrap component="div" sx={{
          fontWeight: 600,
          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
        }}>
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
          to={"/flipkart-amazon-tools/"}
          data-testid="dashboard"
          style={{ textDecoration: 'none', color: 'inherit' }}
          onClick={handleNavigation}
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
          to={"/flipkart-amazon-tools/home/"}
          data-testid="merge-labels"
          style={{ textDecoration: 'none', color: 'inherit' }}
          onClick={handleNavigation}
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
          to={"/flipkart-amazon-tools/activeOrders/"}
          data-testid="merge-labels"
          style={{ textDecoration: 'none', color: 'inherit' }}
          onClick={handleNavigation}
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
          to={"/flipkart-amazon-tools/products/"}
          data-testid="products"
          style={{ textDecoration: 'none', color: 'inherit' }}
          onClick={handleNavigation}
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
          to={"/flipkart-amazon-tools/transactions/"}
          data-testid="transactions"
          style={{ textDecoration: 'none', color: 'inherit' }}
          onClick={handleNavigation}
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

        <Link
          component={RouterLink}
          to={"/flipkart-amazon-tools/hidden-products/"}
          data-testid="hidden-products"
          style={{ textDecoration: 'none', color: 'inherit' }}
          onClick={handleNavigation}
        >
          <ListItem key={"Hidden Products"} disablePadding>
            <StyledListItemButton>
              <StyledListItemIcon>
                <VisibilityOffIcon />
              </StyledListItemIcon>
              <StyledListItemText primary={"Hidden Products"} />
            </StyledListItemButton>
          </ListItem>
        </Link>

        <Link
          component={RouterLink}
          to={"/flipkart-amazon-tools/inventory/"}
          data-testid="inventory-management"
          style={{ textDecoration: 'none', color: 'inherit' }}
          onClick={handleNavigation}
        >
          <ListItem key={"Inventory Management"} disablePadding>
            <StyledListItemButton>
              <StyledListItemIcon>
                <InventoryManagementIcon />
              </StyledListItemIcon>
              <StyledListItemText primary={"Inventory Management"} />
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
          width: open
            ? { xs: DRAWER_WIDTH.xs, sm: DRAWER_WIDTH.sm, md: DRAWER_WIDTH.md }
            : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open
              ? { xs: DRAWER_WIDTH.xs, sm: DRAWER_WIDTH.sm, md: DRAWER_WIDTH.md }
              : 0,
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
            px: { xs: 2, sm: 3 }, // Add responsive padding
            transition: "padding 0.3s ease-in-out"
          }}
        >
          {children}
        </Container>
      </Main>
    </Box>
  );
};
