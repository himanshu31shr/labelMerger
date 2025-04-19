import InboxIcon from "@mui/icons-material/MoveToInbox";
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
}: {
  children: React.ReactNode;
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
          <ListItem key={"Analytics"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Analytics"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar toggleDrawer={toggleDrawer} />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Container>{children}</Container>
    </>
  );
};
