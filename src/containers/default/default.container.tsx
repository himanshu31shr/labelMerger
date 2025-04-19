import InboxIcon from "@mui/icons-material/MoveToInbox";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ReceiptIcon from "@mui/icons-material/Receipt";
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
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router";
import { AppBar } from "../../components/appbar";

export const DefaultContainer = ({
  children,
  toggleTheme,
  mode
}: {
  children: React.ReactNode;
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <Link component={RouterLink} to={"/labelMerger/"} data-testid="merge-labels">
          <ListItem key={"Merge Labels"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Merge Labels"} />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link component={RouterLink} to={"/labelMerger/analytics/"} data-testid="analytics">
          <ListItem key={"Order Analytics"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AnalyticsIcon />
              </ListItemIcon>
              <ListItemText primary={"Order Analytics"} />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link component={RouterLink} to={"/labelMerger/transactions/"} data-testid="transactions">
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
    <>
      <AppBar toggleDrawer={toggleDrawer} toggleTheme={toggleTheme} mode={mode} />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Container>{children}</Container>
    </>
  );
};
